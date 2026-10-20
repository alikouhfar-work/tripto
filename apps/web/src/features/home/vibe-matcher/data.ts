import { Property, Activity, QuizQuestion } from './types';

export const PROPERTIES: Property[] = [
  // Weekend Deals
  {
    id: 'deal-1',
    name: 'Seaside Serenity Villa',
    type: 'Hotel',
    location: 'Amalfi Coast',
    country: 'Italy',
    rating: 4.0,
    reviewsCount: 160,
    priceOriginal: 250,
    priceDiscount: 175,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'An elegant villa nestled on the dramatic cliffs of the Amalfi Coast, offering jaw-dropping views of the Tyrrhenian Sea, a private infinity pool, and authentic Mediterranean hospitality.',
    amenities: ['Infinity Pool', 'Ocean View', 'Free Wi-Fi', 'Complimentary Breakfast', 'Private Balcony', 'Air Conditioning'],
    tags: ['Clifftop', 'Luxury', 'Romantic'],
    isDeal: true,
    featured: true
  },
  {
    id: 'deal-2',
    name: 'Tropical Bungalow',
    type: 'Guest House',
    location: 'Phuket',
    country: 'Thailand',
    rating: 3.8,
    reviewsCount: 110,
    priceOriginal: 210,
    priceDiscount: 160,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    description: 'Immerse yourself in nature with this authentic thatch-roof tropical bungalow. Surrounded by lush emerald palms and steps from the white sands of Kata Beach.',
    amenities: ['Beachfront Access', 'Outdoor Shower', 'Free Wi-Fi', 'Hammock', 'Scooter Rental', 'Massage Services'],
    tags: ['Eco-friendly', 'Tropical', 'Beachfront'],
    isDeal: true,
    featured: false
  },
  {
    id: 'deal-3',
    name: 'Santorini Sunset Suites',
    type: 'Hotel',
    location: 'Oia, Santorini',
    country: 'Greece',
    rating: 4.9,
    reviewsCount: 185,
    priceOriginal: 300,
    priceDiscount: 255,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    description: 'A striking whitewashed sanctuary situated in Oia. Enjoy premium cave-style suites with a private heated plunge pool, overlooking the world-famous caldera sunset.',
    amenities: ['Heated Plunge Pool', 'Sunset View', 'Free Airport Shuttle', 'Luxury Toiletries', 'Espresso Machine', '24/7 Butler Service'],
    tags: ['Caldera View', 'Iconic', 'Honeymoon'],
    isDeal: true,
    featured: true
  },
  {
    id: 'deal-4',
    name: 'Marbella Beachfront Resort',
    type: 'Hotel',
    location: 'Marbella',
    country: 'Spain',
    rating: 4.6,
    reviewsCount: 142,
    priceOriginal: 280,
    priceDiscount: 190,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    description: 'A stylish upscale resort combining Andalusian charm with modern luxury. Features a private beach club, award-winning golf course, and a Michelin-starred dining experience.',
    amenities: ['Private Beach Club', 'Golf Course', 'Spa & Wellness', 'Michelin Restaurant', 'Kids Club', 'Poolside Bar'],
    tags: ['Golf & Spa', 'Upscale', 'Beachfront'],
    isDeal: true,
    featured: false
  },

  // Homes Guests Love
  {
    id: 'home-1',
    name: 'Azure Horizon Hotel',
    type: 'Hotel',
    location: 'Nice',
    country: 'France',
    rating: 5.0,
    reviewsCount: 310,
    priceOriginal: 165,
    priceDiscount: 165,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    description: 'An art-deco masterpiece overlooking the Promenade des Anglais. Stunning French Riviera vistas, a rooftop sun deck, and proximity to Nice’s historic old town.',
    amenities: ['Rooftop Pool', 'Sea View', 'Fitness Center', 'Bicycle Hire', 'Pet Friendly', 'Cocktail Lounge'],
    tags: ['French Riviera', 'Art Deco', 'City Center'],
    featured: true
  },
  {
    id: 'home-2',
    name: 'Palm Grove Estate',
    type: 'House',
    location: 'Algarve',
    country: 'Portugal',
    rating: 5.0,
    reviewsCount: 200,
    priceOriginal: 175,
    priceDiscount: 175,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    description: 'A luxurious private estate surrounded by ancient olive trees and palms. Perfect for families, with a tennis court, large swimming pool, and fully equipped barbecue lounge.',
    amenities: ['Private Tennis Court', 'Large Swimming Pool', 'BBQ Grill', 'Fully Equipped Kitchen', 'Free Wi-Fi', 'Fireplace'],
    tags: ['Family Friendly', 'Secluded', 'Luxury Estate'],
    featured: true
  },
  {
    id: 'home-3',
    name: 'Casa Tranquila Guesthouse',
    type: 'Guest House',
    location: 'Tulum',
    country: 'Mexico',
    rating: 4.8,
    reviewsCount: 160,
    priceOriginal: 145,
    priceDiscount: 145,
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    description: 'A bohemian chic retreat tucked away in the Tulum jungle. Offers a mindful space with daily morning yoga, natural cenote-style swimming pools, and vegan dining.',
    amenities: ['Daily Yoga Classes', 'Natural Cenote Pool', 'Bicycles Provided', 'Air Conditioning', 'Organic Breakfast', 'Eco Toiletries'],
    tags: ['Jungle Retreat', 'Mindfulness', 'Eco-friendly'],
    featured: false
  },
  {
    id: 'home-4',
    name: 'Villa San Martino',
    type: 'House',
    location: 'Ravello, Amalfi',
    country: 'Italy',
    rating: 5.0,
    reviewsCount: 190,
    priceOriginal: 190,
    priceDiscount: 190,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    description: 'Perched in the quiet mountain-side village of Ravello, this historical villa offers gorgeous terraced gardens, private dining with a local chef, and absolute serenity.',
    amenities: ['Terraced Gardens', 'Private Chef Optional', 'Ocean Views', 'Historical Architecture', 'Wine Cellar', 'Hot Tub'],
    tags: ['Mountain View', 'Heritage', 'Serene'],
    featured: true
  },

  // Unique Stays (Cabins, Domes, Glamping)
  {
    id: 'unique-1',
    name: 'Woodland Redwood A-Frame',
    type: 'Cabins',
    location: 'Portland, Oregon',
    country: 'United States',
    rating: 4.9,
    reviewsCount: 220,
    priceOriginal: 150,
    priceDiscount: 120,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    description: 'A striking modern A-frame cabin surrounded by towering Oregon redwoods. Highlights include a cedar wood-fired hot tub, outdoor movie projector, and cozy wood stove.',
    amenities: ['Wood-Fired Hot Tub', 'Wood Stove', 'Outdoor Cinema', 'Free Wi-Fi', 'Espresso Bar', 'Hiking Trail Access'],
    tags: ['Forest Cabin', 'Cozy', 'Woodlands'],
    isDeal: true
  },
  {
    id: 'unique-2',
    name: 'Desert Stargazer Dome',
    type: 'Doms',
    location: 'Joshua Tree, California',
    country: 'United States',
    rating: 4.9,
    reviewsCount: 145,
    priceOriginal: 185,
    priceDiscount: 185,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', // Replace with a dome-like look
    description: 'An architectural geodesic dome offering panoramic views of Joshua Tree’s desert landscape. Features transparent ceiling panels for stargazing right from your luxury king bed.',
    amenities: ['Stargazing Sky Window', 'Hot Tub', 'Fire Pit', 'Outdoor Kitchen', 'Tesla Charger', 'Acoustic Guitar'],
    tags: ['Desert', 'Stargazing', 'Geodesic'],
    featured: true
  },
  {
    id: 'unique-3',
    name: 'Serengeti Luxury Glamping',
    type: 'Glamping',
    location: 'Serengeti National Park',
    country: 'Tanzania',
    rating: 4.9,
    reviewsCount: 95,
    priceOriginal: 250,
    priceDiscount: 220,
    image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    description: 'Experience the wild in ultimate luxury. Safari-style canvas tents elevated on mahogany decks with private plunge pools, gourmet dining, and daily guided game drives.',
    amenities: ['Safari Game Drives', 'Private Plunge Pool', 'All-Inclusive Dining', 'En-Suite Bathroom', 'Solar Power', 'Star Deck'],
    tags: ['Wildlife', 'Adventure', 'Canvas Luxury'],
    isDeal: true
  },
  {
    id: 'unique-4',
    name: 'Cozy Alpine Timber Cabin',
    type: 'Cabins',
    location: 'Zermatt',
    country: 'Switzerland',
    rating: 4.8,
    reviewsCount: 112,
    priceOriginal: 220,
    priceDiscount: 195,
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
    description: 'A traditional timber chalet nestled near the slopes of the Matterhorn. Comes with a sauna, ski storage, roaring fireplace, and majestic snowcapped mountain vistas.',
    amenities: ['Private Finnish Sauna', 'Stone Fireplace', 'Ski-in / Ski-out', 'Heated Boot Rack', 'Fondue Set', 'Balcony with Matterhorn View'],
    tags: ['Snowy Peaks', 'Ski Chalet', 'Cosy Fireplace'],
    featured: false
  },
  {
    id: 'unique-5',
    name: 'Arctic Aurora Glass Igloo',
    type: 'Doms',
    location: 'Rovaniemi, Lapland',
    country: 'Finland',
    rating: 5.0,
    reviewsCount: 88,
    priceOriginal: 350,
    priceDiscount: 320,
    image: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=800&q=80',
    description: 'Watch the magical Northern Lights dance across the sky from the comfort of a heated glass dome. Includes premium thermal bedding, private sauna, and snowmobile tours.',
    amenities: ['Heated Glass Roof', 'Northern Lights Wakeup', 'Private Sauna', 'Snowmobile Tours', 'Underfloor Heating', 'Champagne on Arrival'],
    tags: ['Aurora Borealis', 'Bucket List', 'Arctic Escape'],
    isDeal: true,
    featured: true
  }
];

export const ACTIVITIES: Activity[] = [
  // Explore
  {
    id: 'act-1',
    name: 'Sagrada Familia Guided Tour',
    category: 'Explore',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1583779457094-0cdf43cd0f7f?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 2450,
    description: 'Skip the line and explore Antoni Gaudí’s breathtaking cathedral with a certified historical expert.'
  },
  {
    id: 'act-2',
    name: 'Park Güell Mosaic Wander',
    category: 'Explore',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewsCount: 1980,
    description: 'Walk through the colorful fairytale landscapes, ceramic salamanders, and panoramic city lookouts.'
  },
  {
    id: 'act-3',
    name: 'Casa Milà Rooftop Sunset',
    category: 'Explore',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1581613271109-f6ba6f6630f9?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewsCount: 1120,
    description: 'Explore the whimsical "La Pedrera" limestone facade and enjoy live jazz music on the rooftop chimneys.'
  },
  // Beach
  {
    id: 'act-4',
    name: 'Barceloneta Paddleboarding',
    category: 'Beach',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    reviewsCount: 450,
    description: 'Paddle along the Mediterranean coastline at sunrise, followed by beachside fruit bowls and espresso.'
  },
  {
    id: 'act-5',
    name: 'Sailing Yacht Cruise',
    category: 'Beach',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1505262868364-1240ebd96f1e?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 680,
    description: 'A 2-hour luxury sailing trip with small bites, local white wine, and refreshing swimming stops.'
  },
  // Museum
  {
    id: 'act-6',
    name: 'Picasso Museum Curator Walk',
    category: 'Museum',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewsCount: 1530,
    description: 'Analyze Picasso’s formative years in Barcelona through 4,251 permanent collection masterpieces.'
  },
  {
    id: 'act-7',
    name: 'MACBA Contemporary Pass',
    category: 'Museum',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    reviewsCount: 390,
    description: 'Explore boundary-pushing post-war contemporary art in a striking Richard Meier-designed pavilion.'
  },
  // Show
  {
    id: 'act-8',
    name: 'Flamenco Tablao at Carmen',
    category: 'Show',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 890,
    description: 'Witness high-energy raw flamenco dance and acoustic guitar in a traditional Andalusian square replica.'
  },
  {
    id: 'act-9',
    name: 'Magic Fountain Lights Show',
    category: 'Show',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewsCount: 3100,
    description: 'Watch the iconic synchronized fountain display combining water choreography, neon lights, and cinematic music.'
  },
  // Food
  {
    id: 'act-10',
    name: 'La Boqueria Tapas Tour',
    category: 'Food',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewsCount: 1720,
    description: 'Savor Jamón Ibérico, fresh oysters, patatas bravas, and local cava in the heart of Las Ramblas.'
  },
  {
    id: 'act-11',
    name: 'Traditional Paella Masterclass',
    category: 'Food',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 940,
    description: 'Learn to cook a real wood-fired seafood paella from a local chef on an atmospheric rooftop terrace.'
  },
  // Night Life
  {
    id: 'act-12',
    name: 'VIP Beachfront Club Entry',
    category: 'Night Life',
    location: 'Barcelona',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewsCount: 610,
    description: 'Skip long queues and dance to international DJs right on the sand at the renowned Opium Barcelona.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Choose your desired travel vibe:',
    field: 'vibe',
    options: [
      {
        value: 'Romantic',
        label: 'Romantic & Serene',
        icon: '💖',
        description: 'Sunsets, clifftops, deep relaxation, and couples cave suites'
      },
      {
        value: 'Eco-friendly',
        label: 'Eco & Wilderness',
        icon: '🌿',
        description: 'Redwood treehouses, organic dining, and deep nature immersion'
      },
      {
        value: 'Wildlife',
        label: 'Adventure & Safari',
        icon: '🦁',
        description: 'Canvas luxury tents, game drives, and wild nature treks'
      },
      {
        value: 'City Center',
        label: 'Urban & Art Deco',
        icon: '🌆',
        description: 'City center style, museums, culinary walks, and rooftop cocktails'
      }
    ]
  },
  {
    id: 2,
    question: 'Who is joining you on this trip?',
    field: 'travelers',
    options: [
      {
        value: 'Honeymoon',
        label: 'Just Me & Partner',
        icon: '👩‍❤️‍💋‍👨',
        description: 'Intimate hideaways, private plunge pools, and private dining'
      },
      {
        value: 'Family Friendly',
        label: 'Family / Friends Group',
        icon: '👨‍👩‍👧‍👦',
        description: 'Multi-room houses, private tennis courts, and large pool estates'
      },
      {
        value: 'Jungle Retreat',
        label: 'Solo Mindful Traveler',
        icon: '🧘',
        description: 'Daily yoga, organic meals, bicycles, and quiet jungles'
      }
    ]
  },
  {
    id: 3,
    question: 'What type of climate is calling you?',
    field: 'climate',
    options: [
      {
        value: 'Beachfront',
        label: 'Sunny Coastal Beaches',
        icon: '☀️',
        description: 'Emerald palms, warm turquoise water, and private beach clubs'
      },
      {
        value: 'Snowy Peaks',
        label: 'Snowy Peaks & Alpine Air',
        icon: '❄️',
        description: 'Ski chalets, Finnish saunas, wood stoves, and cozy fireside mulled wine'
      },
      {
        value: 'Desert',
        label: 'Vast Deserts & Starry Skies',
        icon: '🌌',
        description: 'Stargazing sky domes, fire pits, and surreal rock structures'
      }
    ]
  }
];

export const TRENDING_CITIES = [
  // SUMMER
  {
    name: 'Santorini, Greece',
    fromPrice: 225,
    img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80',
    desc: 'Breathtaking sunsets, whitewashed villas, and infinity pools overlooking the Aegean.',
    filterKey: 'Greece',
    season: 'summer'
  },
  {
    name: 'Amalfi Coast, Italy',
    fromPrice: 320,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80',
    desc: 'Cliffside coastal estates, yacht cruises, and freshly prepared local lemon dishes.',
    filterKey: 'Italy',
    season: 'summer'
  },
  {
    name: 'Bali, Indonesia',
    fromPrice: 45,
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=500&q=80',
    desc: 'Luxury jungle treehouses, pristine beach clubs, and quiet meditation pavilions.',
    filterKey: 'Thailand',
    season: 'summer'
  },
  {
    name: 'Ibiza, Spain',
    fromPrice: 195,
    img: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=500&q=80',
    desc: 'Crystal clear secret coves, bohemian villas, and prestigious global music clubs.',
    filterKey: 'France',
    season: 'summer'
  },

  // WINTER
  {
    name: 'Zermatt, Switzerland',
    fromPrice: 410,
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
    desc: 'Ski-in ski-out luxury chalets, private saunas, and spectacular views of the Matterhorn.',
    filterKey: 'France',
    season: 'winter'
  },
  {
    name: 'Aspen, Colorado',
    fromPrice: 380,
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=500&q=80',
    desc: 'Snowcapped peak vistas, roaring stone fireplaces, and premium alpine dining.',
    filterKey: 'United States',
    season: 'winter'
  },
  {
    name: 'Reykjavik, Iceland',
    fromPrice: 240,
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80',
    desc: 'Chasing the Northern Lights from outdoor hot tubs, geo-thermal spas, and volcanic stays.',
    filterKey: 'United Kingdom',
    season: 'winter'
  },
  {
    name: 'Niseko, Japan',
    fromPrice: 350,
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80',
    desc: 'World-renowned powder snow, traditional indoor thermal springs, and gourmet food.',
    filterKey: 'Japan',
    season: 'winter'
  },

  // SPRING
  {
    name: 'Tokyo, Japan',
    fromPrice: 180,
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80',
    desc: 'Stunning cherry blossom gardens, historic tea ceremonies, and neon city views.',
    filterKey: 'Japan',
    season: 'spring'
  },
  {
    name: 'Paris, France',
    fromPrice: 150,
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
    desc: 'Sunny courtyard cafes, beautiful street flower boutiques, and Louvre museum visits.',
    filterKey: 'France',
    season: 'spring'
  },
  {
    name: 'Amsterdam, Netherlands',
    fromPrice: 135,
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=500&q=80',
    desc: 'Vibrant tulip gardens, romantic narrow canal cruises, and scenic historic architecture.',
    filterKey: 'United Kingdom',
    season: 'spring'
  },
  {
    name: 'Provence, France',
    fromPrice: 210,
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=500&q=80',
    desc: 'Blooming purple lavender fields, medieval country estates, and organic winery tours.',
    filterKey: 'France',
    season: 'spring'
  },

  // AUTUMN
  {
    name: 'Kyoto, Japan',
    fromPrice: 195,
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=500&q=80',
    desc: 'Brilliant orange maple leaves surrounding historic golden temples and rock gardens.',
    filterKey: 'Japan',
    season: 'autumn'
  },
  {
    name: 'Vermont, USA',
    fromPrice: 175,
    img: 'https://images.unsplash.com/photo-1540553016722-983e48a2cd10?auto=format&fit=crop&w=500&q=80',
    desc: 'Magnificent golden foliage walks, local fresh maple orchards, and cozy rustic cabins.',
    filterKey: 'United States',
    season: 'autumn'
  },
  {
    name: 'Bavaria, Germany',
    fromPrice: 220,
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80',
    desc: 'Fairytale castles floating above mist-shrouded yellow forests and deep blue lakes.',
    filterKey: 'United Kingdom',
    season: 'autumn'
  },
  {
    name: 'Portland, Oregon',
    fromPrice: 140,
    img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=500&q=80',
    desc: 'Mist-clad giant redwood trails, roaring coastal waterfalls, and boutique coffee scenes.',
    filterKey: 'United States',
    season: 'autumn'
  }
];
