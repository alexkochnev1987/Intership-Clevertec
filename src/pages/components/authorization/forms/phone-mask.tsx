import { Control, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { FormFieldsSchema } from '../../../../constants/authorisation-constants';
import { Input } from '../login/styled';

export const PhoneMask = ({ error, control }: { error: boolean; control: Control<FormFieldsSchema, unknown> }) => (
  <Controller
    name='first'
    control={control}
    render={(props) => (
      <InputMask
        maskPlaceholder='x'
        mask='+375 (99) 999-99-99'
        value={props.field.value}
        {...props}
        placeholder='Введите номер телефона'
        type='tel'
        onChange={(value): void => {
          props.field.onChange(value);
        }}
      >
        <Input type='tel' error={error} {...props} />
      </InputMask>
    )}
  />
);
