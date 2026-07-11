import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { revalidatePath } from 'next/cache';
import { createHash } from 'crypto';
import { parseHouseFormData } from '@/features/accommodation/house/utils/parseHouseFormData';
import { auth } from '@/auth';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { deleteDocument, listKeysByPrefix, uploadDocument } from '@repo/documents';
import { extractHash } from '@/utils/extractHash';

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const data = await parseHouseFormData(formData);

    const existing = await prisma.accommodation.findUnique({
      where: { id },
      include: { address: true, house: true },
    });
    if (!existing) {
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });
    }

    const accommodation = await prisma.accommodation.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        policies: data.policies,
        amenities: data.amenities,
        updatedAt: new Date(),
        updatedBy: { connect: { id: session.user.id } },
        tag: { connect: { id: data.tagId } },

        address: {
          update: {
            city: data.city,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude,
            details: data.addressDetails,
            countryCode: data.countryCode,
            updatedById: session.user.id,
          },
        },

        house: {
          update: {
            price: data.price,
            discount: data.discount,
            capacity: data.capacity,
            area: data.area,
            floors: data.floors,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            currencyId: data.currencyId,
            availableDates: data.availableDates,
            updatedById: session.user.id,
          },
        },
      },
      include: { house: true, address: true },
    });

    if (data.heroImage) {
      const uploadResult = await uploadDocument({
        file: data.heroImage,
        bucket: 'accommodations',
        object: `${id}/hero.webp`,
      });
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_IMAGE_FAILED },
          { status: 500 },
        );
      }
    }

    if (data.galleryImages.length > 0) {
      const prefix = `${id}/gallery/`;

      const existingKeys = await listKeysByPrefix({ prefix, bucket: 'accommodations' });
      const existingHashes = new Set(existingKeys.map(extractHash));

      const incoming = await Promise.all(
        data.galleryImages.map(async (file: File) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          const hash = createHash('sha256').update(buffer).digest('hex');
          return { file, hash };
        }),
      );
      const incomingHashes = new Set(incoming.map((i) => i.hash));

      const toUpload = incoming.filter((i) => !existingHashes.has(i.hash));
      const toDelete = existingKeys.filter((key) => !incomingHashes.has(extractHash(key)));

      const uploadResults = await Promise.allSettled(
        toUpload.map(({ file, hash }) =>
          uploadDocument({
            file,
            bucket: 'accommodations',
            object: `${prefix}${hash}.webp`,
          }),
        ),
      );
      if (uploadResults.some((r) => r.status === 'rejected')) {
        return NextResponse.json(
          { error: ACCOMMODATION_ERRORS.UPDATE_SOME_GALLERY_FAILED },
          { status: 500 },
        );
      }

      await Promise.all(
        toDelete.map((key) =>
          deleteDocument({
            object: key,
            bucket: 'accommodations',
          }),
        ),
      );
    }

    revalidatePath('/api/accommodations');
    revalidatePath(`/api/accommodations/${id}`);
    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Update accommodation error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.UPDATE_FAILED }, { status: 500 });
  }
}
