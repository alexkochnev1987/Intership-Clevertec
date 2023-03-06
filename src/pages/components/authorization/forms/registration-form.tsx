import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Checked } from '../../../../assets/img/checked.svg';
import { ReactComponent as Eye } from '../../../../assets/img/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/img/eye-closed.svg';
import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { ButtonText, FormFieldsSchema, InputFieldsText } from '../../../../constants/authorisation-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { HighlightError } from '../highlight-error/highlight-error';
import {
  ContentLink,
  ContentQuestion,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
  PasswordButton,
  SubmitButton,
  SubmitContentWrapper,
  SubmitWrapper,
} from '../login/styled';

export const RegistrationForm = ({
  onSubmit,
  schema,
  step,
  text,
}: {
  text: InputFieldsText;
  onSubmit: SubmitHandler<FormFieldsSchema>;
  step: number;
  schema: yup.ObjectSchema<
    {
      first: string;
      second: string;
    },
    yup.AnyObject,
    {
      first: undefined;
      second: undefined;
    },
    ''
  >;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<FormFieldsSchema>({ resolver: yupResolver(schema), mode: 'all', criteriaMode: 'all' });
  const [firstFocus, setFirstFocus] = useState(false);
  const [secondFocus, setSecondFocus] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputsWrapper>
        <InputWrapper>
          <Input
            error={!!errors?.first}
            placeholder={text.first.placeHolder}
            {...register('first', {
              onBlur: () => {
                setFirstFocus(true);
              },
              onChange: () => {
                setFirstFocus(false);
              },
            })}
          />
          {errors.first ? (
            <HighlightError color={firstFocus} title={text.first.fieldMessage} search={errors.first.types} />
          ) : (
            <InputError color='#A7A7A7'>{text.first.fieldMessage}</InputError>
          )}
        </InputWrapper>
        {step === 1 ? (
          <InputWrapper>
            <PasswordButton type='button' onClick={() => setShowPassword((s) => !s)}>
              {touchedFields.second && !errors?.second && <Checked width='9.5px' />}
              {showPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
            </PasswordButton>
            <Input
              error={!!errors?.second}
              placeholder={text.second.placeHolder}
              type={showPassword ? 'text' : 'password'}
              {...register('second', {
                onBlur: () => {
                  setSecondFocus(true);
                },
                onChange: () => {
                  setSecondFocus(false);
                },
              })}
            />
            {errors.second ? (
              <HighlightError color={secondFocus} title={text.second.fieldMessage} search={errors.second.types} />
            ) : (
              <InputError color='#A7A7A7'>{text.second.fieldMessage}</InputError>
            )}
          </InputWrapper>
        ) : (
          <InputWrapper>
            <Input
              error={!!errors?.second}
              placeholder={text.second.placeHolder}
              {...register('second', {
                onBlur: () => {
                  setSecondFocus(true);
                },
                onChange: () => {
                  setSecondFocus(false);
                },
              })}
            />
            {errors.second ? (
              <HighlightError color={secondFocus} title={text.second.fieldMessage} search={errors.second.types} />
            ) : (
              <InputError color='#A7A7A7'>{text.second.fieldMessage}</InputError>
            )}
          </InputWrapper>
        )}
      </InputsWrapper>
      <SubmitWrapper>
        <SubmitButton type='submit' disabled={!isValid}>
          {ButtonText[step]}
        </SubmitButton>

        <SubmitContentWrapper>
          <ContentQuestion>Есть учётная запись?</ContentQuestion>

          <Link to={NavigationRoutes.login}>
            <ContentLink>
              Войти
              <GoTo width='18px' height='12px' />
            </ContentLink>
          </Link>
        </SubmitContentWrapper>
      </SubmitWrapper>
    </form>
  );
};
