import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ButtonText, InputFieldsText, RegistrationText } from '../../../../constants/authorization-constants';
import { RegistrationRequest } from '../../../../store/user-slice';
import { HighlightError } from '../highlight-error/highlight-error';
import { Input, InputError, InputsWrapper, InputWrapper } from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const StepTwoForm = ({
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
      firstName: string;
      lastName: string;
    },
    yup.AnyObject,
    {
      firstName: undefined;
      lastName: undefined;
    },
    ''
  >;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{
    firstName: string;
    lastName: string;
  }>({ resolver: yupResolver(schema), mode: 'all', criteriaMode: 'all' });
  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
      <InputsWrapper>
        <InputWrapper>
          <Input
            error={!!errors?.firstName}
            placeholder={text.first.placeHolder}
            {...register('firstName', {
              onBlur: () => {
                setFirstFocus(true);
              },
              onChange: () => {
                setFirstFocus(false);
              },
            })}
          />
          {errors.firstName ? (
            dirtyFields.firstName ? (
              <HighlightError color={firstFocus} title={text.first.fieldMessage} search={errors.firstName.types} />
            ) : (
              <InputError data-test-id='hint'>{errors.firstName.message}</InputError>
            )
          ) : (
            <InputError color='#A7A7A7' data-test-id='hint'>
              {text.first.fieldMessage}
            </InputError>
          )}
        </InputWrapper>
        <InputWrapper>
          <Input
            error={!!errors?.lastName}
            placeholder={text.second.placeHolder}
            {...register('lastName', {
              onBlur: () => {
                setSecondFocus(true);
              },
              onChange: () => {
                setSecondFocus(false);
              },
            })}
          />
          {errors.lastName ? (
            dirtyFields.lastName ? (
              <HighlightError color={secondFocus} title={text.second.fieldMessage} search={errors.lastName.types} />
            ) : (
              <InputError data-test-id='hint'>{errors.lastName.message}</InputError>
            )
          ) : (
            <InputError color='#A7A7A7' data-test-id='hint'>
              {text.second.fieldMessage}
            </InputError>
          )}
        </InputWrapper>
      </InputsWrapper>
      <SubmitButtonForForm {...RegistrationText} button={ButtonText[step]} isValid={isValid} />
    </form>
  );
};
