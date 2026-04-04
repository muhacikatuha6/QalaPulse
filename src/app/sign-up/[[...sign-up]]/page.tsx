import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg)]">
      <SignUp appearance={{
        elements: {
          card: "bg-[var(--bg2)] border border-[var(--border2)] shadow-2xl",
          headerTitle: "text-[var(--text)] font-['Unbounded']",
          headerSubtitle: "text-[var(--text2)]",
          socialButtonsBlockButton: "bg-[var(--bg3)] border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg4)]",
          formButtonPrimary: "bg-[var(--accent)] hover:bg-[#00ff9d] text-black text-[12px] font-bold uppercase tracking-wider",
          footerActionText: "text-[var(--text3)]",
          footerActionLink: "text-[var(--accent)] hover:text-[#00ff9d]"
        }
      }} />
    </div>
  );
}
