'use server';

import { prisma } from '@repo/database';
import type { AccommodationTag } from '@repo/database';
import { DESTINATION_ERRORS } from '@/features/destination/constants';
import type {
  GetDestinationWeekendResponse,
  RawDestinationWeekendResult,
} from '@/features/destination/destination-weekend/types/destinationWeekend';

export async function getDestinationWeekend(): GetDestinationWeekendResponse {
  try {
    const result = await prisma.$queryRaw`
      WITH all_prices AS (
        SELECT
          a.id AS accommodation_id,
          a.title AS accommodation_title,
          at.title AS tag_title,
          at.emoji AS tag_emoji,
          at."backgroundColor" AS tag_background_color,
          at."textColor" AS tag_text_color,
          at."borderColor" AS tag_border_color,
          h.price,
          c.symbol AS currency_symbol,
          a.country,
          a.city
        FROM "Accommodation" a
               JOIN "House" h ON h."accommodationId" = a.id
               JOIN "Currency" c ON c.id = h."currencyId"
               JOIN "AccommodationTag" at ON at.id = a."tagId"

      UNION ALL

      SELECT
        a.id AS accommodation_id,
        a.title AS accommodation_title,
        at.title AS tag_title,
        at.emoji AS tag_emoji,
        at."backgroundColor" AS tag_background_color,
        at."textColor" AS tag_text_color,
        at."borderColor" AS tag_border_color,
        r.price,
        c.symbol AS currency_symbol,
        a.country,
        a.city
      FROM "Accommodation" a
             JOIN "Hotel" ht ON ht."accommodationId" = a.id
             JOIN "Room" r ON r."hotelId" = ht.id
             JOIN "Currency" c ON c.id = r."currencyId"
             JOIN "AccommodationTag" at ON at.id = a."tagId"
        ),
        cheapest_per_city AS (
      SELECT
        *,
        ROW_NUMBER() OVER (PARTITION BY city ORDER BY price) AS rank
      FROM all_prices
        )
      SELECT
        accommodation_id,
        accommodation_title,
        tag_title,
        tag_emoji,
        tag_background_color,
        tag_text_color,
        tag_border_color,
        country,
        city,
        price,
        currency_symbol
      FROM cheapest_per_city
      WHERE rank = 1
      ORDER BY RANDOM()
        LIMIT 16;
    `;

    return (result as RawDestinationWeekendResult[]).map((item) => ({
      accommodationId: item.accommodation_id as unknown as string,
      accommodationTitle: item.accommodation_title as unknown as string,
      accommodationTag: {
        title: item.tag_title,
        emoji: item.tag_emoji,
        backgroundColor: item.tag_background_color,
        textColor: item.tag_text_color,
        borderColor: item.tag_border_color,
      } as unknown as AccommodationTag,
      country: item.country,
      city: item.city,
      price: item.price,
      currencySymbol: item.currency_symbol,
    }));
  } catch {
    throw new Error(DESTINATION_ERRORS.GET_LIST_FAILED);
  }
}
