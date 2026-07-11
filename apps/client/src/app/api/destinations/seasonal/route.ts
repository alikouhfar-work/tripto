import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import { RawDestinationSeasonalResult } from '@/features/destination/destination-seasonal/types/destinationSeasonalAPI';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const season = searchParams.get('season');

    if (!season)
      return NextResponse.json({ error: DESTINATION_ERRORS.SEASON_REQUIRED }, { status: 400 });

    const result = await prisma.$queryRaw`
    WITH all_prices AS (
      SELECT
        a.id as accommodation_id,
        h.price,
        c.symbol as currency_symbol,
        addr.country,
        addr.city,
        dest.slogan as destination_slogan
      FROM "Accommodation" a
             JOIN "House" h ON h."accommodationId" = a.id
             JOIN "Currency" c ON c.id = h."currencyId"
             JOIN "Address" addr ON addr.id = a."addressId"
             JOIN "Destination" dest ON dest.id = a."destinationId"
      WHERE ${season} = ANY(dest.seasons)

      UNION ALL

      SELECT
        a.id as accommodation_id,
        r.price,
        c.symbol as currency_symbol,
        addr.country,
        addr.city,
        dest.slogan as destination_slogan
      FROM "Accommodation" a
             JOIN "Hotel" ht ON ht."accommodationId" = a.id
             JOIN "Room" r ON r."hotelId" = ht.id
             JOIN "Currency" c ON c.id = r."currencyId"
             JOIN "Address" addr ON addr.id = a."addressId"
             JOIN "Destination" dest ON dest.id = a."destinationId"
      WHERE ${season} = ANY(dest.seasons)
    ),
         cheapest_per_city AS (
           SELECT
             *,
             ROW_NUMBER() OVER (PARTITION BY city ORDER BY price) as rank
           FROM all_prices
         )
    SELECT
      accommodation_id,
      country,
      city,
      price,
      currency_symbol,
      destination_slogan
    FROM cheapest_per_city
    WHERE rank = 1
    ORDER BY price
      LIMIT 4
  `;

    const transformedResult = (result as RawDestinationSeasonalResult[]).map((item) => ({
      accommodationId: item.accommodation_id,
      country: item.country,
      city: item.city,
      price: item.price,
      currencySymbol: item.currency_symbol,
      destinationSlogan: item.destination_slogan,
    }));

    return NextResponse.json(transformedResult);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json({ error: DESTINATION_ERRORS.GET_LIST_FAILED }, { status: 500 });
  }
}
