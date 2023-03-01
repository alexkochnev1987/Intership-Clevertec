import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { ReactComponent as Eye } from '../../../../assets/img/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/img/eye-closed.svg';
import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { loginUser, resetError } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { AuthMessage } from '../auth-message/auth-message';

import {
  ContentLink,
  ContentQuestion,
  FormTitle,
  FormWrapper,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
  LoginInputQuestion,
  LoginWrapper,
  PasswordButton,
  SubmitButton,
  SubmitContentWrapper,
  SubmitWrapper,
} from './styled';

type Inputs = {
  name: string;
  password: string;
};

export const Login = () => {
  const loader = useAppSelector((state) => state.loader.loading);
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      loginUser({
        identifier: 'pihoozzz',
        password: '5123260',
      })
    );

    // dispatch(loginUser({ identifier: data.name, password: data.password }));
  };
  const [showPassword, setShowPassword] = useState(false);

  useUserIsLogged();

  const message = {
    title: 'Вход не выполнен',
    message: 'Что-то пошло не так. Попробуйте ещё раз',
    button: 'повторить',
    callBack: () => dispatch(resetError()),
  };

  return (
    <React.Fragment>
      <LoginWrapper>
        {error && error !== '400' ? (
          <AuthMessage {...message} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
              <FormTitle>Вход в личный кабинет</FormTitle>
              <InputsWrapper>
                <InputWrapper>
                  <Input
                    error={!!errors?.name}
                    placeholder='Логин'
                    {...register('name', {
                      required: 'Поле не может быть пустым',
                    })}
                  />
                  {errors.name && <InputError color='#F42C4F'>{errors.name.message}</InputError>}
                </InputWrapper>

                <InputWrapper>
                  <PasswordButton type='button' onClick={() => setShowPassword((s) => !s)}>
                    {showPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
                  </PasswordButton>
                  <Input
                    error={!!errors?.password}
                    placeholder='Пароль'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Поле не может быть пустым' })}
                  />
                  {errors.password && <InputError color='#F42C4F'>{errors.password.message}</InputError>}
                  {error === '400' ? (
                    <React.Fragment>
                      <InputError>Неверный логин и пароль</InputError>
                      <LoginInputQuestion>Восстановить?</LoginInputQuestion>
                    </React.Fragment>
                  ) : (
                    <LoginInputQuestion>Забыли логин и пароль?</LoginInputQuestion>
                  )}
                </InputWrapper>
              </InputsWrapper>
              <SubmitWrapper>
                <SubmitButton type='submit'>Вход</SubmitButton>
                <SubmitContentWrapper>
                  <ContentQuestion>Есть учётная запись?</ContentQuestion>

                  <Link to='/registration'>
                    <ContentLink>
                      Регистрация
                      <GoTo width='18px' height='12px' />
                    </ContentLink>
                  </Link>
                </SubmitContentWrapper>
              </SubmitWrapper>
            </FormWrapper>
          </form>
        )}
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
