import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as Checked } from '../../../../assets/img/checked.svg';
import { ReactComponent as Eye } from '../../../../assets/img/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/img/eye-closed.svg';
import { ResetPasswordButtonValues } from '../../../../constants/authorisation-constants';
import { schemaResetPassword } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppSelector } from '../../../../store/store-hooks';
import { AuthMessage } from '../auth-message/auth-message';
import { HighlightError } from '../highlight-error/highlight-error';
import {
  FormTitle,
  FormWrapper,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
  PasswordButton,
} from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const ResetPassword = ({ onSubmit }: { onSubmit: SubmitHandler<{ first: string; second: string }> }) => {
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
    formState: { errors, isValid, touchedFields },
  } = useForm<{ first: string; second: string }>({
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
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputsWrapper>
          <InputWrapper>
            <PasswordButton type='button' onClick={() => setShowFirstPassword((s) => !s)}>
              {touchedFields.first && !errors?.first && <Checked width='9.5px' />}
              {showFirstPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
            </PasswordButton>
            <Input
              error={!!errors?.first}
              placeholder='Новый пароль'
              type={showFirstPassword ? 'text' : 'password'}
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
              <HighlightError color={firstFocus} title={text} search={errors.first.types} />
            ) : (
              <InputError color='#A7A7A7'>{text}</InputError>
            )}
          </InputWrapper>
          <InputWrapper>
            <PasswordButton type='button' onClick={() => setShowSecondPassword((s) => !s)}>
              {showSecondPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
            </PasswordButton>
            <Input
              error={!!errors?.second}
              placeholder='Повторите пароль'
              type={showSecondPassword ? 'text' : 'password'}
              {...register('second')}
            />
            {errors.second && <InputError>{errors.second.message}</InputError>}
          </InputWrapper>
        </InputsWrapper>
        <SubmitButtonForForm {...ResetPasswordButtonValues} isValid={isValid} />
      </form>
    </FormWrapper>
  );
};
