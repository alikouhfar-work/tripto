import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { useEffect, useState } from 'react';
import type { AccommodationAmenityFormProps } from '@/features/accommodation/types/accommodationAmenity';

export const AccommodationAmenityForm = (props: AccommodationAmenityFormProps) => {
  const { currentItem, closeHandler, createHandler, updateHandler } = props;
  const [title, setTitle] = useState(currentItem.amenity?.title ?? '');
  const [icon, setIcon] = useState(currentItem.amenity?.icon ?? '');
  const [errors, setErrors] = useState<{ title?: string; icon?: string }>({});

  useEffect(() => {
    setTitle(currentItem.amenity?.title ?? '');
    setIcon(currentItem.amenity?.icon ?? '');
    setErrors({});
  }, [currentItem.amenity, currentItem.index]);

  const validate = () => {
    const next: { title?: string; icon?: string } = {};
    if (!title.trim()) next.title = 'Title is required';
    if (!icon.trim()) next.icon = 'Icon is required';
    else if (!icon.startsWith('Icon')) next.icon = 'This icon is not from Tabler Icons';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onReset = () => {
    setTitle('');
    setIcon('');
    setErrors({});
  };

  const onClose = () => {
    onReset();
    closeHandler();
  };

  const onModify = () => {
    if (!validate()) return;
    onClose();
    currentItem.index !== undefined
      ? updateHandler(currentItem.index, { icon, title })
      : createHandler({ icon, title });
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative grid grid-cols-1 gap-x-4 rounded-2xl border border-border/60 bg-muted/30 p-5 shadow-none duration-200 dark:shadow-inner sm:grid-cols-2 lg:grid-cols-1">
      <FieldWithError required htmlFor="amenity-title" label="Title" error={errors.title}>
        <Input
          id="amenity-title"
          className="bg-card"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={!!errors.title}
        />
      </FieldWithError>

      <FieldWithError required htmlFor="amenity-icon" label="Icon" error={errors.icon}>
        <InputGroup className="bg-card">
          <InputGroupInput
            id="amenity-icon"
            placeholder="Enter a Tabler Icon name"
            value={icon}
            onChange={(event) => setIcon(event.target.value)}
            aria-invalid={!!errors.icon}
          />
          <InputGroupAddon>
            <DynamicIcon name={icon} className="text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
      </FieldWithError>

      <div className="flex items-center gap-2">
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
