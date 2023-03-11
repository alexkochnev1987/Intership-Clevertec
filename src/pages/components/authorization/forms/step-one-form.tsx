import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Checked } from '../../../../assets/img/checked.svg';
import { ButtonText, InputFieldsText, IStepOne, RegistrationText } from '../../../../constants/authorization-constants';
import { HighlightError } from '../highlight-error/highlight-error';
import { PasswordButtonComponent } from '../login/password-button';
import { CheckPassword, Input, InputError, InputsWrapper, InputWrapper } from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const StepOneForm = ({
  onSubmit,
  schema,
  text,
  step,
}: {
  text: InputFieldsText;
  onSubmit: SubmitHandler<IStepOne>;
  step: number;
  schema: yup.ObjectSchema<
    {
      username: string;
      password: string;
    },
    yup.AnyObject,
    {
      username: undefined;
      password: undefined;
    },
    ''
  >;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm<IStepOne>({ resolver: yupResolver(schema), mode: 'all', criteriaMode: 'all' });
  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-test-id='register-form'>
      <InputsWrapper>
        <InputWrapper>
          <Input
            error={!!errors?.username}
            placeholder={text.first.placeHolder}
            {...register('username', {
              onBlur: () => {
                setFirstFocus(true);
              },
              onChange: () => {
                setFirstFocus(false);
              },
            })}
          />
          {errors.username ? (
            dirtyFields.username ? (
              <HighlightError color={firstFocus} title={text.first.fieldMessage} search={errors.username.types} />
            ) : (
              <InputError data-test-id='hint'>{errors.username.message}</InputError>
            )
          ) : (
            <InputError color='#A7A7A7' data-test-id='hint'>
              {text.first.fieldMessage}
            </InputError>
          )}
        </InputWrapper>
        <InputWrapper>
          {touchedFields.password && !errors?.password && (
            <CheckPassword data-test-id='checkmark'>
              <Checked width='9.5px' />
            </CheckPassword>
          )}
          <PasswordButtonComponent
            showEye={touchedFields.password}
            showPassword={showPassword}
            handler={() => setShowPassword((s) => !s)}
          />
          <Input
            error={!!errors?.password}
            placeholder={text.second.placeHolder}
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              onBlur: () => {
                setSecondFocus(true);
              },
              onChange: () => {
                setSecondFocus(false);
              },
            })}
          />
          {errors.password ? (
            dirtyFields.password ? (
              <HighlightError color={secondFocus} title={text.second.fieldMessage} search={errors.password.types} />
            ) : (
              <InputError data-test-id='hint'>{errors.password.message}</InputError>
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
