import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DocumentUploader } from '@/components/shared/DocumentUploader';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { FormSelect } from '@/components/shared/FormSelect';
import { NumberInput } from '@/components/shared/NumberInput';
import { Input } from '@/components/ui/input';
import { AccommodationAmenity } from '@/features/accommodation/components/amenity/AccommodationAmenity';
import { ImagesPreviewWrapper } from '@/features/document/components/ImagesPreviewWrapper';
import {
  IconBed,
  IconImageInPicture,
  IconInfoCircle,
  IconMoneybag,
  IconTag,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Room, RoomFormProps } from '@/features/accommodation/hotel/types/room';
import type { AccommodationAmenity as Amenity } from '@/features/accommodation/types/accommodationAmenity';

export const AccommodationRoomForm = (props: RoomFormProps) => {
  const resetKey = props.currentItem.room?.id ?? 'new';
  return (
    <div key={resetKey}>
      <RoomFormPanel key={resetKey} {...props} />
    </div>
  );
};

const RoomFormPanel = ({
  currentItem,
  closeHandler,
  createHandler,
  updateHandler,
  accommodationId,
  currencyOptions,
}: RoomFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amenities, setAmenities] = useState<Amenity[]>(currentItem.room?.amenities ?? []);
  const [galleryFiles, setGalleryFiles] = useState<File[]>(
    currentItem.room?.galleryImages ?? [],
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const galleryImagesPrefix = `${accommodationId}/rooms/${currentItem.room?.id}/gallery`;

  const onClose = () => {
    setAmenities([]);
    setGalleryFiles([]);
    setErrors({});
    closeHandler();
  };

  const parseOptionalNumber = (value: FormDataEntryValue | null): number | undefined => {
    if (value == null) return undefined;
    const str = String(value).trim();
    if (str === '') return undefined;
    const num = Number(str);
    return Number.isNaN(num) ? undefined : num;
  };

  const onModify = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);

    const title = String(fd.get('title') ?? '').trim();
    const currencyId = String(fd.get('currencyId') ?? '').trim();
    const area = parseOptionalNumber(fd.get('area'));
    const count = parseOptionalNumber(fd.get('count'));
    const price = parseOptionalNumber(fd.get('price'));
    const capacity = parseOptionalNumber(fd.get('capacity'));
    const bathrooms = parseOptionalNumber(fd.get('bathrooms'));
    const bedrooms = parseOptionalNumber(fd.get('bedrooms'));
    const discount = parseOptionalNumber(fd.get('discount'));
    const bedKing = parseOptionalNumber(fd.get('bed_king'));
    const bedQueen = parseOptionalNumber(fd.get('bed_queen'));
    const bedDouble = parseOptionalNumber(fd.get('bed_double'));
    const bedSingle = parseOptionalNumber(fd.get('bed_single'));

    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = 'Title is required';
    if (area === undefined) newErrors.area = 'Area is required';
    else if (area <= 0) newErrors.area = 'Area must be positive';
    if (count === undefined) newErrors.count = 'Count is required';
    else if (count <= 0) newErrors.count = 'Count must be positive';
    if (price === undefined) newErrors.price = 'Price is required';
    else if (price <= 0) newErrors.price = 'Price must be positive';
    if (capacity === undefined) newErrors.capacity = 'Capacity is required';
    else if (capacity <= 0) newErrors.capacity = 'Capacity must be positive';
    if (bathrooms === undefined) newErrors.bathrooms = 'Bathrooms count is required';
    else if (bathrooms <= 0) newErrors.bathrooms = 'Bathrooms count must be positive';
    if (!currencyId) newErrors.currencyId = 'Currency is required';
    if (discount !== undefined && discount <= 0)
      newErrors.discount = 'Discount must be positive';
    if (bedrooms !== undefined && bedrooms <= 0)
      newErrors.bedrooms = 'Bedrooms must be positive';
    if (bedKing !== undefined && bedKing <= 0)
      newErrors.bed_king = 'King size bed count must be positive';
    if (bedQueen !== undefined && bedQueen <= 0)
      newErrors.bed_queen = 'Queen size bed count must be positive';
    if (bedDouble !== undefined && bedDouble <= 0)
      newErrors.bed_double = 'Double size bed count must be positive';
    if (bedSingle !== undefined && bedSingle <= 0)
      newErrors.bed_single = 'Single size bed count must be positive';
    if (amenities.length < 1) newErrors.amenities = 'Amenities is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const beds: Room['beds'] = {};
    if (bedKing !== undefined) beds.king = bedKing;
    if (bedQueen !== undefined) beds.queen = bedQueen;
    if (bedDouble !== undefined) beds.double = bedDouble;
    if (bedSingle !== undefined) beds.single = bedSingle;

    const roomValue = {
      ...(currentItem.room?.id ? { id: currentItem.room.id } : {}),
      title,
      area: area as number,
      count: count as number,
      price: price as number,
      currencyId,
      discount: discount ?? null,
      capacity: capacity as number,
      bedrooms: bedrooms ?? null,
      bathrooms: bathrooms as number,
      amenities,
      galleryImages: galleryFiles,
      beds,
    } as unknown as Room;

    if (currentItem.index !== undefined) updateHandler(currentItem.index, roomValue);
    else createHandler(roomValue);
    onClose();
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative flex flex-col gap-5 gap-x-4 rounded-2xl border border-border/60 bg-muted/30 p-5 shadow-none duration-200 dark:shadow-inner">
      <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="contents">
        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
          <div className="mb-5 flex items-center gap-2 sm:col-span-3">
            <IconInfoCircle className="text-blue-600" size={20} />
            <h2 className="font-bold text-foreground">General Information</h2>
          </div>
          <FieldWithError required label="Room Title" htmlFor="title" error={errors.title}>
            <Input
              id="title"
              name="title"
              defaultValue={currentItem.room?.title ?? ''}
              className="bg-card"
              placeholder="Enter a title"
              aria-invalid={!!errors.title}
            />
          </FieldWithError>

          <FieldWithError
            required
            label="Room Capacity"
            htmlFor="capacity"
            error={errors.capacity}
          >
            <NumberInput
              id="capacity"
              name="capacity"
              defaultValue={currentItem.room?.capacity ?? ''}
              className="bg-card"
              placeholder="Enter a capacity"
              aria-invalid={!!errors.capacity}
            />
          </FieldWithError>

          <FieldWithError required label="Room Area" htmlFor="area" error={errors.area}>
            <NumberInput
              id="area"
              name="area"
              defaultValue={currentItem.room?.area ?? ''}
              className="bg-card"
              placeholder="Enter an area"
              aria-invalid={!!errors.area}
            />
          </FieldWithError>

          <FieldWithError required label="Room Count" htmlFor="count" error={errors.count}>
            <NumberInput
              id="count"
              name="count"
              defaultValue={currentItem.room?.count ?? ''}
              className="bg-card"
              placeholder="Enter room count"
              aria-invalid={!!errors.count}
            />
          </FieldWithError>

          <FieldWithError
            required
            label="Room Bathrooms"
            htmlFor="bathrooms"
            error={errors.bathrooms}
          >
            <NumberInput
              id="bathrooms"
              name="bathrooms"
              defaultValue={currentItem.room?.bathrooms ?? ''}
              className="bg-card"
              placeholder="Enter bathrooms count"
              aria-invalid={!!errors.bathrooms}
            />
          </FieldWithError>

          <FieldWithError htmlFor="bedrooms" label="Room Bedrooms" error={errors.bedrooms}>
            <NumberInput
              id="bedrooms"
              name="bedrooms"
              defaultValue={currentItem.room?.bedrooms ?? ''}
              className="bg-card"
              placeholder="Enter bedrooms count"
              aria-invalid={!!errors.bedrooms}
            />
          </FieldWithError>
        </div>

        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
          <div className="mb-5 flex items-center gap-2 sm:col-span-3">
            <IconMoneybag className="text-blue-600" size={20} />
            <h2 className="font-bold text-foreground">Pricing</h2>
          </div>
          <FieldWithError required htmlFor="price" label="Room Price" error={errors.price}>
            <NumberInput
              id="price"
              name="price"
              step={0.1}
              defaultValue={currentItem.room?.price ?? ''}
              className="bg-card"
              placeholder="Enter a price"
              aria-invalid={!!errors.price}
            />
          </FieldWithError>

          <FieldWithError
            required
            label="Currency"
            htmlFor="currencyId"
            error={errors.currencyId}
          >
            <FormSelect
              name="currencyId"
              defaultValue={currentItem.room?.currencyId ?? ''}
              placeholder="Select a currency"
              options={currencyOptions ?? []}
              aria-invalid={!!errors.currencyId}
            />
          </FieldWithError>

          <FieldWithError htmlFor="discount" label="Discount (%)" error={errors.discount}>
            <NumberInput
              id="discount"
              name="discount"
              step={0.1}
              defaultValue={currentItem.room?.discount ?? ''}
              className="bg-card"
              placeholder="Enter a price"
              aria-invalid={!!errors.discount}
            />
          </FieldWithError>
        </div>

        <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
          <div className="mb-5 flex items-center gap-2 sm:col-span-2">
            <IconBed className="text-blue-600" size={20} />
            <h2 className="font-bold text-foreground">Beds</h2>
          </div>
          <FieldWithError label="King Bed" htmlFor="king-bed" error={errors.bed_king}>
            <NumberInput
              id="king-bed"
              name="bed_king"
              defaultValue={currentItem.room?.beds?.king ?? ''}
              className="bg-card"
              placeholder="Enter bed count"
              aria-invalid={!!errors.bed_king}
            />
          </FieldWithError>

          <FieldWithError label="Queen Bed" htmlFor="queen-bed" error={errors.bed_queen}>
            <NumberInput
              id="queen-bed"
              name="bed_queen"
              defaultValue={currentItem.room?.beds?.queen ?? ''}
              className="bg-card"
              placeholder="Enter bed count"
              aria-invalid={!!errors.bed_queen}
            />
          </FieldWithError>

          <FieldWithError label="Double Bed" htmlFor="double-bed" error={errors.bed_double}>
            <NumberInput
              id="double-bed"
              name="bed_double"
              defaultValue={currentItem.room?.beds?.double ?? ''}
              className="bg-card"
              placeholder="Enter bed count"
              aria-invalid={!!errors.bed_double}
            />
          </FieldWithError>

          <FieldWithError label="Single Bed" htmlFor="single-bed" error={errors.bed_single}>
            <NumberInput
              id="single-bed"
              name="bed_single"
              defaultValue={currentItem.room?.beds?.single ?? ''}
              className="bg-card"
              placeholder="Enter bed count"
              aria-invalid={!!errors.bed_single}
            />
          </FieldWithError>
        </div>
      </form>

      <div>
        <div className="mb-5 flex items-center gap-2 sm:col-span-4">
          <IconImageInPicture className="text-blue-600" size={20} />
          <h2 className="font-bold text-foreground">Room Gallery</h2>
        </div>

        <FieldWithError htmlFor="galleryImages" error={errors.galleryImages}>
          <DocumentUploader
            multiple
            ref={() => {}}
            value={galleryFiles}
            onChange={(value) =>
              setGalleryFiles(
                Array.isArray(value) ? value : value instanceof File ? [value] : [],
              )
            }
          />
        </FieldWithError>
        {currentItem?.room?.id && (
          <ImagesPreviewWrapper
            category="roomGallery"
            bucket="accommodations"
            id={currentItem.room.id}
            prefix={galleryImagesPrefix}
            title={currentItem.room.title}
          />
        )}
      </div>

      <div>
        <div className="mb-5 flex items-center gap-2 sm:col-span-4">
          <IconTag className="text-blue-600" size={20} />
          <h2 className="font-bold text-foreground">Room Amenities</h2>
        </div>

        <AccommodationAmenity
          fields={amenities}
          error={errors.amenities}
          onAppend={(val) => setAmenities((prev) => [...prev, val])}
          onRemove={(idx) => setAmenities((prev) => prev.filter((_, i) => i !== idx))}
          onUpdate={(idx, val) =>
            setAmenities((prev) => prev.map((item, i) => (i === idx ? val : item)))
          }
        />
      </div>

      <div className="mt-5 flex items-center gap-2">
        <ButtonPrimary type="button" color="red" tone="outline" onClick={onClose}>
          Close
        </ButtonPrimary>
        <ButtonPrimary type="button" color="black" onClick={onModify}>
          {currentItem.index !== undefined ? 'Update' : 'Add'}
        </ButtonPrimary>
      </div>
    </div>
  );
};
