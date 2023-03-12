import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import {
  AuthTextMessages,
  LoginButtonValues,
  requiredField,
  TitleFormText,
} from '../../../../constants/authorization-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { loginUser, resetError } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { AuthMessage } from '../auth-message/auth-message';

import { PasswordButtonComponent } from './password-button';
import {
  FormTitle,
  FormWrapper,
  Heading,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
  LoginInputQuestion,
  LoginWrapper,
} from './styled';
import { SubmitButtonForForm } from './submit-button';

type Inputs = {
  identifier: string;
  password: string;
};

export const Login = () => {
  const loader = useAppSelector((state) => state.loader.loading);
  const error = useAppSelector((state) => state.user.error);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<Inputs>({ mode: 'all' });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginUser(data));
  };
  const [showPassword, setShowPassword] = useState(false);

  const message = {
    title: 'Вход не выполнен',
    message: 'Что-то пошло не так. Попробуйте ещё раз',
    button: 'повторить',
    callBack: () => dispatch(resetError()),
  };

  enum FieldText {
    errorName = '400',
    identifierName = 'identifier',
    identifierPlaceholder = 'Логин',
    passwordName = 'password',
    typeText = 'text',
    typePassword = 'password',
    passwordPlaceholder = 'Пароль',
  }

  useUserIsLogged();

  return (
    <React.Fragment>
      <LoginWrapper data-test-id='auth'>
        <Heading>{TitleFormText.companyName}</Heading>
        {error && error !== FieldText.errorName ? (
          <AuthMessage {...message} />
        ) : (
          <FormWrapper>
            <FormTitle>{AuthTextMessages.enter}</FormTitle>
            <form onSubmit={handleSubmit(onSubmit)} data-test-id='auth-form'>
              <InputsWrapper>
                <InputWrapper>
                  <Input
                    error={!!errors?.identifier}
                    placeholder={FieldText.identifierPlaceholder}
                    {...register(FieldText.identifierName, {
                      required: requiredField,
                    })}
                  />
                  {errors.identifier && <InputError data-test-id='hint'>{errors.identifier.message}</InputError>}
                </InputWrapper>

                <InputWrapper>
                  <PasswordButtonComponent
                    showEye={dirtyFields.password}
                    showPassword={showPassword}
                    handler={() => setShowPassword((s) => !s)}
                  />
                  <Input
                    error={!!errors?.password}
                    placeholder={FieldText.passwordPlaceholder}
                    type={showPassword ? FieldText.typeText : FieldText.typePassword}
                    {...register(FieldText.passwordName, {
                      required: requiredField,
                    })}
                  />
                  {errors.password && <InputError data-test-id='hint'>{errors.password.message}</InputError>}
                  {error === FieldText.errorName ? (
                    <React.Fragment>
                      <InputError data-test-id='hint'>{AuthTextMessages.wrong}</InputError>
                      <Link to={NavigationRoutes.forgot}>
                        <LoginInputQuestion>{AuthTextMessages.repair}</LoginInputQuestion>
                      </Link>
                    </React.Fragment>
                  ) : (
                    <Link to={NavigationRoutes.forgot}>
                      <LoginInputQuestion>{AuthTextMessages.forgot}</LoginInputQuestion>
                    </Link>
                  )}
                </InputWrapper>
              </InputsWrapper>
              <SubmitButtonForForm {...LoginButtonValues} isValid={isValid} />
            </form>
          </FormWrapper>
        )}
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
