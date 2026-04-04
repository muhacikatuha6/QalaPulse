"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import Groq from "groq-sdk";

export async function saveOnboarding(data: any) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");
  await prisma.user.upsert({
    where: { clerkId: user.id },
    update: { onboarding: data },
    create: { clerkId: user.id, onboarding: data },
  });
  revalidatePath("/");
}

export async function chatWithAI(
  messages: any[], 
  events: any[], 
  crimes: any[], 
  activeMode: string
) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const dbUser = await prisma.user.findUnique({ where: { clerkId: user.id } });
  const onboarding = (dbUser?.onboarding as any) || {};
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey || apiKey === "your_groq_api_key_here") {
    const lastUserMsg = (messages[messages.length - 1]?.content || "").toLowerCase();
    
    if (lastUserMsg.includes("происходит") || lastUserMsg.includes("событ")) {
      return `Сейчас в городе активно ${events.length} события. Рекомендую обратить внимание на ${events[0]?.name || "фестивали в центре"}. 🍎🏙️`;
    }
    if (lastUserMsg.includes("опасн") || lastUserMsg.includes("безопас")) {
      const dangerous = crimes.length > 0 ? crimes[0].type : "спокойно";
      return `Внимание! Зафиксировано: ${dangerous}. Будьте осторожны. 🚨 Наш ИИ советует избегать зон с красными маркерами.`;
    }
    if (lastUserMsg.includes("привет") || lastUserMsg.includes("здравст")) {
      return `Привет! Я QalaPulse AI (в режиме симуляции). Твой приоритет: ${onboarding.priority || "Безопасность"}. Спрашивай о чем угодно! 🏔️`;
    }
    return `Я проанализировал данные города: на карте ${events.length} ивентов и ${crimes.length} инцидентов. Исходя из твоего профиля (${onboarding.priority || "Безопасность"}), рекомендую оставаться в освещенных местах. 🍎`;
  }

  const groq = new Groq({ apiKey });

  const systemPrompt = `
    Ты — QalaPulse AI, коренной цифровой житель Алматы и эксперт по Казахстану. 
    Твоя цель — быть полезным, мудрым и современным помощником.
    Твой профиль пользователя: ${JSON.stringify(onboarding)}.
    Активные события: ${JSON.stringify(events.slice(0, 8).map(e => `${e.name} в ${e.place}`))}.
    Инциденты: ${JSON.stringify(crimes.slice(0, 5).map(c => c.type + ": " + c.description))}.
    Режим: ${activeMode}.
    Отвечай на русском, используй эмодзи (🍎, 🏔️, 🏙️, 🇰🇿). Будь вежлив!
  `;

  try {
    const chatMessages: any[] = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const response = await groq.chat.completions.create({
      messages: chatMessages,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 800,
    });
    return response.choices[0]?.message?.content || "Кешiрiңіз, возникла заминка. Спросите еще раз!";
  } catch (error) {
    console.error("Groq Chat Error:", error);
    return "Ойбай, произошла ошибка связи с сервером AI. Но я все еще здесь, чтобы помочь!";
  }
}
