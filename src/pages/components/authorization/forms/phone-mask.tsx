import { Control, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { Input } from '../login/styled';

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
    name='phone'
    control={control}
    render={(props) => (
      <InputMask
        maskPlaceholder='x'
        mask='+375 (99) 999-99-99'
        {...props}
        placeholder='Введите номер телефона'
        type='tel'
        onChange={(value): void => {
          props.field.onChange(value);
        }}
      >
        <Input type='tel' error={error} {...props} name='phone' />
      </InputMask>
    )}
  />
);
