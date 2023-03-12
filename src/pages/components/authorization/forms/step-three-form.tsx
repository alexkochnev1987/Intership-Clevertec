import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonText, InputFieldsText, RegistrationText } from '../../../../constants/authorization-constants';
import { RegistrationRequest } from '../../../../store/user-slice';
import { HighlightError } from '../highlight-error/highlight-error';
import { ElementColors, Input, InputError, InputsWrapper, InputWrapper } from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

import { PhoneMask } from './phone-mask';

export const StepThreeForm = ({
  onSubmit,
  schema,
  text,
  step,
}: {
  text: InputFieldsText;
  onSubmit: SubmitHandler<Partial<RegistrationRequest>>;
  step: number;
  schema: yup.ObjectSchema<
    {
      phone: string;
      email: string;
    },
    yup.AnyObject,
    {
      phone: undefined;
      email: undefined;
    },
    ''
  >;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{
    phone: string;
    email: string;
  }>({ resolver: yupResolver(schema), mode: 'all', criteriaMode: 'all' });
  const [secondFocus, setSecondFocus] = useState(false);

  enum FieldText {
    emailName = 'email',
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
      <InputsWrapper>
        <InputWrapper>
          <PhoneMask error={!!errors?.phone} control={control} />
          {errors.phone ? (
            <InputError data-test-id='hint'>{errors.phone.message}</InputError>
          ) : (
            <InputError color={ElementColors.hintText} data-test-id='hint'>
              {text.first.fieldMessage}
            </InputError>
          )}
        </InputWrapper>
        <InputWrapper>
          <Input
            error={!!errors?.email}
            placeholder={text.second.placeHolder}
            {...register(FieldText.emailName, {
              onBlur: () => {
                setSecondFocus(true);
              },
              onChange: () => {
                setSecondFocus(false);
              },
            })}
          />
          {errors.email ? (
            dirtyFields.email ? (
              <HighlightError color={secondFocus} title={text.second.fieldMessage} search={errors.email.types} />
            ) : (
              <InputError data-test-id='hint'>{errors.email.message}</InputError>
            )
          ) : (
            <InputError color={ElementColors.hintText} data-test-id='hint'>
              {text.second.fieldMessage}
            </InputError>
          )}
        </InputWrapper>
      </InputsWrapper>
      <SubmitButtonForForm {...RegistrationText} button={ButtonText[step]} isValid={isValid} />
    </form>
  );
};
