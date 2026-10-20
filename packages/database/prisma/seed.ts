/**
 * Tripto development seed — rewritten for the post-Address schema
 * (Activity + Accommodation carry their own address columns).
 *
 * Run: pnpm --filter @repo/database db:seed
 * Login: admin / Admin@2024!
 */
import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Season } from '../generated/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding tripto development dataset...');

  // Clean in FK-safe order
  await prisma.favoriteAccommodation.deleteMany();
  await prisma.room.deleteMany();
  await prisma.hotel.deleteMany();
  await prisma.house.deleteMany();
  await prisma.accommodation.deleteMany();
  await prisma.accommodationTag.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.activityType.deleteMany();
  await prisma.currency.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const hash = (password: string) => bcrypt.hash(password, 10);

  // Users
  const admin = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'System Administrator',
      email: 'admin@tripto.com',
      username: 'admin',
      password: await hash('Admin@2024!'),
      role: 'Admin',
    },
  });
  const manager = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name: 'Content Manager',
      email: 'manager@tripto.com',
      username: 'manager',
      password: await hash('Manager@2024!'),
      role: 'Manager',
    },
  });
  const guests = await Promise.all(
    [
      { name: 'Emma Traveler', email: 'emma@example.com', username: 'emma' },
      { name: 'James Adventurer', email: 'james@example.com', username: 'james' },
      { name: 'Sofia Explorer', email: 'sofia@example.com', username: 'sofia' },
    ].map(async (g) =>
      prisma.user.create({
        data: {
          id: crypto.randomUUID(),
          ...g,
          password: await hash('Guest@2024!'),
          role: 'Guest',
        },
      }),
    ),
  );
  console.log('✅ Users');

  // Currencies
  const currencyDefs = [
    { title: 'US Dollar', symbol: '$', isoCode: 'USD' },
    { title: 'Euro', symbol: '€', isoCode: 'EUR' },
    { title: 'British Pound', symbol: '£', isoCode: 'GBP' },
    { title: 'Japanese Yen', symbol: '¥', isoCode: 'JPY' },
    { title: 'Swiss Franc', symbol: 'CHF', isoCode: 'CHF' },
    { title: 'Canadian Dollar', symbol: 'CA$', isoCode: 'CAD' },
  ];
  const currencies = await Promise.all(
    currencyDefs.map((c) =>
      prisma.currency.create({
        data: { ...c, isActive: true, createdById: admin.id },
      }),
    ),
  );
  const currencyByIso = Object.fromEntries(currencies.map((c) => [c.isoCode, c]));
  const req = <T>(value: T | undefined | null, what: string): T => {
    if (value === undefined || value === null) throw new Error(`Seed misconfigured: missing ${what}`);
    return value;
  };
  console.log('✅ Currencies');

  // Activity types
  const activityTypeDefs = [
    { name: 'EXPLORE', title: 'Explore', icon: 'IconCompass', emoji: '🧭' },
    { name: 'BEACH', title: 'Beach', icon: 'IconUmbrella', emoji: '🏖️' },
    { name: 'MUSEUM', title: 'Museum', icon: 'IconBuildingBank', emoji: '🏛️' },
    { name: 'SHOW', title: 'Show', icon: 'IconTicket', emoji: '🎭' },
    { name: 'FOOD', title: 'Food', icon: 'IconToolsKitchen2', emoji: '🍽️' },
    { name: 'NIGHT_LIFE', title: 'Night Life', icon: 'IconMoonStars', emoji: '🌙' },
  ];
  const activityTypes = await Promise.all(
    activityTypeDefs.map((t) =>
      prisma.activityType.create({
        data: { ...t, isActive: true, createdById: admin.id },
      }),
    ),
  );
  const activityTypeByName = Object.fromEntries(activityTypes.map((t) => [t.name, t]));
  console.log('✅ Activity types');

  // Destinations
  const destinationDefs = [
    {
      city: 'Paris',
      country: 'France',
      slogan: 'The city of light',
      seasons: [Season.SPRING, Season.AUTUMN],
    },
    {
      city: 'Barcelona',
      country: 'Spain',
      slogan: 'Sun, sea and Gaudi',
      seasons: [Season.SPRING, Season.SUMMER, Season.AUTUMN],
    },
    {
      city: 'Kyoto',
      country: 'Japan',
      slogan: 'Temples and cherry blossoms',
      seasons: [Season.SPRING, Season.AUTUMN],
    },
    {
      city: 'Santorini',
      country: 'Greece',
      slogan: 'White walls over blue domes',
      seasons: [Season.SUMMER],
    },
    {
      city: 'Banff',
      country: 'Canada',
      slogan: 'Peaks, lakes and powder',
      seasons: [Season.WINTER, Season.SUMMER],
    },
    {
      city: 'Marrakech',
      country: 'Morocco',
      slogan: 'The red city',
      seasons: [Season.SPRING, Season.AUTUMN, Season.WINTER],
    },
  ];
  const destinations = await Promise.all(
    destinationDefs.map((d) =>
      prisma.destination.create({
        data: { ...d, isActive: true, createdById: manager.id },
      }),
    ),
  );
  const destinationByCity = Object.fromEntries(destinations.map((d) => [d.city, d]));
  console.log('✅ Destinations');

  // Accommodation tags
  const tagDefs = [
    {
      title: 'Beachfront',
      emoji: '🏖️',
      textColor: '#0c4a6e',
      borderColor: '#38bdf8',
      backgroundColor: '#e0f2fe',
    },
    {
      title: 'City Break',
      emoji: '🏙️',
      textColor: '#1e3a8a',
      borderColor: '#818cf8',
      backgroundColor: '#eef2ff',
    },
    {
      title: 'Mountain Retreat',
      emoji: '⛰️',
      textColor: '#14532d',
      borderColor: '#4ade80',
      backgroundColor: '#dcfce7',
    },
    {
      title: 'Luxury',
      emoji: '💎',
      textColor: '#713f12',
      borderColor: '#facc15',
      backgroundColor: '#fef9c3',
    },
  ];
  const tags = await Promise.all(
    tagDefs.map((t) =>
      prisma.accommodationTag.create({
        data: { ...t, isActive: true, createdById: manager.id },
      }),
    ),
  );
  const tagByTitle = Object.fromEntries(tags.map((t) => [t.title, t]));
  console.log('✅ Accommodation tags');

  const wifi = { title: 'Free WiFi', icon: 'IconWifi' };
  const poolAmenity = { title: 'Pool', icon: 'IconPool' };
  const parking = { title: 'Parking', icon: 'IconParking' };
  const breakfast = { title: 'Breakfast', icon: 'IconToolsKitchen2' };

  const cancellationPolicy = {
    title: 'Free cancellation',
    icon: 'IconCalendarX',
    description: 'Free cancellation up to 48 hours before check-in.',
  };
  const checkinPolicy = {
    title: 'Check-in',
    icon: 'IconDoorEnter',
    description: 'Check-in from 3 PM. Early check-in on request.',
  };

  // Houses
  const houseDefs = [
    {
      title: 'Seaside Villa with Terrace',
      destination: 'Barcelona',
      tag: 'Beachfront',
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Carrer de la Marina 12, 2-1',
      latitude: 41.3874,
      longitude: 2.1686,
      currency: 'EUR',
      price: 240,
      discount: 10,
      capacity: 6,
      area: 140,
      bathrooms: 2,
      bedrooms: 3,
      floors: 2,
      favoriteCount: 18,
    },
    {
      title: 'Alpine Chalet with Sauna',
      destination: 'Banff',
      tag: 'Mountain Retreat',
      country: 'Canada',
      countryCode: 'CA',
      city: 'Banff',
      fullAddress: '105 Mountain Avenue, Unit 4',
      latitude: 51.1784,
      longitude: -115.5708,
      currency: 'CAD',
      price: 310,
      discount: null,
      capacity: 8,
      area: 180,
      bathrooms: 3,
      bedrooms: 4,
      floors: 2,
      favoriteCount: 12,
    },
    {
      title: 'Traditional Machiya Townhouse',
      destination: 'Kyoto',
      tag: 'City Break',
      country: 'Japan',
      countryCode: 'JP',
      city: 'Kyoto',
      fullAddress: '2-14-8 Gion, Higashiyama-ku',
      latitude: 34.9986,
      longitude: 135.7753,
      currency: 'JPY',
      price: 19500,
      discount: 5,
      capacity: 4,
      area: 95,
      bathrooms: 1,
      bedrooms: 2,
      floors: 2,
      favoriteCount: 25,
    },
    {
      title: 'Cave Suite with Caldera View',
      destination: 'Santorini',
      tag: 'Luxury',
      country: 'Greece',
      countryCode: 'GR',
      city: 'Santorini',
      fullAddress: 'Oia, Eparchiaki Odos Oias 5',
      latitude: 36.4618,
      longitude: 25.376,
      currency: 'EUR',
      price: 420,
      discount: null,
      capacity: 2,
      area: 60,
      bathrooms: 1,
      bedrooms: 1,
      floors: 1,
      favoriteCount: 31,
    },
    {
      title: 'Eixample Designer Apartment',
      destination: 'Barcelona',
      tag: 'City Break',
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Carrer de Mallorca 289, 4-2',
      latitude: 41.3937,
      longitude: 2.1649,
      currency: 'EUR',
      price: 150,
      discount: 15,
      capacity: 4,
      area: 85,
      bathrooms: 1,
      bedrooms: 2,
      floors: 1,
      favoriteCount: 9,
    },
    {
      title: 'Riad Courtyard House',
      destination: 'Marrakech',
      tag: 'Luxury',
      country: 'Morocco',
      countryCode: 'MA',
      city: 'Marrakech',
      fullAddress: 'Derb el Ferrane 7, Medina',
      latitude: 31.6295,
      longitude: -7.9811,
      currency: 'EUR',
      price: 130,
      discount: null,
      capacity: 6,
      area: 160,
      bathrooms: 2,
      bedrooms: 3,
      floors: 2,
      favoriteCount: 7,
    },
  ];

  const accommodations: { id: string; title: string }[] = [];
  for (const h of houseDefs) {
    const accommodation = await prisma.accommodation.create({
      data: {
        title: h.title,
        description: `${h.title} — hand-picked stay in ${h.city}.`,
        country: h.country,
        countryCode: h.countryCode,
        city: h.city,
        fullAddress: h.fullAddress,
        latitude: h.latitude,
        longitude: h.longitude,
        amenities: [wifi, parking],
        policies: [cancellationPolicy, checkinPolicy],
        favoriteCount: h.favoriteCount,
        destinationId: req(destinationByCity[h.destination], `destination ${h.destination}`).id,
        tagId: req(tagByTitle[h.tag], `tag ${h.tag}`).id,
        createdById: manager.id,
        house: {
          create: {
            price: h.price,
            discount: h.discount,
            capacity: h.capacity,
            area: h.area,
            bathrooms: h.bathrooms,
            bedrooms: h.bedrooms,
            floors: h.floors,
            availableDates: [
              { date: '2026-07-01', price: h.price },
              { date: '2026-08-15', price: Math.round(h.price * 1.2) },
            ],
            currencyId: req(currencyByIso[h.currency], `currency ${h.currency}`).id,
            createdById: manager.id,
          },
        },
      },
    });
    accommodations.push({ id: accommodation.id, title: accommodation.title });
  }
  console.log('✅ Houses');

  // Hotels
  const hotelDefs = [
    {
      title: 'Grand Palace Paris',
      destination: 'Paris',
      tag: 'Luxury',
      country: 'France',
      countryCode: 'FR',
      city: 'Paris',
      fullAddress: '8 Avenue Kléber, 16th arr.',
      latitude: 48.8698,
      longitude: 2.2965,
      favoriteCount: 42,
      rooms: [
        {
          title: 'Classic Double',
          count: 12,
          area: 28,
          price: 290,
          discount: null,
          capacity: 2,
          bedrooms: 1,
          bathrooms: 1,
          currency: 'EUR',
        },
        {
          title: 'Deluxe Suite',
          count: 4,
          area: 55,
          price: 590,
          discount: 10,
          capacity: 3,
          bedrooms: 2,
          bathrooms: 2,
          currency: 'EUR',
        },
      ],
    },
    {
      title: 'Harbor Lights Hotel',
      destination: 'Barcelona',
      tag: 'City Break',
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Passeig de Gràcia 48, 1-1',
      latitude: 41.3917,
      longitude: 2.1649,
      currency: 'EUR',
      favoriteCount: 15,
      rooms: [
        {
          title: 'Standard Twin',
          count: 20,
          area: 24,
          price: 140,
          discount: null,
          capacity: 2,
          bedrooms: 1,
          bathrooms: 1,
          currency: 'EUR',
        },
      ],
    },
    {
      title: 'Sakura Ryokan',
      destination: 'Kyoto',
      tag: 'City Break',
      country: 'Japan',
      countryCode: 'JP',
      city: 'Kyoto',
      fullAddress: '1-22 Nanzenji, Sakyo-ku',
      latitude: 35.0116,
      longitude: 135.7843,
      currency: 'JPY',
      favoriteCount: 22,
      rooms: [
        {
          title: 'Tatami Room',
          count: 8,
          area: 32,
          price: 22000,
          discount: null,
          capacity: 3,
          bedrooms: 1,
          bathrooms: 1,
          currency: 'JPY',
        },
        {
          title: 'Garden Suite',
          count: 2,
          area: 48,
          price: 38000,
          discount: 5,
          capacity: 2,
          bedrooms: 1,
          bathrooms: 1,
          currency: 'JPY',
        },
      ],
    },
    {
      title: 'Medina Palm Hotel',
      destination: 'Marrakech',
      tag: 'Beachfront',
      country: 'Morocco',
      countryCode: 'MA',
      city: 'Marrakech',
      fullAddress: 'Avenue Mohammed VI, Hivernage',
      latitude: 31.606,
      longitude: -8.0004,
      currency: 'EUR',
      favoriteCount: 5,
      rooms: [
        {
          title: 'Palm Double',
          count: 15,
          area: 30,
          price: 110,
          discount: 20,
          capacity: 2,
          bedrooms: 1,
          bathrooms: 1,
          currency: 'EUR',
        },
      ],
    },
  ];

  for (const h of hotelDefs) {
    const accommodation = await prisma.accommodation.create({
      data: {
        title: h.title,
        description: `${h.title} — hand-picked stay in ${h.city}.`,
        country: h.country,
        countryCode: h.countryCode,
        city: h.city,
        fullAddress: h.fullAddress,
        latitude: h.latitude,
        longitude: h.longitude,
        amenities: [wifi, breakfast, poolAmenity],
        policies: [cancellationPolicy, checkinPolicy],
        favoriteCount: h.favoriteCount,
        destinationId: req(destinationByCity[h.destination], `destination ${h.destination}`).id,
        tagId: req(tagByTitle[h.tag], `tag ${h.tag}`).id,
        createdById: manager.id,
        hotel: { create: { createdById: manager.id } },
      },
      include: { hotel: true },
    });
    for (const r of h.rooms) {
      await prisma.room.create({
        data: {
          title: r.title,
          count: r.count,
          area: r.area,
          price: r.price,
          discount: r.discount,
          capacity: r.capacity,
          bedrooms: r.bedrooms,
          bathrooms: r.bathrooms,
          amenities: [wifi, breakfast],
          beds: r.capacity > 2 ? { double: 1, single: 1 } : { double: 1 },
          hotelId: accommodation.hotel!.id,
          currencyId: req(currencyByIso[r.currency], `currency ${r.currency}`).id,
          createdById: manager.id,
        },
      });
    }
    accommodations.push({ id: accommodation.id, title: accommodation.title });
  }
  console.log('✅ Hotels + rooms');

  // Activities
  const activityDefs = [
    {
      title: 'Sagrada Familia skip-the-line tour',
      type: 'EXPLORE',
      currency: 'EUR',
      price: 45,
      discount: null,
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Carrer de Mallorca 401',
    },
    {
      title: 'Sunset catamaran cruise',
      type: 'BEACH',
      currency: 'EUR',
      price: 65,
      discount: 10,
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Port Vell, Moll de les Drassanes',
    },
    {
      title: 'Louvre highlights with an art historian',
      type: 'MUSEUM',
      currency: 'EUR',
      price: 79,
      discount: null,
      country: 'France',
      countryCode: 'FR',
      city: 'Paris',
      fullAddress: 'Rue de Rivoli, 1st arr.',
    },
    {
      title: 'Moulin Rouge evening show',
      type: 'SHOW',
      currency: 'EUR',
      price: 120,
      discount: null,
      country: 'France',
      countryCode: 'FR',
      city: 'Paris',
      fullAddress: '82 Boulevard de Clichy',
    },
    {
      title: 'Tea ceremony in Gion',
      type: 'FOOD',
      currency: 'JPY',
      price: 6500,
      discount: null,
      country: 'Japan',
      countryCode: 'JP',
      city: 'Kyoto',
      fullAddress: '2-8 Gion, Higashiyama-ku',
    },
    {
      title: 'Fushimi Inari night walk',
      type: 'EXPLORE',
      currency: 'JPY',
      price: 3800,
      discount: null,
      country: 'Japan',
      countryCode: 'JP',
      city: 'Kyoto',
      fullAddress: '68 Fukakusa Yabunouchicho',
    },
    {
      title: 'Caldera sunset wine tasting',
      type: 'FOOD',
      currency: 'EUR',
      price: 55,
      discount: null,
      country: 'Greece',
      countryCode: 'GR',
      city: 'Santorini',
      fullAddress: 'Santo Wines, Pyrgos',
    },
    {
      title: 'Lake Louise sunrise canoe',
      type: 'EXPLORE',
      currency: 'CAD',
      price: 95,
      discount: 5,
      country: 'Canada',
      countryCode: 'CA',
      city: 'Banff',
      fullAddress: 'Fairview Road, Lake Louise',
    },
    {
      title: 'Medina food crawl',
      type: 'FOOD',
      currency: 'EUR',
      price: 40,
      discount: null,
      country: 'Morocco',
      countryCode: 'MA',
      city: 'Marrakech',
      fullAddress: 'Jemaa el-Fnaa, Medina',
    },
    {
      title: 'Jazz night in the Latin Quarter',
      type: 'NIGHT_LIFE',
      currency: 'EUR',
      price: 30,
      discount: null,
      country: 'France',
      countryCode: 'FR',
      city: 'Paris',
      fullAddress: '13 Rue des Petites Écuries',
    },
    {
      title: 'Tapas crawl through El Born',
      type: 'FOOD',
      currency: 'EUR',
      price: 50,
      discount: null,
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      fullAddress: 'Passeig del Born 4',
    },
    {
      title: 'Banff stargazing tour',
      type: 'NIGHT_LIFE',
      currency: 'CAD',
      price: 60,
      discount: null,
      country: 'Canada',
      countryCode: 'CA',
      city: 'Banff',
      fullAddress: '101 Mountain Avenue',
    },
  ];

  for (const a of activityDefs) {
    await prisma.activity.create({
      data: {
        title: a.title,
        price: a.price,
        discount: a.discount,
        isActive: true,
        country: a.country,
        countryCode: a.countryCode,
        city: a.city,
        fullAddress: a.fullAddress,
        currencyId: req(currencyByIso[a.currency], `currency ${a.currency}`).id,
        activityTypeId: req(activityTypeByName[a.type], `activity type ${a.type}`).id,
        createdById: manager.id,
      },
    });
  }
  console.log('✅ Activities');

  // Favorites (counts match the favoriteCount values above for picked rows)
  const [guestEmma, guestJames, guestSofia] = guests;
  if (!guestEmma || !guestJames || !guestSofia) throw new Error('Seed misconfigured: guests');
  const favoritePairs: Array<[string, number]> = [
    [guestEmma.id, 0],
    [guestEmma.id, 2],
    [guestJames.id, 2],
    [guestJames.id, 6],
    [guestSofia.id, 3],
    [guestSofia.id, 8],
  ];
  for (const pair of favoritePairs) {
    const userId = req(pair[0], 'favorite user');
    const accIndex = req(pair[1], 'favorite index');
    const acc = accommodations[accIndex];
    if (!acc) throw new Error('Seed misconfigured: accommodation index out of range');
    await prisma.favoriteAccommodation.create({
      data: { id: crypto.randomUUID(), userId, accommodationId: acc.id },
    });
  }
  console.log('✅ Favorites');

  console.log('\n🌱 Seed complete:');
  console.log('👥 5 users (admin/manager/3 guests) — login: admin / Admin@2024!');
  console.log('💰 6 currencies, 🎭 6 activity types, 📍 6 destinations, 🏷️ 4 tags');
  console.log('🏠 6 houses, 🏨 4 hotels (6 rooms), 🎟️ 12 activities, ❤️ 6 favorites');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
