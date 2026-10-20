'use client';

import React, { FC, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IconFilter, IconLayoutGrid, IconLayoutList, IconRotate } from '@tabler/icons-react';
import { AccommodationsGridView } from '@/features/accommodation/components/AccommodationsGridView';
import { AccommodationsListView } from '@/features/accommodation/components/AccommodationsListView';
import { AccommodationsProps } from '@/features/accommodation/types/accommodations';
import { AccommodationsPagination } from '@/features/accommodation/components/AccommodationsPagination';
import { MapFilter } from '@/features/accommodation/components/filters/MapFilter';
import { Accordion, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AccommodationTypeFilter } from '@/features/accommodation/components/filters/AccommodationTypeFilter';
import { AreaFilter } from '@/features/accommodation/components/filters/AreaFilter';
import { ReviewScoreFilter } from '@/features/accommodation/components/filters/ReviewScoreFilter';
import { AccommodationClassificationFilter } from '@/features/accommodation/components/filters/AccommodationClassificationFilter';
import { AmenitiesFilter } from '@/features/accommodation/components/filters/AmenitiesFilter';

export interface Property {
  id: string;
  name: string;
  type: 'Hotel' | 'House' | 'Guest House' | 'Cabins' | 'Glamping' | 'Doms';
  location: string;
  country: string;
  rating: number;
  reviewsCount: number;
  priceOriginal: number;
  priceDiscount: number;
  image: string;
  description: string;
  amenities: string[];
  tags: string[];
  isDeal?: boolean;
  featured?: boolean;
  stars?: number;
  distanceFromCentre?: number; // in km
  roomSize?: number; // in m2
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  subtype?: string;
  details?: string;
  reviewsLabel?: string;
}

export interface SearchQuery {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  type: string;
}

export const PROPERTIES: Property[] = [
  // Barcelona Properties (matching the designs)
  {
    id: 'bcn-1',
    name: 'Hotel Arts Barcelona',
    type: 'Hotel',
    subtype: 'Luxury Hotel',
    location: 'Port Olímpic, Barcelona',
    country: 'Spain',
    rating: 5.0,
    reviewsLabel: 'Excellent',
    reviewsCount: 1260,
    priceOriginal: 1800,
    priceDiscount: 1500,
    image:
      'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    description:
      'A striking tower on the beachfront offering panoramic views of Port Olímpic, a Michelin-starred restaurant, and a gorgeous rooftop infinity pool.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Spa access',
      'Breakfast included',
      'Free cancellation',
      'Gym',
      'Bar',
      'Restaurant',
    ],
    tags: ['Getaway Deal', 'Sea View Room', 'King Bed'],
    isDeal: true,
    featured: true,
    stars: 5,
    distanceFromCentre: 1.8,
    roomSize: 40,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Sea View Room · King Bed',
  },
  {
    id: 'bcn-2',
    name: 'W Barcelona',
    type: 'Hotel',
    subtype: 'Beach Hotel',
    location: 'Barceloneta, Barcelona',
    country: 'Spain',
    rating: 5.0,
    reviewsLabel: 'Excellent',
    reviewsCount: 1200,
    priceOriginal: 1395,
    priceDiscount: 1395,
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    description:
      'The iconic sail-like hotel rising from Barceloneta beach. Features stunning Mediterranean views, direct beach access, and a glamorous rooftop lounge.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Spa access',
      'Breakfast included',
      'Restaurant',
      'Waterfront',
      'Bar',
      'Gym',
    ],
    tags: ['Best Location', 'Sea View Room', 'King Bed'],
    isDeal: false,
    featured: true,
    stars: 5,
    distanceFromCentre: 2.5,
    roomSize: 35,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Sea View Room · King Bed',
  },
  {
    id: 'bcn-3',
    name: 'Eurostars Grand Marina',
    type: 'Hotel',
    subtype: 'Harborfront Hotel',
    location: 'Port Vell, Barcelona',
    country: 'Spain',
    rating: 4.4,
    reviewsLabel: 'Very Good',
    reviewsCount: 1100,
    priceOriginal: 1350,
    priceDiscount: 1215,
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    description:
      'Set inside the World Trade Center building, this modern hotel features luxurious rooms overlooking the harbor, an outdoor pool, and proximity to La Rambla.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Breakfast included',
      'Free cancellation',
      'Gym',
      'Restaurant',
    ],
    tags: ['Getaway Deal', 'Deluxe Room', 'King Bed'],
    isDeal: true,
    featured: true,
    stars: 4,
    distanceFromCentre: 1.4,
    roomSize: 33,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Deluxe Room · King Bed',
  },
  {
    id: 'bcn-4',
    name: 'Melia Barcelona Sky',
    type: 'Hotel',
    subtype: 'Spa Hotel',
    location: 'Poblenou, Barcelona',
    country: 'Spain',
    rating: 3.8,
    reviewsLabel: 'Good',
    reviewsCount: 1050,
    priceOriginal: 1200,
    priceDiscount: 1080,
    image:
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    description:
      'Rising above the vibrant Poblenou district, this avant-garde skyscraper offers panoramic views, an award-winning spa, and premium chic rooms.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Spa access',
      'Breakfast included',
      'Free cancellation',
      'Gym',
      'Bar',
    ],
    tags: ['Best Value', 'Premium Room', 'King Bed'],
    isDeal: true,
    featured: false,
    stars: 4,
    distanceFromCentre: 3.5,
    roomSize: 36,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Premium Room · King Bed',
  },
  {
    id: 'bcn-5',
    name: 'SLS Barcelona',
    type: 'Hotel',
    subtype: 'Luxury Hotel',
    location: 'Port Forum, Barcelona',
    country: 'Spain',
    rating: 4.5,
    reviewsLabel: 'Very Good',
    reviewsCount: 990,
    priceOriginal: 1440,
    priceDiscount: 1440,
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description:
      'A glamorous beachfront hotel at Port Forum, bringing a splash of high luxury. Features high-end suites, multiple pools, and vibrant pool clubs.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Breakfast included',
      'Free cancellation',
      'Waterfront',
      'Gym',
      'Restaurant',
    ],
    tags: ['Guest Favourite', 'Panoramic Room', 'King Bed'],
    isDeal: false,
    featured: true,
    stars: 5,
    distanceFromCentre: 5.0,
    roomSize: 36,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Panoramic Room · King Bed',
  },
  {
    id: 'bcn-6',
    name: 'Majestic Hotel & Spa',
    type: 'Hotel',
    subtype: 'Historic Hotel',
    location: 'Passeig de Gràcia, Barcelona',
    country: 'Spain',
    rating: 4.5,
    reviewsLabel: 'Very Good',
    reviewsCount: 980,
    priceOriginal: 1325,
    priceDiscount: 1325,
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description:
      'A historic neoclassical hotel situated on Passeig de Gràcia. Elegance, rooftop cocktails, outstanding spa facilities, and premium twin suites.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Spa access',
      'Breakfast included',
      'Bar',
      'Restaurant',
      'Gym',
    ],
    tags: ['Guest Favourite', 'Twin Room', '2 Twin Beds'],
    isDeal: false,
    featured: true,
    stars: 3,
    distanceFromCentre: 0.5,
    roomSize: 28,
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    details: 'Twin Room · 2 Twin Beds',
  },
  {
    id: 'bcn-7',
    name: 'Sofitel Barcelona Skipper',
    type: 'Hotel',
    subtype: 'Beach Hotel',
    location: 'Port Olímpic, Barcelona',
    country: 'Spain',
    rating: 4.6,
    reviewsLabel: 'Very Good',
    reviewsCount: 900,
    priceOriginal: 1260,
    priceDiscount: 1260,
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    description:
      'A calm and sleek oasis near Port Olímpic beach. Features modern luxury furnishings, private balconies, and two outdoor pools.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Spa access',
      'Breakfast included',
      'Free cancellation',
      'Gym',
      'Restaurant',
    ],
    tags: ['Guest Favourite', 'Luxury King Room', 'King Bed'],
    isDeal: false,
    featured: true,
    stars: 4,
    distanceFromCentre: 1.8,
    roomSize: 34,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Luxury King Room · King Bed',
  },
  {
    id: 'bcn-8',
    name: 'Renaissance Hotel',
    type: 'Hotel',
    subtype: 'Seaside Hotel',
    location: 'Poblenou, Barcelona',
    country: 'Spain',
    rating: 3.9,
    reviewsLabel: 'Good',
    reviewsCount: 850,
    priceOriginal: 1150,
    priceDiscount: 1035,
    image:
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    description:
      'Boasting a sleek rooftop terrace and great seaside access in Poblenou. Comfortable queen suites with full ocean vistas.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Breakfast included',
      'Free cancellation',
      'Restaurant',
      'Bar',
    ],
    tags: ['Getaway Deal', 'Sea View Room', 'Queen Bed'],
    isDeal: true,
    featured: false,
    stars: 3,
    distanceFromCentre: 3.2,
    roomSize: 28,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Sea View Room · Queen Bed',
  },
  {
    id: 'bcn-9',
    name: 'Hotel 54 Barceloneta',
    type: 'Hotel',
    subtype: 'Boutique Hotel',
    location: 'Barceloneta, Barcelona',
    country: 'Spain',
    rating: 4.0,
    reviewsLabel: 'Very Good',
    reviewsCount: 620,
    priceOriginal: 1000,
    priceDiscount: 900,
    image:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    description:
      'A stylish boutique hotel in Barceloneta, steps from the sea. Highlighting a gorgeous rooftop bar with views of Port Vell harbor.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Breakfast included',
      'Free cancellation',
      'Bar',
      'Waterfront',
    ],
    tags: ['Guest Favourite', 'Double Room', 'Double Bed'],
    isDeal: true,
    featured: true,
    stars: 4,
    distanceFromCentre: 1.8,
    roomSize: 24,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Double Room · Double Bed',
  },
  {
    id: 'bcn-10',
    name: 'Hotel SB Diagonal Zero',
    type: 'Hotel',
    subtype: 'Spa Hotel',
    location: 'Sant Martí, Barcelona',
    country: 'Spain',
    rating: 3.5,
    reviewsLabel: 'Good',
    reviewsCount: 780,
    priceOriginal: 1100,
    priceDiscount: 990,
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
    description:
      'A wellness-focused hotel featuring state-of-the-art spa facilities, an outdoor pool, and sleek contemporary ocean-view suites.',
    amenities: [
      'Air Conditioning',
      'Wi-Fi',
      'Pool',
      'Spa access',
      'Free cancellation',
      'Gym',
      'Restaurant',
    ],
    tags: ['Best Value', 'Ocean View Suite', 'King Bed'],
    isDeal: true,
    featured: false,
    stars: 3,
    distanceFromCentre: 4.5,
    roomSize: 40,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    details: 'Ocean View Suite · King Bed',
  },
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
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description:
      'An elegant villa nestled on the dramatic cliffs of the Amalfi Coast, offering jaw-dropping views of the Tyrrhenian Sea, a private infinity pool, and authentic Mediterranean hospitality.',
    amenities: [
      'Infinity Pool',
      'Ocean View',
      'Free Wi-Fi',
      'Complimentary Breakfast',
      'Private Balcony',
      'Air Conditioning',
    ],
    tags: ['Clifftop', 'Luxury', 'Romantic'],
    isDeal: true,
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=800&q=80',
    description:
      'Immerse yourself in nature with this authentic thatch-roof tropical bungalow. Surrounded by lush emerald palms and steps from the white sands of Kata Beach.',
    amenities: [
      'Beachfront Access',
      'Outdoor Shower',
      'Free Wi-Fi',
      'Hammock',
      'Scooter Rental',
      'Massage Services',
    ],
    tags: ['Eco-friendly', 'Tropical', 'Beachfront'],
    isDeal: true,
    featured: false,
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
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    description:
      'A striking whitewashed sanctuary situated in Oia. Enjoy premium cave-style suites with a private heated plunge pool, overlooking the world-famous caldera sunset.',
    amenities: [
      'Heated Plunge Pool',
      'Sunset View',
      'Free Airport Shuttle',
      'Luxury Toiletries',
      'Espresso Machine',
      '24/7 Butler Service',
    ],
    tags: ['Caldera View', 'Iconic', 'Honeymoon'],
    isDeal: true,
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    description:
      'A stylish upscale resort combining Andalusian charm with modern luxury. Features a private beach club, award-winning golf course, and a Michelin-starred dining experience.',
    amenities: [
      'Private Beach Club',
      'Golf Course',
      'Spa & Wellness',
      'Michelin Restaurant',
      'Kids Club',
      'Poolside Bar',
    ],
    tags: ['Golf & Spa', 'Upscale', 'Beachfront'],
    isDeal: true,
    featured: false,
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
    image:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    description:
      'An art-deco masterpiece overlooking the Promenade des Anglais. Stunning French Riviera vistas, a rooftop sun deck, and proximity to Nice’s historic old town.',
    amenities: [
      'Rooftop Pool',
      'Sea View',
      'Fitness Center',
      'Bicycle Hire',
      'Pet Friendly',
      'Cocktail Lounge',
    ],
    tags: ['French Riviera', 'Art Deco', 'City Center'],
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    description:
      'A luxurious private estate surrounded by ancient olive trees and palms. Perfect for families, with a tennis court, large swimming pool, and fully equipped barbecue lounge.',
    amenities: [
      'Private Tennis Court',
      'Large Swimming Pool',
      'BBQ Grill',
      'Fully Equipped Kitchen',
      'Free Wi-Fi',
      'Fireplace',
    ],
    tags: ['Family Friendly', 'Secluded', 'Luxury Estate'],
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    description:
      'A bohemian chic retreat tucked away in the Tulum jungle. Offers a mindful space with daily morning yoga, natural cenote-style swimming pools, and vegan dining.',
    amenities: [
      'Daily Yoga Classes',
      'Natural Cenote Pool',
      'Bicycles Provided',
      'Air Conditioning',
      'Organic Breakfast',
      'Eco Toiletries',
    ],
    tags: ['Jungle Retreat', 'Mindfulness', 'Eco-friendly'],
    featured: false,
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
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    description:
      'Perched in the quiet mountain-side village of Ravello, this historical villa offers gorgeous terraced gardens, private dining with a local chef, and absolute serenity.',
    amenities: [
      'Terraced Gardens',
      'Private Chef Optional',
      'Ocean Views',
      'Historical Architecture',
      'Wine Cellar',
      'Hot Tub',
    ],
    tags: ['Mountain View', 'Heritage', 'Serene'],
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
    description:
      'A striking modern A-frame cabin surrounded by towering Oregon redwoods. Highlights include a cedar wood-fired hot tub, outdoor movie projector, and cozy wood stove.',
    amenities: [
      'Wood-Fired Hot Tub',
      'Wood Stove',
      'Outdoor Cinema',
      'Free Wi-Fi',
      'Espresso Bar',
      'Hiking Trail Access',
    ],
    tags: ['Forest Cabin', 'Cozy', 'Woodlands'],
    isDeal: true,
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
    image:
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', // Replace with a dome-like look
    description:
      'An architectural geodesic dome offering panoramic views of Joshua Tree’s desert landscape. Features transparent ceiling panels for stargazing right from your luxury king bed.',
    amenities: [
      'Stargazing Sky Window',
      'Hot Tub',
      'Fire Pit',
      'Outdoor Kitchen',
      'Tesla Charger',
      'Acoustic Guitar',
    ],
    tags: ['Desert', 'Stargazing', 'Geodesic'],
    featured: true,
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
    image:
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80',
    description:
      'Experience the wild in ultimate luxury. Safari-style canvas tents elevated on mahogany decks with private plunge pools, gourmet dining, and daily guided game drives.',
    amenities: [
      'Safari Game Drives',
      'Private Plunge Pool',
      'All-Inclusive Dining',
      'En-Suite Bathroom',
      'Solar Power',
      'Star Deck',
    ],
    tags: ['Wildlife', 'Adventure', 'Canvas Luxury'],
    isDeal: true,
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
    image:
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
    description:
      'A traditional timber chalet nestled near the slopes of the Matterhorn. Comes with a sauna, ski storage, roaring fireplace, and majestic snowcapped mountain vistas.',
    amenities: [
      'Private Finnish Sauna',
      'Stone Fireplace',
      'Ski-in / Ski-out',
      'Heated Boot Rack',
      'Fondue Set',
      'Balcony with Matterhorn View',
    ],
    tags: ['Snowy Peaks', 'Ski Chalet', 'Cosy Fireplace'],
    featured: false,
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
    image:
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&fit=crop&w=800&q=80',
    description:
      'Watch the magical Northern Lights dance across the sky from the comfort of a heated glass dome. Includes premium thermal bedding, private sauna, and snowmobile tours.',
    amenities: [
      'Heated Glass Roof',
      'Northern Lights Wakeup',
      'Private Sauna',
      'Snowmobile Tours',
      'Underfloor Heating',
      'Champagne on Arrival',
    ],
    tags: ['Aurora Borealis', 'Bucket List', 'Arctic Escape'],
    isDeal: true,
    featured: true,
  },
];

export const Accommodations: FC<AccommodationsProps> = ({
  city,
  totalPages,
  totalCount,
  accommodations,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const layout = searchParams.get('layout');
  const skip = Number(searchParams.get('skip'));
  const take = Number(searchParams.get('take'));
  const currentPage = skip / take;

  const createQueryString = useCallback(
    (name: string | Record<string, string | number>, value?: string | number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (typeof name === 'string') {
        params.set(name, String(value));
      } else {
        Object.entries(name).forEach(([key, val]) => {
          params.set(key, String(val));
        });
      }

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const handleToggleFilter = (key: string, value: string, allValues: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Get current selected values for this key
    const currentSelected = new Set(params.get(key)?.split(',').filter(Boolean) ?? []);

    // Toggle the value
    if (currentSelected.has(value)) {
      currentSelected.delete(value);
    } else {
      currentSelected.add(value);
    }

    // Filter to only include valid values (preserves order from allValues)
    const values = allValues.filter((v) => currentSelected.has(v));

    // Update params
    if (values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join(','));
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8" id="stays-directory">
      {/* Search Header Info */}
      <div className="flex flex-col gap-4 border-b border-slate-200/80 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display flex items-center gap-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Explore {totalCount}+ Places in{' '}
            <span className="text-blue-600 underline decoration-amber-400 decoration-wavy decoration-2">
              {city}
            </span>
          </h2>
          <p className="mt-1 text-xs text-slate-400 sm:text-sm">
            Carefully verified, luxury apartments, beach hotels, and designer boutique suites.
          </p>
        </div>

        <div className="flex items-center justify-end gap-1.5">
          <button
            onClick={() => createQueryString('layout', 'grid')}
            className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
              layout === 'grid'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
            aria-label="Grid View"
          >
            <IconLayoutGrid className="size-4.5" />
          </button>

          <button
            onClick={() => createQueryString('layout', 'list')}
            className={`cursor-pointer rounded-lg border p-2.5 transition-all ${
              layout === 'list'
                ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'
            }`}
            aria-label="List View"
          >
            <IconLayoutList className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* LEFT COLUMN: Sidebar Filters */}
        <div className="space-y-6 lg:col-span-1">
          <MapFilter />

          {/* SIDEBAR MAIN BOX */}
          <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white">
            {/* Filter title and Clear button */}
            <div className="flex items-center justify-between bg-slate-50 p-4">
              <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-800 uppercase">
                <IconFilter className="size-3.5 text-slate-500" />
                <span>Filter by:</span>
                {20 > 0 && (
                  <span className="rounded-full bg-blue-600 px-1.5 py-0.5 font-mono text-[10px] text-white">
                    {20}
                  </span>
                )}
              </span>
              {20 > 0 && (
                <button
                  onClick={() => {
                    // TODO: reset filters
                  }}
                  className="flex cursor-pointer items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  <IconRotate className="size-3 rotate-180" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <Accordion
              type="multiple"
              defaultValue={[
                'area',
                'amenities',
                'review-score',
                'accommodation-type',
                'accommodation-classification',
              ]}
            >
              <AccommodationTypeFilter onChange={(value) => createQueryString('type', value)} />
              <AreaFilter onToggle={handleToggleFilter} />
              <ReviewScoreFilter onToggle={handleToggleFilter} />
              <AccommodationClassificationFilter onToggle={handleToggleFilter} />
              <AmenitiesFilter />

              <AccordionItem
                disabled
                value="rooms-beds"
                className="flex flex-col gap-3 border-b p-4"
              >
                <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
                  Rooms and Beds
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem
                disabled
                value="booking-options"
                className="flex flex-col gap-3 border-b p-4"
              >
                <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
                  Booking Options
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem
                disabled
                value="payment-options"
                className="flex flex-col gap-3 border-b p-4"
              >
                <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
                  Payment Options
                </AccordionTrigger>
              </AccordionItem>
              <AccordionItem
                disabled
                value="accessibility-features"
                className="flex flex-col gap-3 border-b p-4"
              >
                <AccordionTrigger className="py-0 text-[13px] font-semibold hover:no-underline">
                  Accessibility Features
                </AccordionTrigger>
              </AccordionItem>
            </Accordion>

            {/*  /!* Accordion 3: Rooms and Beds *!/*/}
            {/*  <div className="space-y-3 p-4">*/}
            {/*    <button*/}
            {/*      onClick={() => toggleAccordion('roomsAndBeds')}*/}
            {/*      className="flex w-full items-center justify-between text-left text-xs font-bold tracking-wider text-slate-800 uppercase focus:outline-none"*/}
            {/*    >*/}
            {/*      <span>Rooms and Beds</span>*/}
            {/*      {accordions.roomsAndBeds ? (*/}
            {/*        <ChevronUp className="h-4 w-4 text-slate-400" />*/}
            {/*      ) : (*/}
            {/*        <ChevronDown className="h-4 w-4 text-slate-400" />*/}
            {/*      )}*/}
            {/*    </button>*/}

            {/*    <AnimatePresence initial={false}>*/}
            {/*      {accordions.roomsAndBeds && (*/}
            {/*        <motion.div*/}
            {/*          initial={{ height: 0, opacity: 0 }}*/}
            {/*          animate={{ height: 'auto', opacity: 1 }}*/}
            {/*          exit={{ height: 0, opacity: 0 }}*/}
            {/*          transition={{ duration: 0.2 }}*/}
            {/*          className="space-y-3.5 overflow-hidden pt-1"*/}
            {/*        >*/}
            {/*          /!* Bedrooms *!/*/}
            {/*          <div className="flex items-center justify-between">*/}
            {/*            <span className="text-xs font-medium text-slate-600">Bedrooms</span>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*              <button*/}
            {/*                onClick={() =>*/}
            {/*                  setBedrooms((prev) =>*/}
            {/*                    prev === 'any' ? 1 : prev > 1 ? prev - 1 : 'any',*/}
            {/*                  )*/}
            {/*                }*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Minus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*              <span className="w-8 text-center font-mono text-xs font-bold text-slate-800">*/}
            {/*                {bedrooms}*/}
            {/*              </span>*/}
            {/*              <button*/}
            {/*                onClick={() => setBedrooms((prev) => (prev === 'any' ? 1 : prev + 1))}*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Plus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*            </div>*/}
            {/*          </div>*/}

            {/*          /!* Beds *!/*/}
            {/*          <div className="flex items-center justify-between">*/}
            {/*            <span className="text-xs font-medium text-slate-600">Beds</span>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*              <button*/}
            {/*                onClick={() =>*/}
            {/*                  setBeds((prev) => (prev === 'any' ? 1 : prev > 1 ? prev - 1 : 'any'))*/}
            {/*                }*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Minus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*              <span className="w-8 text-center font-mono text-xs font-bold text-slate-800">*/}
            {/*                {beds}*/}
            {/*              </span>*/}
            {/*              <button*/}
            {/*                onClick={() => setBeds((prev) => (prev === 'any' ? 1 : prev + 1))}*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Plus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*            </div>*/}
            {/*          </div>*/}

            {/*          /!* Bathrooms *!/*/}
            {/*          <div className="flex items-center justify-between">*/}
            {/*            <span className="text-xs font-medium text-slate-600">Bathrooms</span>*/}
            {/*            <div className="flex items-center space-x-2">*/}
            {/*              <button*/}
            {/*                onClick={() =>*/}
            {/*                  setBathrooms((prev) =>*/}
            {/*                    prev === 'any' ? 1 : prev > 1 ? prev - 1 : 'any',*/}
            {/*                  )*/}
            {/*                }*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Minus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*              <span className="w-8 text-center font-mono text-xs font-bold text-slate-800">*/}
            {/*                {bathrooms}*/}
            {/*              </span>*/}
            {/*              <button*/}
            {/*                onClick={() => setBathrooms((prev) => (prev === 'any' ? 1 : prev + 1))}*/}
            {/*                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-900 focus:outline-none active:scale-95"*/}
            {/*              >*/}
            {/*                <Plus className="h-3.5 w-3.5" />*/}
            {/*              </button>*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </motion.div>*/}
            {/*      )}*/}
            {/*    </AnimatePresence>*/}
            {/*  </div>*/}

            {/*  /!* Accordion 7: Amenities *!/*/}
            {/*  <div className="space-y-3 p-4">*/}
            {/*    <button*/}
            {/*      onClick={() => toggleAccordion('amenities')}*/}
            {/*      className="flex w-full items-center justify-between text-left text-xs font-bold tracking-wider text-slate-800 uppercase focus:outline-none"*/}
            {/*    >*/}
            {/*      <span>Amenities</span>*/}
            {/*      {accordions.amenities ? (*/}
            {/*        <ChevronUp className="h-4 w-4 text-slate-400" />*/}
            {/*      ) : (*/}
            {/*        <ChevronDown className="h-4 w-4 text-slate-400" />*/}
            {/*      )}*/}
            {/*    </button>*/}

            {/*    <AnimatePresence initial={false}>*/}
            {/*      {accordions.amenities && (*/}
            {/*        <motion.div*/}
            {/*          initial={{ height: 0, opacity: 0 }}*/}
            {/*          animate={{ height: 'auto', opacity: 1 }}*/}
            {/*          exit={{ height: 0, opacity: 0 }}*/}
            {/*          transition={{ duration: 0.2 }}*/}
            {/*          className="space-y-3 overflow-hidden pt-1"*/}
            {/*        >*/}
            {/*          /!* Popular section inside amenities *!/*/}
            {/*          <div className="space-y-2">*/}
            {/*            <span className="block text-[10px] font-bold tracking-widest text-slate-400 uppercase">*/}
            {/*              Popular*/}
            {/*            </span>*/}
            {/*            <div className="grid grid-cols-2 gap-1.5">*/}
            {/*              {[*/}
            {/*                'Air Conditioning',*/}
            {/*                'Wi-Fi',*/}
            {/*                'Pool',*/}
            {/*                'Spa access',*/}
            {/*                'Breakfast included',*/}
            {/*                'Gym',*/}
            {/*                'Restaurant',*/}
            {/*              ].map((am) => {*/}
            {/*                const active = selectedAmenities.includes(am);*/}
            {/*                return (*/}
            {/*                  <button*/}
            {/*                    key={am}*/}
            {/*                    onClick={() => handleToggleAmenity(am)}*/}
            {/*                    className={`flex cursor-pointer items-center space-x-1 rounded-lg border px-2 py-1.5 text-left text-[10px] font-bold tracking-wide transition-all focus:outline-none ${*/}
            {/*                      active*/}
            {/*                        ? 'border-blue-200 bg-blue-50 text-blue-700 shadow-2xs'*/}
            {/*                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'*/}
            {/*                    }`}*/}
            {/*                  >*/}
            {/*                    {active && (*/}
            {/*                      <Check className="mr-0.5 h-2.5 w-2.5 shrink-0 text-blue-600" />*/}
            {/*                    )}*/}
            {/*                    <span className="truncate">{am}</span>*/}
            {/*                  </button>*/}
            {/*                );*/}
            {/*              })}*/}
            {/*            </div>*/}
            {/*          </div>*/}
            {/*        </motion.div>*/}
            {/*      )}*/}
            {/*    </AnimatePresence>*/}
            {/*  </div>*/}

            {/*  /!* Accordion 8: Location Suburbs *!/*/}
            {/*  <div className="space-y-3 p-4">*/}
            {/*    <button*/}
            {/*      onClick={() => toggleAccordion('location')}*/}
            {/*      className="flex w-full items-center justify-between text-left text-xs font-bold tracking-wider text-slate-800 uppercase focus:outline-none"*/}
            {/*    >*/}
            {/*      <span>Location</span>*/}
            {/*      {accordions.location ? (*/}
            {/*        <ChevronUp className="h-4 w-4 text-slate-400" />*/}
            {/*      ) : (*/}
            {/*        <ChevronDown className="h-4 w-4 text-slate-400" />*/}
            {/*      )}*/}
            {/*    </button>*/}

            {/*    <AnimatePresence initial={false}>*/}
            {/*      {accordions.location && (*/}
            {/*        <motion.div*/}
            {/*          initial={{ height: 0, opacity: 0 }}*/}
            {/*          animate={{ height: 'auto', opacity: 1 }}*/}
            {/*          exit={{ height: 0, opacity: 0 }}*/}
            {/*          transition={{ duration: 0.2 }}*/}
            {/*          className="space-y-2 overflow-hidden pt-1"*/}
            {/*        >*/}
            {/*          {locationOptions.map((loc) => {*/}
            {/*            const active = selectedLocations.includes(loc);*/}
            {/*            return (*/}
            {/*              <label*/}
            {/*                key={loc}*/}
            {/*                className="group flex cursor-pointer items-center space-x-2.5 text-xs font-medium text-slate-600"*/}
            {/*              >*/}
            {/*                <input*/}
            {/*                  type="checkbox"*/}
            {/*                  checked={active}*/}
            {/*                  onChange={() => handleToggleLocation(loc)}*/}
            {/*                  className="h-4 w-4 cursor-pointer rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"*/}
            {/*                />*/}
            {/*                <span className="transition-colors group-hover:text-slate-900">*/}
            {/*                  {loc}*/}
            {/*                </span>*/}
            {/*              </label>*/}
            {/*            );*/}
            {/*          })}*/}
            {/*        </motion.div>*/}
            {/*      )}*/}
            {/*    </AnimatePresence>*/}
            {/*  </div>*/}

            {/*  /!* Collapsed accordions for full visual fidelity with layout screenshot *!/*/}
            {/*  {['Booking Options', 'Payment Options', 'Property Type', 'Accessibility Features'].map(*/}
            {/*    (title) => (*/}
            {/*      <div key={title} className="p-4">*/}
            {/*        <button className="flex w-full cursor-not-allowed items-center justify-between text-left text-xs font-bold tracking-wider text-slate-400 uppercase focus:outline-none">*/}
            {/*          <span>{title}</span>*/}
            {/*          <ChevronDown className="h-4 w-4 text-slate-300" />*/}
            {/*        </button>*/}
            {/*      </div>*/}
            {/*    ),*/}
            {/*  )}*/}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Properties List */}
        <div className="space-y-6 lg:col-span-3">
          {accommodations.length === 0 ? (
            <div className="space-y-4 rounded-3xl border border-dashed border-slate-200 bg-white px-4 py-24 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-slate-200/80 bg-slate-50 text-slate-400">
                <SlidersHorizontal className="h-7 w-7" />
              </div>
              <h3 className="font-display text-base font-bold text-slate-800">
                No matching stays found
              </h3>
              <p className="mx-auto max-w-sm text-xs text-slate-400">
                No stays matched your current selection. Try broadening your price boundaries or
                removing search terms.
              </p>
              <button
                onClick={() => {
                  // TODO: reset filters
                }}
                className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-blue-700 focus:outline-none active:scale-95"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              {layout === 'grid' && <AccommodationsGridView accommodations={accommodations} />}
              {layout === 'list' && <AccommodationsListView accommodations={accommodations} />}
              {accommodations.length > 1 && (
                <AccommodationsPagination
                  skip={skip}
                  take={take}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  isPreviousPageDisabled={skip === 0}
                  isNextPageDisabled={currentPage === totalPages - 1}
                  onSkipChange={(skip) => createQueryString('skip', skip)}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* FULL MAP VIEW INTERACTIVE MODAL */}
      {/*<AnimatePresence>*/}
      {/*  {isMapModalOpen && (*/}
      {/*    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-slate-950/60 p-0 backdrop-blur-sm md:p-6">*/}
      {/*      <motion.div*/}
      {/*        initial={{ scale: 0.95, opacity: 0 }}*/}
      {/*        animate={{ scale: 1, opacity: 1 }}*/}
      {/*        exit={{ scale: 0.95, opacity: 0 }}*/}
      {/*        className="flex h-full w-full flex-col overflow-hidden bg-white shadow-2xl md:h-[80vh] md:max-w-6xl md:rounded-3xl"*/}
      {/*      >*/}
      {/*        /!* Map Header *!/*/}
      {/*        <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 bg-white px-6 py-4">*/}
      {/*          <div>*/}
      {/*            <h3 className="font-display flex items-center gap-1.5 text-base font-bold text-slate-800">*/}
      {/*              <Map className="h-4.5 w-4.5 animate-pulse text-blue-600" />*/}
      {/*              <span>Barcelona Stay Map Directory</span>*/}
      {/*            </h3>*/}
      {/*            <p className="text-[11px] text-slate-400">*/}
      {/*              Showing {filteredAndSortedStays.length} matching stays. Hover over map pins to*/}
      {/*              explore details.*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*          <button*/}
      {/*            onClick={() => setIsMapModalOpen(false)}*/}
      {/*            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-600 focus:outline-none"*/}
      {/*          >*/}
      {/*            <X className="h-5 w-5" />*/}
      {/*          </button>*/}
      {/*        </div>*/}

      {/*        /!* Map Split Layout *!/*/}
      {/*        <div className="flex flex-grow overflow-hidden">*/}
      {/*          /!* Left pane: Stays cards list *!/*/}
      {/*          <div className="hidden w-full shrink-0 space-y-4 overflow-y-auto border-r border-slate-200/80 bg-slate-50 p-4 md:block md:w-[380px]">*/}
      {/*            {filteredAndSortedStays.map((property) => {*/}
      {/*              const isHovered = hoveredMapPropertyId === property.id;*/}
      {/*              const price = property.isDeal ? property.priceDiscount : property.priceOriginal;*/}
      {/*              return (*/}
      {/*                <div*/}
      {/*                  key={property.id}*/}
      {/*                  onMouseEnter={() => setHoveredMapPropertyId(property.id)}*/}
      {/*                  onMouseLeave={() => setHoveredMapPropertyId(null)}*/}
      {/*                  onClick={() => {*/}
      {/*                    onSelectProperty?.(property);*/}
      {/*                    setIsMapModalOpen(false);*/}
      {/*                  }}*/}
      {/*                  className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-3 transition-all ${*/}
      {/*                    isHovered*/}
      {/*                      ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20'*/}
      {/*                      : 'border-slate-200/80'*/}
      {/*                  }`}*/}
      {/*                >*/}
      {/*                  <img*/}
      {/*                    src={property.image}*/}
      {/*                    alt={property.name}*/}
      {/*                    className="h-16 w-16 rounded-xl object-cover"*/}
      {/*                  />*/}
      {/*                  <div className="min-w-0 flex-grow">*/}
      {/*                    <h4 className="truncate text-xs font-bold text-slate-800">*/}
      {/*                      {property.name}*/}
      {/*                    </h4>*/}
      {/*                    <div className="mt-0.5 flex items-center space-x-1">*/}
      {/*                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />*/}
      {/*                      <span className="text-[10px] font-bold text-slate-700">*/}
      {/*                        {property.rating}*/}
      {/*                      </span>*/}
      {/*                      <span className="text-slate-300">•</span>*/}
      {/*                      <span className="truncate text-[10px] text-slate-400">*/}
      {/*                        {property.location.split(',')[0]}*/}
      {/*                      </span>*/}
      {/*                    </div>*/}
      {/*                    <span className="mt-1 block font-mono text-xs font-extrabold text-blue-600">*/}
      {/*                      ${price}/night*/}
      {/*                    </span>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </div>*/}

      {/*          /!* Right pane: Beautiful interactive map area *!/*/}
      {/*          <div className="relative flex flex-grow items-center justify-center overflow-hidden bg-blue-50 select-none">*/}
      {/*            <svg*/}
      {/*              className="absolute inset-0 h-full w-full text-slate-200"*/}
      {/*              viewBox="0 0 600 400"*/}
      {/*              fill="none"*/}
      {/*              xmlns="http://www.w3.org/2000/svg"*/}
      {/*            >*/}
      {/*              /!* Coastal line & Deep Mediterranean sea *!/*/}
      {/*              <path*/}
      {/*                d="M-50,220 C150,180 350,300 650,220 L650,450 L-50,450 Z"*/}
      {/*                fill="#e0f2fe"*/}
      {/*              />*/}
      {/*              <path*/}
      {/*                d="M-50,240 C150,200 350,320 650,240 L650,450 L-50,450 Z"*/}
      {/*                fill="#bae6fd"*/}
      {/*              />*/}

      {/*              /!* Land Area streets grids *!/*/}
      {/*              <path*/}
      {/*                d="M-50,220 C150,180 350,300 650,220 L650,-50 L-50,-50 Z"*/}
      {/*                fill="#fefefe"*/}
      {/*              />*/}
      {/*              <line x1="50" y1="0" x2="50" y2="400" stroke="#f1f5f9" strokeWidth="6" />*/}
      {/*              <line x1="150" y1="0" x2="150" y2="400" stroke="#f1f5f9" strokeWidth="8" />*/}
      {/*              <line x1="250" y1="0" x2="250" y2="400" stroke="#f1f5f9" strokeWidth="6" />*/}
      {/*              <line x1="380" y1="0" x2="380" y2="400" stroke="#f1f5f9" strokeWidth="10" />*/}
      {/*              <line x1="500" y1="0" x2="500" y2="400" stroke="#f1f5f9" strokeWidth="6" />*/}
      {/*              <line x1="0" y1="80" x2="600" y2="80" stroke="#f1f5f9" strokeWidth="8" />*/}
      {/*              <line x1="0" y1="180" x2="600" y2="180" stroke="#f1f5f9" strokeWidth="12" />*/}
      {/*              <line x1="0" y1="280" x2="600" y2="280" stroke="#f1f5f9" strokeWidth="6" />*/}

      {/*              /!* Major districts labels *!/*/}
      {/*              <text*/}
      {/*                x="80"*/}
      {/*                y="50"*/}
      {/*                fill="#94a3b8"*/}
      {/*                fontSize="10"*/}
      {/*                fontWeight="bold"*/}
      {/*                fontFamily="sans-serif"*/}
      {/*              >*/}
      {/*                PASSEIG DE GRÀCIA*/}
      {/*              </text>*/}
      {/*              <text*/}
      {/*                x="420"*/}
      {/*                y="110"*/}
      {/*                fill="#94a3b8"*/}
      {/*                fontSize="10"*/}
      {/*                fontWeight="bold"*/}
      {/*                fontFamily="sans-serif"*/}
      {/*              >*/}
      {/*                POBLENOU*/}
      {/*              </text>*/}
      {/*              <text*/}
      {/*                x="180"*/}
      {/*                y="240"*/}
      {/*                fill="#94a3b8"*/}
      {/*                fontSize="10"*/}
      {/*                fontWeight="bold"*/}
      {/*                fontFamily="sans-serif"*/}
      {/*              >*/}
      {/*                PORT VELL*/}
      {/*              </text>*/}
      {/*              <text*/}
      {/*                x="320"*/}
      {/*                y="200"*/}
      {/*                fill="#94a3b8"*/}
      {/*                fontSize="10"*/}
      {/*                fontWeight="bold"*/}
      {/*                fontFamily="sans-serif"*/}
      {/*              >*/}
      {/*                PORT OLÍMPIC*/}
      {/*              </text>*/}
      {/*              <text*/}
      {/*                x="120"*/}
      {/*                y="320"*/}
      {/*                fill="#0284c7"*/}
      {/*                fontSize="12"*/}
      {/*                fontWeight="bold"*/}
      {/*                fontFamily="sans-serif"*/}
      {/*                opacity="0.6"*/}
      {/*              >*/}
      {/*                MEDITERRANEAN SEA*/}
      {/*              </text>*/}
      {/*            </svg>*/}

      {/*            /!* Pins layout using coordinates map *!/*/}
      {/*            {filteredAndSortedStays.map((property, idx) => {*/}
      {/*              const price = property.isDeal ? property.priceDiscount : property.priceOriginal;*/}
      {/*              const isHovered = hoveredMapPropertyId === property.id;*/}

      {/*              // Simple deterministic coordinates mapping based on index or properties ID*/}
      {/*              const coords: { [key: string]: { x: number; y: number } } = {*/}
      {/*                'bcn-1': { x: 340, y: 170 },*/}
      {/*                'bcn-2': { x: 210, y: 220 },*/}
      {/*                'bcn-3': { x: 160, y: 200 },*/}
      {/*                'bcn-4': { x: 450, y: 110 },*/}
      {/*                'bcn-5': { x: 520, y: 130 },*/}
      {/*                'bcn-6': { x: 120, y: 70 },*/}
      {/*                'bcn-7': { x: 360, y: 160 },*/}
      {/*                'bcn-8': { x: 430, y: 130 },*/}
      {/*                'bcn-9': { x: 230, y: 200 },*/}
      {/*                'bcn-10': { x: 490, y: 90 },*/}
      {/*              };*/}

      {/*              const pos = coords[property.id] || {*/}
      {/*                x: 100 + ((idx * 40) % 400),*/}
      {/*                y: 100 + ((idx * 30) % 200),*/}
      {/*              };*/}

      {/*              return (*/}
      {/*                <div*/}
      {/*                  key={property.id}*/}
      {/*                  style={{ left: `${pos.x}px`, top: `${pos.y}px` }}*/}
      {/*                  onMouseEnter={() => setHoveredMapPropertyId(property.id)}*/}
      {/*                  onMouseLeave={() => setHoveredMapPropertyId(null)}*/}
      {/*                  onClick={() => {*/}
      {/*                    onSelectProperty?.(property);*/}
      {/*                    setIsMapModalOpen(false);*/}
      {/*                  }}*/}
      {/*                  className="group absolute z-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer"*/}
      {/*                >*/}
      {/*                  <div className="relative">*/}
      {/*                    /!* Pulsing beacon if hovered *!/*/}
      {/*                    {isHovered && (*/}
      {/*                      <span className="absolute -inset-2 animate-ping rounded-full bg-blue-500/30" />*/}
      {/*                    )}*/}

      {/*                    /!* Price Tag Bubble pin layout *!/*/}
      {/*                    <div*/}
      {/*                      className={`flex items-center space-x-0.5 rounded-lg border px-2 py-1 font-mono text-[10px] font-extrabold shadow-lg transition-all ${*/}
      {/*                        isHovered*/}
      {/*                          ? 'z-30 scale-110 border-blue-600 bg-blue-600 text-white'*/}
      {/*                          : 'border-slate-200 bg-white text-slate-800'*/}
      {/*                      }`}*/}
      {/*                    >*/}
      {/*                      <span>${price}</span>*/}
      {/*                    </div>*/}

      {/*                    /!* Arrow pointing down *!/*/}
      {/*                    <div*/}
      {/*                      className={`mx-auto -mt-1 h-2 w-2 rotate-45 shadow-lg transition-colors ${*/}
      {/*                        isHovered ? 'bg-blue-600' : 'bg-white'*/}
      {/*                      }`}*/}
      {/*                    />*/}
      {/*                  </div>*/}

      {/*                  /!* HOVER TOOLTIP CARD *!/*/}
      {/*                  <AnimatePresence>*/}
      {/*                    {isHovered && (*/}
      {/*                      <motion.div*/}
      {/*                        initial={{ opacity: 0, y: 10, scale: 0.95 }}*/}
      {/*                        animate={{ opacity: 1, y: 0, scale: 1 }}*/}
      {/*                        exit={{ opacity: 0, y: 10, scale: 0.95 }}*/}
      {/*                        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-48 -translate-x-1/2 rounded-xl border border-slate-200/80 bg-white p-2 shadow-2xl"*/}
      {/*                      >*/}
      {/*                        <img*/}
      {/*                          src={property.image}*/}
      {/*                          alt=""*/}
      {/*                          className="h-24 w-full rounded-lg object-cover"*/}
      {/*                        />*/}
      {/*                        <h5 className="mt-1.5 truncate text-[11px] font-bold text-slate-800">*/}
      {/*                          {property.name}*/}
      {/*                        </h5>*/}
      {/*                        <div className="mt-0.5 flex items-center space-x-1 text-[9px] text-slate-500">*/}
      {/*                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />*/}
      {/*                          <span className="font-bold text-slate-700">{property.rating}</span>*/}
      {/*                          <span>•</span>*/}
      {/*                          <span className="truncate">{property.location.split(',')[0]}</span>*/}
      {/*                        </div>*/}
      {/*                      </motion.div>*/}
      {/*                    )}*/}
      {/*                  </AnimatePresence>*/}
      {/*                </div>*/}
      {/*              );*/}
      {/*            })}*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </motion.div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</AnimatePresence>*/}
    </div>
  );
};
