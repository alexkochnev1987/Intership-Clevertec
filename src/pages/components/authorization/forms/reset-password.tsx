import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as Checked } from '../../../../assets/img/checked.svg';
import { ResetPasswordButtonValues } from '../../../../constants/authorization-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaResetPassword } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppSelector } from '../../../../store/store-hooks';
import { AuthMessage } from '../auth-message/auth-message';
import { HighlightError } from '../highlight-error/highlight-error';
import { PasswordButtonComponent } from '../login/password-button';
import { CheckPassword, FormTitle, FormWrapper, Input, InputError, InputsWrapper, InputWrapper } from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const ResetPassword = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<{ password: string; passwordConfirmation: string }>;
}) => {
  const [showFirstPassword, setShowFirstPassword] = useState(false);
  const [showSecondPassword, setShowSecondPassword] = useState(false);
  const [firstFocus, setFirstFocus] = useState(false);
  const error = useAppSelector((state) => state.user.error);
  const navigate = useNavigate();

  const jwt = useAppSelector((state) => state.user.jwt);
  const user = useAppSelector((state) => state.user.user);
  const changePassword = useAppSelector((state) => state.user.changePassword);
  const text = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, dirtyFields },
  } = useForm<{ password: string; passwordConfirmation: string }>({
    resolver: yupResolver(schemaResetPassword),
    mode: 'all',
    criteriaMode: 'all',
  });
  const successMessage = {
    title: 'Новые данные сохранены',
    message: 'Зайдите в личный кабинет, используя свои логин и новый пароль',
    button: 'вход',
    callBack: () => {
      localStorage.setItem('jwt', jwt);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      navigate(NavigationRoutes.login);
    },
  };

  const errorMessage = {
    title: 'Данные не сохранились',
    message: 'Что-то пошло не так. Попробуйте ещё раз',
    button: 'повторить',
    callBack: () => {},
  };

  const checkMessage = () => (error ? <AuthMessage {...errorMessage} /> : <AuthMessage {...successMessage} />);

  useUserIsLogged();

  return error || changePassword ? (
    checkMessage()
  ) : (
    <FormWrapper>
      <FormTitle>Восстановление пароля</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)} data-test-id='reset-password-form'>
        <InputsWrapper>
          <InputWrapper>
            {touchedFields.password && !errors?.password && (
              <CheckPassword data-test-id='checkmark'>
                <Checked width='9.5px' />
              </CheckPassword>
            )}
            <PasswordButtonComponent
              showEye={dirtyFields.password}
              showPassword={showFirstPassword}
              handler={() => setShowFirstPassword((s) => !s)}
            />
            <Input
              error={!!errors?.password}
              placeholder='Новый пароль'
              type={showFirstPassword ? 'text' : 'password'}
              {...register('password', {
                onBlur: () => {
                  setFirstFocus(true);
                },
                onChange: () => {
                  setFirstFocus(false);
                },
              })}
            />
            {errors.password ? (
              dirtyFields.password ? (
                <HighlightError color={firstFocus} title={text} search={errors.password.types} />
              ) : (
                <InputError data-test-id='hint'>{errors.password.message}</InputError>
              )
            ) : (
              <InputError color='#A7A7A7' data-test-id='hint'>
                {text}
              </InputError>
            )}
          </InputWrapper>
          <InputWrapper>
            <PasswordButtonComponent
              showEye={dirtyFields.passwordConfirmation}
              showPassword={showSecondPassword}
              handler={() => setShowSecondPassword((s) => !s)}
            />
            <Input
              error={!!errors?.passwordConfirmation}
              placeholder='Повторите пароль'
              type={showSecondPassword ? 'text' : 'password'}
              {...register('passwordConfirmation')}
            />
            {errors.passwordConfirmation && (
              <InputError data-test-id='hint'>{errors.passwordConfirmation.message}</InputError>
            )}
          </InputWrapper>
        </InputsWrapper>
        <SubmitButtonForForm {...ResetPasswordButtonValues} isValid={isValid} />
      </form>
    </FormWrapper>
  );
};
