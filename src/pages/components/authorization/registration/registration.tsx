import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as Checked } from '../../../../assets/img/checked.svg';
import { ReactComponent as Eye } from '../../../../assets/img/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/img/eye-closed.svg';
import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { NavigationRoutes } from '../../../../constants/routes';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { registerUser, RegistrationRequest } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import {
  ContentLink,
  ContentQuestion,
  FormTitle,
  FormWrapper,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
  LoginWrapper,
  MessageSubtitle,
  PasswordButton,
  SubmitButton,
  SubmitContentWrapper,
  SubmitWrapper,
} from '../login/styled';

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

enum ButtonText {
  'Следующий шаг' = 1,
  'Последний шаг',
  'зарегистрироваться',
}

export const Registration = () => {
  const [step, setStep] = useState(1);
  const loader = useAppSelector((state) => state.loader.loading);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<RegistrationRequest>({ mode: 'onBlur', resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<RegistrationRequest> = (data, e) => {
    e?.preventDefault();
    setStep((s) => s + 1);
    console.log(data);

    dispatch(registerUser(data));
  };

  useUserIsLogged();
  console.log(errors);

  return (
    <React.Fragment>
      <LoginWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormWrapper>
            <FormTitle>Регистрация</FormTitle>
            <MessageSubtitle>{step} из 3</MessageSubtitle>
            {step === 1 && (
              <InputsWrapper>
                <InputWrapper>
                  <Input
                    error={!!errors?.username}
                    placeholder='Придумайте логин для входа'
                    {...register('username')}
                  />

                  {errors.username ? (
                    <InputError>{errors.username.message}</InputError>
                  ) : (
                    <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
                  )}
                </InputWrapper>

                <InputWrapper>
                  <PasswordButton type='button' onClick={() => setShowPassword((s) => !s)}>
                    {isDirty && errors?.password && <Checked width='9.5px' />}
                    {showPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
                  </PasswordButton>
                  <Input
                    error={!!errors?.password}
                    placeholder='Пароль'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password')}
                  />
                  <InputError color='#A7A7A7'>Пароль не менее 8 символов, с заглавной буквой и цифрой</InputError>
                  {errors.password && <InputError>{errors.password.message}</InputError>}
                </InputWrapper>
              </InputsWrapper>
            )}

            {step === 2 && (
              <React.Fragment>
                <InputWrapper>
                  <Input
                    error={!!errors?.firstName}
                    placeholder='Придумайте логин для входа'
                    {...register('firstName', {
                      required: 'Поле не может быть пустым',
                    })}
                  />
                  <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
                  {errors.firstName && <InputError>{errors.firstName.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                  <Input
                    error={!!errors?.lastName}
                    placeholder='Придумайте логин для входа'
                    {...register('lastName', {
                      required: 'Поле не может быть пустым',
                    })}
                  />
                  <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
                  {errors.lastName && <InputError>{errors.lastName.message}</InputError>}
                </InputWrapper>
              </React.Fragment>
            )}

            {step === 3 && (
              <React.Fragment>
                <InputWrapper>
                  <Input
                    error={!!errors?.phone}
                    placeholder='Придумайте логин для входа'
                    {...register('phone', {
                      required: 'Поле не может быть пустым',
                    })}
                  />
                  <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
                  {errors.phone && <InputError>{errors.phone.message}</InputError>}
                </InputWrapper>
                <InputWrapper>
                  <Input
                    error={!!errors?.email}
                    placeholder='Придумайте логин для входа'
                    {...register('email', {
                      required: 'Поле не может быть пустым',
                    })}
                  />
                  <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
                  {errors.email && <InputError>{errors.email.message}</InputError>}
                </InputWrapper>
              </React.Fragment>
            )}
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
          </FormWrapper>
        </form>
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
