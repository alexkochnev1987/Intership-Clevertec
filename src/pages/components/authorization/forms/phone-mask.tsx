import { Control, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { Input } from '../login/styled';

enum PhoneMaskElements {
  type = 'tel',
  mask = '+375 (99) 999-99-99',
  maskPlaceholder = 'x',
  placeholder = 'Введите номер телефона',
  name = 'phone',
}

export const PhoneMask = ({
  error,
  control,
}: {
  error: boolean;
  control: Control<
    {
      phone: string;
      email: string;
    },
    unknown
  >;
}) => (
  <Controller
    name={PhoneMaskElements.name}
    control={control}
    render={(props) => (
      <InputMask
        maskPlaceholder={PhoneMaskElements.maskPlaceholder}
        mask={PhoneMaskElements.mask}
        {...props}
        placeholder={PhoneMaskElements.placeholder}
        type={PhoneMaskElements.type}
        onChange={(value): void => {
          props.field.onChange(value);
        }}
      >
        <Input type={PhoneMaskElements.type} error={error} {...props} name={PhoneMaskElements.name} />
      </InputMask>
    )}
  />
);
