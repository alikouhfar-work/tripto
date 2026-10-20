'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Ban,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Heart,
  MapPin,
  Share2,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { PROPERTIES, Property } from '@/features/accommodation/components/Accommodations';
import { AccommodationCard } from '@/features/accommodation/components/AccommodationCard';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface PropertyDetailViewProps {
  savedPropertyIds?: string[];
  onToggleSaveProperty?: (id: string) => void;
  onNavigateToProperty?: (property: Property) => void;
  onConfirmBooking?: (
    totalPrice: number,
    pointsEarned: number,
    info: { checkIn: string; checkOut: string; guests: number; roomType?: string },
  ) => void;
}

export interface Activity {
  id: string;
  name: string;
  category: 'Explore' | 'Beach' | 'Museum' | 'Show' | 'Food' | 'Night Life';
  location: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
}

export const ACTIVITIES: Activity[] = [
  // Explore
  {
    id: 'act-1',
    name: 'Sagrada Familia Guided Tour',
    category: 'Explore',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1583779457094-0cdf43cd0f7f?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 2450,
    description:
      'Skip the line and explore Antoni Gaudí’s breathtaking cathedral with a certified historical expert.',
  },
  {
    id: 'act-2',
    name: 'Park Güell Mosaic Wander',
    category: 'Explore',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1523531294919-4bea7c65e894?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewsCount: 1980,
    description:
      'Walk through the colorful fairytale landscapes, ceramic salamanders, and panoramic city lookouts.',
  },
  {
    id: 'act-3',
    name: 'Casa Milà Rooftop Sunset',
    category: 'Explore',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1581613271109-f6ba6f6630f9?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewsCount: 1120,
    description:
      'Explore the whimsical "La Pedrera" limestone facade and enjoy live jazz music on the rooftop chimneys.',
  },
  // Beach
  {
    id: 'act-4',
    name: 'Barceloneta Paddleboarding',
    category: 'Beach',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    reviewsCount: 450,
    description:
      'Paddle along the Mediterranean coastline at sunrise, followed by beachside fruit bowls and espresso.',
  },
  {
    id: 'act-5',
    name: 'Sailing Yacht Cruise',
    category: 'Beach',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1505262868364-1240ebd96f1e?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 680,
    description:
      'A 2-hour luxury sailing trip with small bites, local white wine, and refreshing swimming stops.',
  },
  // Museum
  {
    id: 'act-6',
    name: 'Picasso Museum Curator Walk',
    category: 'Museum',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1601887389937-0b02c26b6c3c?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewsCount: 1530,
    description:
      'Analyze Picasso’s formative years in Barcelona through 4,251 permanent collection masterpieces.',
  },
  {
    id: 'act-7',
    name: 'MACBA Contemporary Pass',
    category: 'Museum',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1554907984-15263bfd63bd?auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    reviewsCount: 390,
    description:
      'Explore boundary-pushing post-war contemporary art in a striking Richard Meier-designed pavilion.',
  },
  // Show
  {
    id: 'act-8',
    name: 'Flamenco Tablao at Carmen',
    category: 'Show',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 890,
    description:
      'Witness high-energy raw flamenco dance and acoustic guitar in a traditional Andalusian square replica.',
  },
  {
    id: 'act-9',
    name: 'Magic Fountain Lights Show',
    category: 'Show',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewsCount: 3100,
    description:
      'Watch the iconic synchronized fountain display combining water choreography, neon lights, and cinematic music.',
  },
  // Food
  {
    id: 'act-10',
    name: 'La Boqueria Tapas Tour',
    category: 'Food',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewsCount: 1720,
    description:
      'Savor Jamón Ibérico, fresh oysters, patatas bravas, and local cava in the heart of Las Ramblas.',
  },
  {
    id: 'act-11',
    name: 'Traditional Paella Masterclass',
    category: 'Food',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewsCount: 940,
    description:
      'Learn to cook a real wood-fired seafood paella from a local chef on an atmospheric rooftop terrace.',
  },
  // Night Life
  {
    id: 'act-12',
    name: 'VIP Beachfront Club Entry',
    category: 'Night Life',
    location: 'Barcelona',
    image:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewsCount: 610,
    description:
      'Skip long queues and dance to international DJs right on the sand at the renowned Opium Barcelona.',
  },
];

// Custom sample reviews
const REVIEWS_MOCK = [
  {
    id: 1,
    name: 'July Kaly',
    date: '12 Mar 2025',
    rating: 5.0,
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 2,
    name: 'John Wick',
    date: '12 Mar 2025',
    rating: 5.0,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    comment:
      'The truth of the stay with Simo was very comfortable, he welcomed us warmly and checked in on our needs. The apartment was perfect, exceptionally clean, and fully loaded with luxury equipment.',
  },
  {
    id: 3,
    name: 'Jack Fure',
    date: '12 Mar 2025',
    rating: 5.0,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    comment:
      'Léonor is very responsive, and the accommodation perfectly matches our expectations. Highly recommended! We spent an amazing weekend exploring nearby Sagrada and enjoying tapas.',
  },
];

// Helper to get 5 realistic photos based on stay type
const getGalleryPhotos = (property: Property): string[] => {
  const baseImage = property.image;
  // Let's provide 4 additional high-quality, category-specific stock images
  if (property.type === 'Hotel') {
    return [
      baseImage,
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80', // luxurious bedroom
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', // hotel lobby / lounge
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80', // pool view
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80', // seaside/balcony view
    ];
  } else if (property.type === 'Cabins') {
    return [
      baseImage,
      'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80', // outdoor hot tub
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80', // warm bedroom
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80', // firepit scene
      'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80', // panoramic woods
    ];
  } else {
    // Houses / Doms / Glamping
    return [
      baseImage,
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80', // sleek living room
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80', // bathroom/kitchen
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80', // terrace lounge
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', // master bedroom
    ];
  }
};

export const AccommodationDetails = ({
  savedPropertyIds,
  onToggleSaveProperty,
  onNavigateToProperty,
  onConfirmBooking,
}: PropertyDetailViewProps) => {
  const params = useParams();
  const property = PROPERTIES.find((property) => property.id === params.id);
  if (!property) return;
  const isSaved = savedPropertyIds?.includes(property.id);
  const gallery = useMemo(() => getGalleryPhotos(property), [property]);

  // Gallery slideshow modal state
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  // Scroll Tab references
  const [activeTab, setActiveTab] = useState<
    'overview' | 'amenities' | 'location' | 'rooms' | 'calendar' | 'reviews'
  >('overview');

  // Interactive booking/reservation states
  const [checkInDate, setCheckInDate] = useState('2025-07-16');
  const [checkOutDate, setCheckOutDate] = useState('2025-07-24');
  const [guestsCount, setGuestsCount] = useState(2);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Description "Show More" expansion
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Copy share link notification state
  const [showShareNotification, setShowShareNotification] = useState(false);

  // Carousel ref
  const activitiesRef = useRef<HTMLDivElement>(null);
  const similarRef = useRef<HTMLDivElement>(null);

  // Hotel rooms filters (1 Bed, 2 Beds, 3 Beds)
  const [hotelRoomFilter, setHotelRoomFilter] = useState<'all' | '1' | '2' | '3'>('all');

  // Derived calculations
  const price = property.isDeal ? property.priceDiscount : property.priceOriginal;
  const nightsCount = useMemo(() => {
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diff = end.getTime() - start.getTime();
    if (isNaN(diff) || diff <= 0) return 3; // Fallback
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [checkInDate, checkOutDate]);

  const priceDetails = useMemo(() => {
    const baseTotal = price * nightsCount;
    const additionalPersonFee = 10;
    const extraGuests = guestsCount > 2 ? guestsCount - 2 : 0;
    const additionalTotal = extraGuests * additionalPersonFee * nightsCount;
    const totalWithGuests = baseTotal + additionalTotal;
    const points = Math.round(totalWithGuests * 10);
    return {
      basePrice: price,
      extraGuestsFee: additionalTotal,
      totalPrice: totalWithGuests,
      pointsEarned: points,
    };
  }, [price, nightsCount, guestsCount]);

  // Handle reserve click
  const handleReserve = (e?: React.FormEvent, roomTypeName?: string) => {
    if (e) e.preventDefault();
    setIsBookingSuccess(true);
    setTimeout(() => {
      onConfirmBooking?.(priceDetails.totalPrice, priceDetails.pointsEarned, {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guestsCount,
        roomType: roomTypeName || (property.type === 'Hotel' ? 'Deluxe King Room' : undefined),
      });
    }, 1200);
  };

  // Scroll spy helper
  useEffect(() => {
    const handleScroll = () => {
      const overviewEl = document.getElementById('details-overview');
      const amenitiesEl = document.getElementById('details-amenities');
      const locationEl = document.getElementById('details-location');
      const roomsEl = document.getElementById('details-rooms');
      const calendarEl = document.getElementById('details-calendar');
      const reviewsEl = document.getElementById('details-reviews');

      const scrollPos = window.scrollY + 180;

      if (reviewsEl && scrollPos >= reviewsEl.offsetTop) {
        setActiveTab('reviews');
      } else if (calendarEl && scrollPos >= calendarEl.offsetTop) {
        setActiveTab('calendar');
      } else if (roomsEl && scrollPos >= roomsEl.offsetTop) {
        setActiveTab('rooms');
      } else if (locationEl && scrollPos >= locationEl.offsetTop) {
        setActiveTab('location');
      } else if (amenitiesEl && scrollPos >= amenitiesEl.offsetTop) {
        setActiveTab('amenities');
      } else if (overviewEl && scrollPos >= overviewEl.offsetTop) {
        setActiveTab('overview');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [property.type]);

  const scrollToSection = (id: string, tab: any) => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 140;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  // Copy share trigger
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => setShowShareNotification(false), 3000);
  };

  // Sample rooms list data for Hotel types matching screenshot 2
  const roomsData = useMemo(() => {
    if (property.type !== 'Hotel') return [];
    return [
      {
        id: 'room-1',
        name: 'Superior Twin Room',
        roomsLeft: 2,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '2 Single bed',
        capacityLabel: '2 Persons',
        amenities: ['Breakfast', 'Free Wifi', 'Sea View', '30 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: Math.round(price * 0.75), // 25% cheaper
        discountTag: '10% off',
        originalPrice: Math.round(price * 0.83),
        available: true,
        image:
          'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'room-2',
        name: 'Suite',
        roomsLeft: 5,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '2 Double bed',
        capacityLabel: '4 Persons',
        amenities: ['Breakfast', 'Free Wifi', 'City View', '30 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: Math.round(price * 1.2), // premium
        originalPrice: Math.round(price * 1.2),
        available: true,
        image:
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'room-3',
        name: 'Spacious Room',
        roomsLeft: 1,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '1 King bed',
        capacityLabel: '2 Persons',
        amenities: ['Breakfast', 'Free Wifi', 'Sea View', '40 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: price,
        originalPrice: Math.round(price * 1.1),
        discountTag: '10% off',
        available: true,
        image:
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'room-4',
        name: 'Deluxe Double Room',
        roomsLeft: 0,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '2 Double bed',
        capacityLabel: '2 Persons',
        amenities: ['Breakfast', 'Free Wifi', 'Sea View', '30 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: Math.round(price * 0.95),
        available: false,
        image:
          'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'room-5',
        name: 'Family Room',
        roomsLeft: 0,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '1 Double bed, 2 Single bed',
        capacityLabel: '3 Persons',
        amenities: ['Breakfast', 'Free Wifi', 'City View', '30 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: Math.round(price * 1.15),
        available: false,
        image:
          'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'room-6',
        name: 'Classic Room',
        roomsLeft: 0,
        rating: 5.0,
        reviewsCount: 1260,
        bedsLabel: '1 Single bed',
        capacityLabel: '1 Person',
        amenities: ['Breakfast', 'Free Wifi', 'City View', '15 m²'],
        extraAmenities: ['No Smoking', 'Air Conditioner'],
        price: Math.round(price * 0.5),
        available: false,
        image:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80',
      },
    ];
  }, [price, property]);

  // Filtered rooms based on bed count
  const filteredRooms = useMemo(() => {
    if (hotelRoomFilter === 'all') return roomsData;
    return roomsData.filter((room) => {
      if (hotelRoomFilter === '1') {
        return (
          room.bedsLabel.toLowerCase().includes('1 ') ||
          room.bedsLabel.toLowerCase().includes('single')
        );
      } else if (hotelRoomFilter === '2') {
        return (
          room.bedsLabel.toLowerCase().includes('2 ') ||
          room.bedsLabel.toLowerCase().includes('double')
        );
      } else if (hotelRoomFilter === '3') {
        return (
          room.bedsLabel.toLowerCase().includes('3 ') ||
          room.bedsLabel.toLowerCase().includes('triple') ||
          room.bedsLabel.toLowerCase().includes('single bed,')
        );
      }
      return true;
    });
  }, [roomsData, hotelRoomFilter]);

  // Activities filtered to property location or Barcelona
  const nearbyActivities = useMemo(() => {
    return ACTIVITIES.slice(0, 8);
  }, []);

  // Similar properties list (shares property type or region)
  const similarProperties = useMemo(() => {
    return PROPERTIES.filter((p) => p.id !== property.id && p.type === property.type).slice(0, 4);
  }, [property]);

  return (
    <div className="relative min-h-screen bg-white pb-20 text-slate-800">
      {/* Dynamic Success Notification for Booking */}
      <AnimatePresence>
        {isBookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -80, scale: 0.95 }}
            animate={{ opacity: 1, y: 16, scale: 1 }}
            exit={{ opacity: 0, y: -80, scale: 0.95 }}
            className="fixed top-20 left-1/2 z-50 flex max-w-sm -translate-x-1/2 flex-col items-center space-y-2 rounded-2xl border border-white/10 bg-slate-900 px-8 py-4 font-semibold text-white shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
              <Check className="h-6 w-6 stroke-[3px]" />
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold">Reservation Initiated!</span>
              <span className="text-xs text-slate-300">Sophia’s points balance is updating...</span>
            </div>
          </motion.div>
        )}

        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-10 bottom-10 z-50 flex items-center space-x-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-medium text-white shadow-xl"
          >
            <Check className="h-4 w-4 text-emerald-400" />
            <span>Property link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl space-y-6 px-4 pt-6 sm:px-6 lg:px-8">
        {/* Navigation back and header details */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-1.5">
            <Link
              href='/accommodations'
              className="group mb-1 flex cursor-pointer items-center space-x-1 text-xs font-bold text-slate-500 transition-colors hover:text-slate-900 focus:outline-none"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to search results</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display sm:text-3.5xl text-2xl leading-tight font-extrabold tracking-tight text-slate-900">
                {property.name}
              </h1>
              {property.stars && (
                <div className="flex items-center space-x-0.5">
                  {Array.from({ length: property.stars }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-slate-500">
              <MapPin className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                {property.location}, {property.country}
              </span>
            </div>
          </div>

          {/* Share / Save buttons */}
          <div className="flex items-center space-x-2 self-stretch sm:self-auto">
            <button
              onClick={handleShare}
              className="flex flex-1 cursor-pointer items-center justify-center space-x-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition-all hover:bg-slate-50 focus:outline-none sm:flex-initial"
            >
              <Share2 className="h-4 w-4 text-slate-500" />
              <span>Share</span>
            </button>

            <button
              onClick={() => onToggleSaveProperty?.(property.id)}
              className={`flex flex-1 cursor-pointer items-center justify-center space-x-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-all focus:outline-none sm:flex-initial ${
                isSaved
                  ? 'border-rose-100 bg-rose-50/55 text-rose-600 hover:bg-rose-100'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Heart
                className={`h-4 w-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`}
              />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Sticky detail tabs section */}
        <div className="sticky top-[72px] z-30 -mx-4 flex scrollbar-none items-center space-x-1 overflow-x-auto border-b border-slate-100 bg-white/95 px-4 py-2.5 shadow-xs backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {[
            { id: 'overview', label: 'Overview', show: true },
            { id: 'amenities', label: 'Amenities', show: true },
            { id: 'location', label: 'Location', show: true },
            { id: 'rooms', label: 'Rooms', show: property.type === 'Hotel' },
            { id: 'calendar', label: 'Calendar', show: property.type !== 'Hotel' },
            { id: 'reviews', label: 'Reviews', show: true },
          ].map((tab) => {
            if (!tab.show) return null;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(`details-${tab.id}`, tab.id)}
                className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold whitespace-nowrap transition-all focus:outline-none ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 5-Photo Bento Grid */}
        <section className="group relative overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
          <div className="grid aspect-video grid-cols-1 gap-2.5 md:aspect-[21/9] md:grid-cols-4">
            {/* Left large photo */}
            <div
              onClick={() => setActivePhotoIdx(0)}
              className="relative h-full cursor-pointer overflow-hidden transition-all duration-300 group-hover:opacity-95 hover:!opacity-100 md:col-span-2"
            >
              <img
                src={gallery[0]}
                alt="Main View"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
              />
            </div>

            {/* Right grid containing remaining 4 photos */}
            <div className="hidden h-full grid-cols-2 gap-2.5 md:col-span-2 md:grid">
              {gallery.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActivePhotoIdx(i + 1)}
                  className="relative cursor-pointer overflow-hidden transition-all duration-300 group-hover:opacity-95 hover:!opacity-100"
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-102"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Float overlay button for showing all photos */}
          <button
            onClick={() => setActivePhotoIdx(0)}
            className="absolute right-5 bottom-5 z-10 flex cursor-pointer items-center space-x-1.5 rounded-xl border border-slate-100 bg-white/95 px-4.5 py-2.5 text-xs font-extrabold text-slate-800 shadow-md backdrop-blur-sm transition-all hover:bg-white focus:outline-none active:scale-95"
          >
            <Compass className="h-4 w-4 text-blue-600" />
            <span>10+ Photos</span>
          </button>
        </section>

        {/* Main Columns Grid Layout */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* LEFT SIDE: Description, Amenities, Location, Room selection/Calendar, Reviews, Policies */}
          <div className="space-y-10 lg:col-span-8">
            {/* Overview / Host Card */}
            <div
              id="details-overview"
              className="scroll-mt-28 space-y-6 border-b border-slate-100 pb-8"
            >
              {property.type === 'Hotel' ? (
                <div className="flex items-center space-x-4 rounded-2xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-slate-800">
                      {property.subtype || 'Luxury Boutique Hotel'}
                    </h3>
                    <p className="mt-0.5 text-xs leading-relaxed font-medium text-slate-500">
                      Hotel size: 200 rooms · Arranged over 6 floors · Professional 24/7 Concierge
                      Support.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                    alt="Host Selena"
                    referrerPolicy="no-referrer"
                    className="h-12 w-12 shrink-0 rounded-full border border-white object-cover shadow-sm"
                  />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="block text-xs font-bold tracking-wide text-slate-400 uppercase">
                        Stay Host
                      </span>
                      <span className="rounded-sm bg-blue-100 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider text-blue-800 uppercase">
                        Superhost
                      </span>
                    </div>
                    <h3 className="font-display text-sm font-extrabold text-slate-800">
                      Selena Doberman
                    </h3>
                  </div>
                </div>
              )}

              {/* Description and Key figures */}
              <div className="space-y-4">
                <div className="flex items-center space-x-6 text-xs font-medium text-slate-500 sm:text-sm">
                  <span>{property.type === 'Hotel' ? '200 Rooms' : '2 Guests'}</span>
                  <span>•</span>
                  <span>
                    {property.bedrooms || 1} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
                  </span>
                  <span>•</span>
                  <span>
                    {property.beds || 1} {property.beds === 1 ? 'Bed' : 'Beds'}
                  </span>
                  <span>•</span>
                  <span>
                    {property.bathrooms || 1} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                  </span>
                </div>

                <div className="space-y-2.5 text-sm leading-relaxed text-slate-500">
                  <p>
                    {showFullDesc
                      ? property.description
                      : `${property.description.slice(0, 160)}...`}
                  </p>
                  <button
                    onClick={() => setShowFullDesc(!showFullDesc)}
                    className="flex cursor-pointer items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <span>{showFullDesc ? 'Show Less' : 'Show More'}</span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${showFullDesc ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Amenities Section */}
            <div
              id="details-amenities"
              className="scroll-mt-28 space-y-4 border-b border-slate-100 pb-8"
            >
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Stay Amenities
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((am) => (
                  <div
                    key={am}
                    className="flex items-center space-x-3 rounded-xl border border-slate-100/60 bg-slate-50/50 p-3 text-xs font-medium text-slate-600 sm:text-sm"
                  >
                    <Check className="h-4 w-4 stroke-[3px] text-blue-600" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
              <button className="mt-2 cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 focus:outline-none">
                Show All {property.amenities.length} Amenities
              </button>
            </div>

            {/* Location Map Section */}
            <div
              id="details-location"
              className="scroll-mt-28 space-y-4 border-b border-slate-100 pb-8"
            >
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Location
              </h2>
              <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-100 shadow-xs sm:h-80">
                {/* SVG Mock Map */}
                <div className="absolute inset-0 flex flex-col justify-end bg-sky-50 p-4">
                  <svg
                    className="absolute inset-0 h-full w-full text-slate-300 opacity-80"
                    viewBox="0 0 400 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Coastal line */}
                    <path
                      d="M-20,90 C120,60 220,130 420,80 C420,80 420,220 -20,220 Z"
                      fill="#fef08a"
                      opacity="0.5"
                    />
                    <path
                      d="M-20,110 C130,80 230,150 420,100"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    {/* Road networks */}
                    <line x1="50" y1="0" x2="50" y2="200" stroke="white" strokeWidth="4" />
                    <line x1="120" y1="0" x2="120" y2="200" stroke="white" strokeWidth="5" />
                    <line x1="250" y1="0" x2="250" y2="200" stroke="white" strokeWidth="4" />
                    <line x1="320" y1="0" x2="320" y2="200" stroke="white" strokeWidth="5" />
                    <line x1="0" y1="70" x2="400" y2="70" stroke="white" strokeWidth="6" />
                    <line x1="0" y1="130" x2="400" y2="130" stroke="white" strokeWidth="4" />
                    <line x1="0" y1="170" x2="400" y2="170" stroke="white" strokeWidth="5" />
                    {/* Map labels */}
                    <text x="60" y="30" fill="#94a3b8" fontSize="8" fontWeight="bold">
                      PASSEIG DE GRÀCIA
                    </text>
                    <text x="260" y="150" fill="#94a3b8" fontSize="8" fontWeight="bold">
                      BARCELONETA BEACH
                    </text>
                    {/* Destination marker pin */}
                    <circle
                      cx="210"
                      cy="110"
                      r="10"
                      fill="#3b82f6"
                      className="animate-ping"
                      opacity="0.4"
                    />
                    <circle cx="210" cy="110" r="6" fill="#2563eb" />
                  </svg>

                  {/* Map overlay controls */}
                  <div className="relative z-10 flex items-center justify-between rounded-xl border border-slate-100 bg-white/95 p-3.5 shadow-md backdrop-blur-sm">
                    <div>
                      <span className="block font-mono text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                        Stay Address
                      </span>
                      <span className="block text-xs font-bold text-slate-800">
                        {property.location}, {property.country}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 focus:outline-none">
                        +
                      </button>
                      <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600 transition-all hover:bg-slate-200 focus:outline-none">
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HOTEL ROOMS SELECTOR (Only if Hotel) */}
            {property.type === 'Hotel' && (
              <div
                id="details-rooms"
                className="scroll-mt-28 space-y-6 border-b border-slate-100 pb-8"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                      Available Rooms
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-400">
                      Filter room size and sleeping choices
                    </p>
                  </div>

                  <div className="flex items-center space-x-1 rounded-xl border border-slate-200/50 bg-slate-50 p-1">
                    {(['all', '1', '2', '3'] as const).map((beds) => (
                      <button
                        key={beds}
                        onClick={() => setHotelRoomFilter(beds)}
                        className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-bold transition-all focus:outline-none ${
                          hotelRoomFilter === beds
                            ? 'border border-slate-100 bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {beds === 'all'
                          ? 'All Rooms'
                          : beds === '1'
                            ? '1 Bed'
                            : beds === '2'
                              ? '2 Beds'
                              : '3+ Beds'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rooms List */}
                <div className="space-y-4">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className={`grid grid-cols-1 overflow-hidden rounded-2xl border transition-all duration-300 md:grid-cols-12 ${
                        room.available
                          ? 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-md'
                          : 'border-slate-200 bg-slate-50 opacity-70'
                      }`}
                    >
                      {/* Room Photo */}
                      <div className="relative h-40 shrink-0 bg-slate-100 md:col-span-3 md:h-full">
                        <img
                          src={room.image}
                          alt={room.name}
                          referrerPolicy="no-referrer"
                          className="h-full w-full object-cover"
                        />
                        {room.roomsLeft > 0 && room.roomsLeft <= 2 && room.available && (
                          <span className="absolute top-2 left-2 z-10 rounded-md border border-rose-100 bg-rose-50 px-2 py-0.5 text-[10px] font-extrabold tracking-wide text-rose-700 uppercase">
                            {room.roomsLeft} rooms left
                          </span>
                        )}
                      </div>

                      {/* Room Details Column */}
                      <div className="flex flex-col justify-between space-y-4 p-4 md:col-span-6">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center justify-between gap-2 md:justify-start">
                            <h3 className="font-display text-sm leading-snug font-extrabold text-slate-800 sm:text-base">
                              {room.name}
                            </h3>
                            {room.available && (
                              <div className="flex items-center space-x-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600">
                                <Star className="h-3.5 w-3.5 fill-blue-600" />
                                <span>5.0</span>
                              </div>
                            )}
                          </div>
                          <p className="flex items-center space-x-2 text-xs font-medium text-slate-400">
                            <span>{room.bedsLabel}</span>
                            <span>•</span>
                            <span>{room.capacityLabel}</span>
                          </p>

                          {/* Amenities Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {room.amenities.map((am) => (
                              <span
                                key={am}
                                className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600"
                              >
                                {am}
                              </span>
                            ))}
                            {room.extraAmenities.map((am) => (
                              <span
                                key={am}
                                className="rounded-md border border-slate-100/60 bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-400"
                              >
                                {am}
                              </span>
                            ))}
                          </div>
                        </div>

                        {room.available ? (
                          <button
                            onClick={() => setSelectedRoomId(room.id)}
                            className="cursor-pointer self-start text-xs font-bold text-blue-600 hover:text-blue-800 focus:outline-none"
                          >
                            More details & amenities →
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 self-start text-xs font-medium text-slate-400">
                            <Ban className="h-3.5 w-3.5" />
                            <span>Currently Sold Out</span>
                          </span>
                        )}
                      </div>

                      {/* Pricing and reservation trigger column */}
                      <div className="flex shrink-0 flex-col justify-between space-y-4 border-t border-slate-100 bg-slate-50/50 p-4 text-right md:col-span-3 md:border-t-0 md:border-l">
                        <div className="space-y-1">
                          <span className="block text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                            Base Price
                          </span>
                          {room.discountTag && (
                            <span className="mr-1 rounded-sm bg-red-50 px-1.5 py-0.5 text-[9px] font-extrabold tracking-wide text-red-600 uppercase">
                              {room.discountTag}
                            </span>
                          )}
                          <div className="flex items-baseline justify-end space-x-1.5">
                            {room.originalPrice && room.originalPrice > room.price && (
                              <span className="font-mono text-xs text-slate-300 line-through">
                                ${room.originalPrice}
                              </span>
                            )}
                            <span className="font-mono text-lg font-black text-slate-900 sm:text-xl">
                              ${room.price}
                            </span>
                            <span className="font-sans text-[10px] font-normal text-slate-400">
                              / night
                            </span>
                          </div>
                        </div>

                        {room.available ? (
                          <button
                            onClick={() => handleReserve(undefined, room.name)}
                            className="w-full cursor-pointer rounded-xl bg-blue-600 py-2.5 text-xs font-extrabold tracking-wide text-white uppercase shadow-xs transition-all hover:bg-blue-700 focus:outline-none active:scale-95"
                          >
                            Reserve
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full cursor-not-allowed rounded-xl bg-slate-200 py-2.5 text-xs font-extrabold tracking-wide text-slate-400 uppercase focus:outline-none"
                          >
                            Sold Out
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Calendar Section (Only for Apartments) */}
            {property.type !== 'Hotel' && (
              <div
                id="details-calendar"
                className="scroll-mt-28 space-y-6 border-b border-slate-100 pb-8"
              >
                <div>
                  <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                    Stay Calendar
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-400">
                    Pick dates directly on the scheduler matrix
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 rounded-3xl border border-slate-100 bg-slate-50 p-5 md:grid-cols-2">
                  {/* July 2025 Calendar */}
                  <div className="space-y-4">
                    <h3 className="font-display text-center text-sm font-bold text-slate-800">
                      July 2025
                    </h3>
                    <div className="mb-1.5 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="font-mono text-[10px] tracking-wider uppercase">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {/* Empty days */}
                      {Array.from({ length: 1 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {/* Days list */}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isCheckIn = day === 16;
                        const isCheckOut = day === 24;
                        const isSelectedRange = day > 16 && day < 24;

                        let dayClass =
                          'text-slate-700 hover:bg-slate-200/60 rounded-lg cursor-pointer';
                        if (isCheckIn || isCheckOut) {
                          dayClass = 'bg-blue-600 text-white rounded-lg font-black shadow-sm';
                        } else if (isSelectedRange) {
                          dayClass = 'bg-blue-100 text-blue-800 rounded-lg font-bold';
                        }

                        return (
                          <div
                            key={day}
                            className={`flex flex-col items-center justify-center py-1.5 font-mono text-xs transition-all ${dayClass}`}
                          >
                            <span>{day}</span>
                            <span className="-mt-0.5 block font-sans text-[8px] font-light text-slate-400">
                              ${price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* August 2025 Calendar */}
                  <div className="space-y-4">
                    <h3 className="font-display text-center text-sm font-bold text-slate-800">
                      August 2025
                    </h3>
                    <div className="mb-1.5 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="font-mono text-[10px] tracking-wider uppercase">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {/* Empty days */}
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {/* Days list */}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        return (
                          <div
                            key={day}
                            className="flex cursor-pointer flex-col items-center justify-center rounded-lg py-1.5 font-mono text-xs text-slate-700 hover:bg-slate-200/60"
                          >
                            <span>{day}</span>
                            <span className="-mt-0.5 block font-sans text-[8px] font-light text-slate-400">
                              ${price}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <div
              id="details-reviews"
              className="scroll-mt-28 space-y-6 border-b border-slate-100 pb-8"
            >
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                  {property.rating.toFixed(1)} Excellent
                </h2>
                <span className="text-sm font-medium text-slate-400">
                  ({property.reviewsCount} reviews)
                </span>
              </div>

              {/* Grid rating categories progress bars */}
              <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 sm:grid-cols-2">
                {[
                  { label: 'Amenities', score: '5.0' },
                  { label: 'Cleanliness', score: '5.0' },
                  { label: 'Communication', score: '5.0' },
                  { label: 'Location', score: '5.0' },
                  { label: 'Value', score: '5.0' },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{item.label}</span>
                      <span className="font-mono">{item.score}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-blue-600" style={{ width: '100%' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {REVIEWS_MOCK.map((rev) => (
                  <div
                    key={rev.id}
                    className="space-y-3 rounded-2xl border border-slate-100 p-5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={rev.avatar}
                          alt={rev.name}
                          referrerPolicy="no-referrer"
                          className="h-10 w-10 rounded-full border border-slate-100 object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 sm:text-sm">
                            {rev.name}
                          </h4>
                          <span className="text-[10px] font-medium text-slate-400">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 rounded-md bg-amber-50 px-2 py-0.5 font-mono text-xs font-bold text-amber-800">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span>{rev.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed font-light text-slate-500 sm:text-sm">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies Section */}
            <div className="space-y-4 pb-4">
              <h2 className="font-display text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                Policies
              </h2>
              <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 shadow-2xs">
                {[
                  {
                    label: 'Check-in',
                    value: 'From 15:00 to 18:00 (Please notify host in advance of timing)',
                  },
                  { label: 'Check-out', value: 'From 8:00 to 11:00' },
                  {
                    label: 'Cancellation/prepayment',
                    value: 'Flexible 24h cancellations. Full refund provided prior to stay.',
                  },
                  {
                    label: 'Children and beds',
                    value: 'Families welcome! Cots and cribs are available upon prior request.',
                  },
                  { label: 'No age restriction', value: 'Guests of all ages are welcome.' },
                  {
                    label: 'Quiet hours',
                    value: 'Noise strict limits apply between 22:00 and 10:00.',
                  },
                  { label: 'Smoking', value: 'Smoking is strictly not allowed inside rooms.' },
                  { label: 'Pets', value: 'Pets are not allowed in this specific property.' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 gap-3 p-4 text-xs sm:grid-cols-12 sm:text-sm"
                  >
                    <div className="flex items-center space-x-1.5 font-bold text-slate-800 sm:col-span-4">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    <div className="leading-relaxed font-light text-slate-500 sm:col-span-8">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Floating Booking Widget (Only Apartment, or quick summary info for Hotel) */}
          <div className="space-y-6 lg:sticky lg:top-28 lg:col-span-4">
            <form
              onSubmit={handleReserve}
              className="space-y-5 rounded-3xl border border-slate-100 bg-white p-5 shadow-lg sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-medium tracking-wide text-slate-400 uppercase">
                    Nightly Rate
                  </span>
                  <div className="flex items-baseline space-x-1.5">
                    {property.isDeal && (
                      <span className="font-mono text-xs text-slate-300 line-through">
                        ${property.priceOriginal}
                      </span>
                    )}
                    <span className="font-mono text-xl font-black text-slate-900 sm:text-2xl">
                      ${price}
                    </span>
                    <span className="font-sans text-[10px] font-normal text-slate-400">
                      / night
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 text-xs font-bold text-slate-500">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-slate-800">{property.rating.toFixed(1)}</span>
                  <span className="font-normal text-slate-400">({property.reviewsCount})</span>
                </div>
              </div>

              {/* Date selection boxes */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="rounded-xl border border-slate-200/50 bg-slate-50 p-2.5 text-left">
                  <label className="mb-1 block flex items-center space-x-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span>Check-In</span>
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
                  />
                </div>

                <div className="rounded-xl border border-slate-200/50 bg-slate-50 p-2.5 text-left">
                  <label className="mb-1 block flex items-center space-x-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                    <Calendar className="h-3 w-3 text-blue-600" />
                    <span>Check-Out</span>
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full cursor-pointer bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Guests Selector */}
              <div className="rounded-xl border border-slate-200/50 bg-slate-50 p-2.5 text-left">
                <label className="mb-1 block flex items-center space-x-1 text-[9px] font-bold tracking-wider text-slate-400 uppercase">
                  <Users className="h-3 w-3 text-blue-600" />
                  <span>Guests</span>
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full cursor-pointer bg-transparent text-xs font-bold text-slate-700 focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing breakdown list */}
              <div className="divide-y divide-slate-100 pt-2 text-xs sm:text-sm">
                <div className="flex justify-between py-2.5 text-slate-500">
                  <span>
                    ${price} x {nightsCount} nights
                  </span>
                  <span className="font-mono font-semibold text-slate-800">
                    ${price * nightsCount}
                  </span>
                </div>
                {priceDetails.extraGuestsFee > 0 && (
                  <div className="flex justify-between py-2.5 text-slate-500">
                    <span>Extra person fee</span>
                    <span className="font-mono font-semibold text-slate-800">
                      ${priceDetails.extraGuestsFee}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 text-sm font-bold text-slate-800 sm:text-base">
                  <span>Total Price</span>
                  <span className="font-mono font-black text-blue-600">
                    ${priceDetails.totalPrice}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-blue-600 py-3.5 text-xs font-extrabold tracking-wider text-white uppercase shadow-md transition-all hover:bg-blue-700 focus:outline-none active:scale-98 sm:text-sm"
              >
                Reserve Stay
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] font-medium text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <span>Sophia earns +{priceDetails.pointsEarned} VIP points on booking</span>
              </div>
            </form>

            {/* Quick trust indicator widget */}
            <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-5">
              <h4 className="font-mono text-xs font-extrabold tracking-widest text-slate-800 uppercase">
                Booking Protection
              </h4>
              <div className="space-y-3.5">
                {[
                  {
                    title: 'Safe payments via Stripe',
                    desc: 'Secure encryption standards protecting checkouts.',
                  },
                  {
                    title: 'Verified luxury inclusions',
                    desc: 'Guaranteed matching amenities upon checking in.',
                  },
                  {
                    title: 'Tripto 24h refund guarantee',
                    desc: 'Change mind within 24 hours of booking for direct full cash refunds.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                      <Check className="h-3.5 w-3.5 stroke-[2.5px]" />
                    </div>
                    <div>
                      <h5 className="text-xs leading-snug font-bold text-slate-800">
                        {item.title}
                      </h5>
                      <p className="mt-0.5 text-[10px] leading-relaxed font-light text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: 12 MOST POPULAR THINGS TO DO NEARBY */}
        <section className="space-y-6 border-t border-slate-100 pt-10">
          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <span className="inline-flex items-center space-x-1.5 rounded-md bg-blue-50 px-3 py-1 font-mono text-[10px] font-extrabold tracking-wider text-blue-700 uppercase">
                <Compass className="h-3.5 w-3.5 animate-spin text-blue-600" />
                <span>Local Guides</span>
              </span>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                12 Most Popular Things to Do Nearby
              </h2>
              <p className="text-xs text-slate-400">
                Unforgettable activities, skips, and experiences in the local Barcelona region.
              </p>
            </div>

            {/* Scroll navigation arrows */}
            <div className="flex shrink-0 items-center space-x-1.5">
              <button
                onClick={() => {
                  if (activitiesRef.current)
                    activitiesRef.current.scrollBy({ left: -320, behavior: 'smooth' });
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 focus:outline-none active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  if (activitiesRef.current)
                    activitiesRef.current.scrollBy({ left: 320, behavior: 'smooth' });
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 focus:outline-none active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Activities Horizontal Slider */}
          <div
            ref={activitiesRef}
            className="flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {nearbyActivities.map((act) => (
              <div
                key={act.id}
                className="group w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 transition-all duration-300 hover:shadow-md sm:w-[280px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <img
                    src={act.image}
                    alt={act.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <span className="absolute top-3 left-3 z-10 rounded-md border border-slate-100 bg-white/95 px-2.5 py-1 text-[9px] font-extrabold tracking-widest text-slate-800 uppercase shadow-sm backdrop-blur-xs">
                    {act.category}
                  </span>
                  <span className="absolute right-3 bottom-3 z-10 rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                    600 m away
                  </span>
                </div>
                <div className="space-y-2 p-4">
                  <h4 className="font-display line-clamp-1 text-sm font-extrabold text-slate-800 transition-colors group-hover:text-blue-600">
                    {act.name}
                  </h4>
                  <p className="line-clamp-2 text-[11px] leading-relaxed font-light text-slate-400">
                    {act.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2.5">
                    <span className="text-[10px] font-medium text-slate-400">Per Person</span>
                    <span className="font-mono text-sm font-black text-slate-800">$45</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: SIMILAR APARTMENTS IN BARCELONA */}
        <section className="space-y-6 border-t border-slate-100 pt-10">
          <div className="flex items-end justify-between">
            <div className="space-y-1.5">
              <span className="inline-flex items-center space-x-1.5 rounded-md bg-amber-50 px-3 py-1 font-mono text-[10px] font-extrabold tracking-wider text-amber-800 uppercase">
                <Star className="h-3.5 w-3.5 animate-pulse fill-amber-500 text-amber-600" />
                <span>Curated Matches</span>
              </span>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Similar {property.type === 'Hotel' ? 'Hotels' : 'Apartments'} in Barcelona
              </h2>
              <p className="text-xs text-slate-400">
                Alternative stays meeting the exact aesthetic parameters and rating metrics.
              </p>
            </div>

            {/* Scroll navigation arrows */}
            <div className="flex shrink-0 items-center space-x-1.5">
              <button
                onClick={() => {
                  if (similarRef.current)
                    similarRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 focus:outline-none active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  if (similarRef.current)
                    similarRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                }}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-xs transition-all hover:bg-slate-50 focus:outline-none active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stays list */}
          <div
            ref={similarRef}
            className="flex snap-x snap-mandatory scrollbar-none gap-6 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {similarProperties.map((p) => (
              <div key={p.id} className="w-[280px] shrink-0 snap-start sm:w-[310px]">
                <AccommodationCard
                  property={p}
                  isSaved={savedPropertyIds?.includes(p.id)}
                  onToggleSave={() => onToggleSaveProperty(p.id)}
                  onSelect={() => onNavigateToProperty(p)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FULL PHOTO SLIDESHOW GALLERY MODAL */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <div className="fixed inset-0 z-55 flex items-center justify-center bg-slate-950/95 p-4">
            {/* Close trigger */}
            <button
              onClick={() => setActivePhotoIdx(null)}
              className="absolute top-6 right-6 z-20 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition-all hover:bg-white/20 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={() =>
                setActivePhotoIdx((prev) =>
                  prev !== null ? (prev === 0 ? gallery.length - 1 : prev - 1) : 0,
                )
              }
              className="absolute left-6 z-20 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Slide show Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[80vh] max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
            >
              <img
                src={gallery[activePhotoIdx]}
                alt={`Slideshow ${activePhotoIdx}`}
                referrerPolicy="no-referrer"
                className="h-full max-h-[80vh] w-full object-contain"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-slate-900/80 px-3 py-1.5 font-mono text-xs font-bold text-white">
                {activePhotoIdx + 1} / {gallery.length} Stays Photos
              </div>
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={() =>
                setActivePhotoIdx((prev) =>
                  prev !== null ? (prev === gallery.length - 1 ? 0 : prev + 1) : 0,
                )
              }
              className="absolute right-6 z-20 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED AMENITY / ROOM DETAIL SPECIFIC MODAL OVERLAY */}
      <AnimatePresence>
        {selectedRoomId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setSelectedRoomId(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 max-h-[90vh] w-full max-w-lg space-y-6 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                onClick={() => setSelectedRoomId(null)}
                className="absolute top-4 right-4 cursor-pointer rounded-full p-2 text-slate-400 transition-colors hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-4">
                <img
                  src={roomsData.find((r) => r.id === selectedRoomId)?.image}
                  alt="Room View"
                  referrerPolicy="no-referrer"
                  className="h-44 w-full rounded-2xl object-cover"
                />
                <div>
                  <span className="font-mono text-[10px] font-extrabold tracking-widest text-blue-600 uppercase">
                    Premium Suite Specification
                  </span>
                  <h3 className="font-display mt-1 text-lg leading-tight font-extrabold text-slate-800">
                    {roomsData.find((r) => r.id === selectedRoomId)?.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {roomsData.find((r) => r.id === selectedRoomId)?.bedsLabel} •{' '}
                    {roomsData.find((r) => r.id === selectedRoomId)?.capacityLabel}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold tracking-wider text-slate-800 uppercase">
                  Suite Package Inclusions
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-slate-600">
                  {[
                    'Champagne bottle on check-in',
                    'Private harbor balcony',
                    'Michelin-starred high tea',
                    'Complimentary VIP room service',
                    'High-speed 1Gbps Wifi link',
                    'Access to premium wellness wet-spa',
                  ].map((inc) => (
                    <div key={inc} className="flex items-center space-x-2">
                      <div className="flex h-4 w-4 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-600">
                        <Check className="h-2.5 w-2.5 stroke-[2.5px]" />
                      </div>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 text-xs sm:text-sm">
                <div>
                  <span className="block font-mono text-[10px] font-semibold text-slate-400 uppercase">
                    Package Total
                  </span>
                  <span className="font-mono text-base font-black text-slate-800">
                    ${roomsData.find((r) => r.id === selectedRoomId)?.price} / night
                  </span>
                </div>
                <button
                  onClick={() => {
                    const room = roomsData.find((r) => r.id === selectedRoomId);
                    setSelectedRoomId(null);
                    handleReserve(undefined, room?.name);
                  }}
                  className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-extrabold tracking-wide text-white uppercase shadow-xs transition-all hover:bg-blue-700 focus:outline-none active:scale-95"
                >
                  Reserve package
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
