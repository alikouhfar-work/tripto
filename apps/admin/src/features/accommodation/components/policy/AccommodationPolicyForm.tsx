import { ButtonPrimary } from '@/components/shared/ButtonPrimary';
import { DynamicIcon } from '@/components/shared/DynamicIcon';
import { FieldWithError } from '@/components/shared/FieldWithError';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { AccommodationPolicyFormProps } from '@/features/accommodation/types/accommodationPolicy';

export const AccommodationPolicyForm = (props: AccommodationPolicyFormProps) => {
  const { currentItem, closeHandler, createHandler, updateHandler } = props;
  const [title, setTitle] = useState(currentItem.policy?.title ?? '');
  const [icon, setIcon] = useState(currentItem.policy?.icon ?? '');
  const [description, setDescription] = useState(currentItem.policy?.description ?? '');
  const [errors, setErrors] = useState<{ title?: string; icon?: string; description?: string }>(
    {},
  );

  useEffect(() => {
    setTitle(currentItem.policy?.title ?? '');
    setIcon(currentItem.policy?.icon ?? '');
    setDescription(currentItem.policy?.description ?? '');
    setErrors({});
  }, [currentItem.policy, currentItem.index]);

  const validate = () => {
    const next: { title?: string; icon?: string; description?: string } = {};
    if (!title.trim()) next.title = 'Title is required';
    if (!icon.trim()) next.icon = 'Icon is required';
    else if (!icon.startsWith('Icon')) next.icon = 'This icon is not from Tabler Icons';
    if (!description.trim()) next.description = 'Description is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onReset = () => {
    setTitle('');
    setIcon('');
    setDescription('');
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
      ? updateHandler(currentItem.index, { icon, title, description })
      : createHandler({ icon, title, description });
  };

  return (
    <div className="animate-in fade-in slide-in-from-top-2 relative grid grid-cols-1 gap-x-4 rounded-2xl border border-border/60 bg-muted/30 p-5 shadow-none duration-200 dark:shadow-inner sm:grid-cols-2 lg:grid-cols-1">
      <FieldWithError required htmlFor="policy-title" label="Title" error={errors.title}>
        <Input
          id="policy-title"
          className="bg-card"
          placeholder="Enter a title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          aria-invalid={!!errors.title}
        />
      </FieldWithError>

      <FieldWithError required htmlFor="policy-icon" label="Icon" error={errors.icon}>
        <InputGroup className="bg-card">
          <InputGroupInput
            id="policy-icon"
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

      <FieldWithError
        required
        label="Description"
        htmlFor="policy-description"
        className="sm:col-span-2 lg:col-span-1"
        error={errors.description}
      >
        <Textarea
          id="policy-description"
          className="bg-card"
          placeholder="Enter a description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          aria-invalid={!!errors.description}
        />
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
