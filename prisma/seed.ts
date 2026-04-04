const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.event.deleteMany();
  await prisma.crime.deleteMany();

  const events = [
    { name: 'Atlas Weekend Almaty', type: 'music', lat: 43.238, lng: 76.926, place: 'Парк Горького', address: 'ул. Горького, 1', date: '5–7 апр 2026', time: '16:00–23:00', price: 'от 8 000 ₸', crowdLevel: 85, attending: '12 000', description: 'Главный музыкальный фестиваль весны.' },
    { name: 'Almaty City Run', type: 'sport', lat: 43.262, lng: 76.929, place: 'Площадь Республики', address: 'пл. Республики', date: '6 апр 2026', time: '09:00–14:00', price: 'от 3 500 ₸', crowdLevel: 60, attending: '8 500', description: 'Городской забег по центру Алматы.' },
    { name: 'Street Food Festival', type: 'food', lat: 43.210, lng: 76.910, place: 'EXPO Boulevard', address: 'пр. Достык, 180', date: '5–7 апр 2026', time: '11:00–22:00', price: 'Вход свободный', crowdLevel: 70, attending: '5 000', description: 'Уличная еда со всего мира.' },
    { name: 'Tech Conf 2026', type: 'tech', lat: 43.220, lng: 76.850, place: 'Almaty Arena', address: 'мкр. Нуркент, 7', date: '10 апр 2026', time: '10:00–18:00', price: 'от 15 000 ₸', crowdLevel: 40, attending: '3 000', description: 'Крупнейшая IT конференция в ЦА.' },
    { name: 'Art Night Almaty', type: 'art', lat: 43.245, lng: 76.945, place: 'Музей Кастеева', address: 'мкр. Коктем-3, 22/1', date: '8 апр 2026', time: '19:00–02:00', price: '2 000 ₸', crowdLevel: 30, attending: '1 200', description: 'Ночь искусств и инсталляций.' },
    { name: 'Eco Fair', type: 'food', lat: 43.270, lng: 76.900, place: 'ТРЦ Mega Park', address: 'ул. Макатаева, 127', date: '12 апр 2026', time: '10:00–20:00', price: 'Вход свободный', crowdLevel: 55, attending: '4 000', description: 'Ярмарка эко-продуктов.' },
    { name: 'Jazz Evening', type: 'music', lat: 43.255, lng: 76.955, place: 'Филармония', address: 'ул. Калдаякова, 35', date: '9 апр 2026', time: '20:00–22:00', price: 'от 5 000 ₸', crowdLevel: 25, attending: '800', description: 'Вечер классического джаза.' },
    { name: 'Mountain Hike', type: 'sport', lat: 43.130, lng: 77.010, place: 'Шымбулак', address: 'Горный курорт', date: '11 апр 2026', time: '08:00–16:00', price: 'Бесплатно', crowdLevel: 90, attending: '2 500', description: 'Массовое восхождение.' },
    { name: 'Digital Art Expo', type: 'art', lat: 43.235, lng: 76.890, place: 'Esentai Gallery', address: 'пр. Аль-Фараби, 77/7', date: '5–15 апр 2026', time: '10:00–21:00', price: 'от 3 000 ₸', crowdLevel: 20, attending: '500', description: 'Цифровое искусство будущего.' },
    { name: 'Bazaar Day', type: 'food', lat: 43.265, lng: 76.950, place: 'Зеленый Базар', address: 'ул. Жибек Жолы, 53', date: 'Ежедневно', time: '08:00–18:00', price: 'Бесплатно', crowdLevel: 95, attending: '15 000', description: 'Традиционный рынок Алматы.' }
  ];

  for (const e of events) { await prisma.event.create({ data: e }); }

  const crimes = [
    { type: 'Accident', severity: 4, lat: 43.250, lng: 76.940, description: 'ДТП на Абая-Достык. Сильный затор.' },
    { type: 'Traffic Jam', severity: 5, lat: 43.220, lng: 76.910, description: 'Пробка 9 баллов на Аль-Фараби.' },
    { type: 'Road Work', severity: 3, lat: 43.260, lng: 76.880, description: 'Ремонт теплотрассы на Райымбека.' },
    { type: 'Accident', severity: 2, lat: 43.280, lng: 76.950, description: 'Столкновение двух авто в районе Саяхата.' },
    { type: 'Fire Alert', severity: 5, lat: 43.320, lng: 76.980, description: 'Задымление в складских помещениях (Нижняя часть).' },
    { type: 'Power Outage', severity: 3, lat: 43.200, lng: 76.820, description: 'Отключение света в Ауэзовском районе.' },
    { type: 'Flood Warning', severity: 4, lat: 43.180, lng: 76.850, description: 'Разлив реки Есентай в районе плотины.' },
    { type: 'Accident', severity: 3, lat: 43.240, lng: 76.930, description: 'ДТП с участием автобуса на Сатпаева.' },
    { type: 'Road Closure', severity: 5, lat: 43.262, lng: 76.930, description: 'Перекрытие дорог для марафона.' },
    { type: 'Theft Alert', severity: 2, lat: 43.275, lng: 76.905, description: 'Участились кражи в районе Арбата.' }
  ];

  for (const c of crimes) { await prisma.crime.create({ data: c }); }
  console.log('Seed: 10 Events and 10 Crimes added.');
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
