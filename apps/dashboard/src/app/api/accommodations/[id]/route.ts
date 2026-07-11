import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@repo/database';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { ACCOMMODATION_ERRORS } from '@/features/accommodation/constants';
import { deleteDocument } from '@repo/documents';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const accommodation = await prisma.accommodation.findUnique({
      where: { id },
      include: {
        house: true,
        address: true,
        hotel: {
          include: {
            rooms: {
              orderBy: {
                createdAt: 'asc',
              },
            },
          },
        },
      },
    });

    if (!accommodation)
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });

    return NextResponse.json(accommodation);
  } catch (error) {
    console.error('Error fetching accommodation:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.GET_FAILED }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const heroImageObject = `${id}/hero.webp`;
    const galleryImagesObject = `${id}/gallery`;

    const existing = await prisma.accommodation.findUnique({ where: { id } });

    if (!existing)
      return NextResponse.json({ error: ACCOMMODATION_ERRORS.NOT_FOUND }, { status: 404 });

    await prisma.accommodation.delete({ where: { id } });
    await Promise.allSettled([
      deleteDocument({ bucket: 'accommodations', object: heroImageObject }).catch(() =>
        NextResponse.json({ error: ACCOMMODATION_ERRORS.DELETE_IMAGE_FAILED }, { status: 500 }),
      ),
      deleteDocument({ bucket: 'accommodations', object: galleryImagesObject }).catch(() =>
        NextResponse.json({ error: ACCOMMODATION_ERRORS.DELETE_GALLERY_FAILED }, { status: 500 }),
      ),
    ]);

    revalidatePath('/api/accommodations');
    return NextResponse.json({ id });
  } catch (error) {
    console.error('Delete accommodation error:', error);
    return NextResponse.json({ error: ACCOMMODATION_ERRORS.DELETE_FAILED }, { status: 500 });
  }
}
