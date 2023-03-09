import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { stepOneFields, stepThreeFields, stepTwoFields } from '../../../../constants/authorisation-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaStepOne, schemaStepThree, schemaStepTwo } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { registerUser, RegistrationRequest, resetError } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { AuthMessage } from '../auth-message/auth-message';
import { RegistrationForm } from '../forms/registration-form';
import { FormTitle, FormWrapper, LoginWrapper, MessageSubtitle } from '../login/styled';

export const Registration = () => {
  const registration = useAppSelector((state) => state.user.registration);
  const error = useAppSelector((state) => state.user.error);
  const [step, setStep] = useState(3);
  const [registrationData, setRegistrationData] = useState<RegistrationRequest>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const loader = useAppSelector((state) => state.loader.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmitStepTwo: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, firstName: data.first, lastName: data.second }));
    setStep((x) => x + 1);
  };

  const onSubmitStepOne: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, username: data.first, password: data.second }));
    setStep((x) => x + 1);
  };

  const onSubmitStepThree: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, phone: data.first, email: data.second }));
    dispatch(registerUser(registrationData));
  };

  const message = {
    title: 'Регистрация успешна',
    message: 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль',
    button: 'вход',
    callBack: () => navigate(NavigationRoutes.login),
  };

  const errorMessage = {
    title: 'Данные не сохранились',
    message:
      'Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.',
    button: 'назад к регистрации',
    callBack: () => {
      setStep(1);
      dispatch(resetError());
    },
  };

  const errorMessageServer = {
    title: 'Данные не сохранились',
    message: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз',
    button: 'повторить',
    callBack: () => {
      dispatch(registerUser(registrationData));
    },
  };

  const checkErrorType = (errorType: string) =>
    errorType === '400' ? <AuthMessage {...errorMessage} /> : <AuthMessage {...errorMessageServer} />;

  useUserIsLogged();

  return (
    <React.Fragment>
      <LoginWrapper>
        {registration ? (
          <AuthMessage {...message} />
        ) : error ? (
          checkErrorType(error)
        ) : (
          <FormWrapper>
            <div>
              <FormTitle>Регистрация</FormTitle>
              <MessageSubtitle>{step} шаг из 3</MessageSubtitle>
            </div>
            {step === 1 && (
              <RegistrationForm onSubmit={onSubmitStepOne} schema={schemaStepOne} step={step} text={stepOneFields} />
            )}
            {step === 2 && (
              <RegistrationForm onSubmit={onSubmitStepTwo} schema={schemaStepTwo} step={step} text={stepTwoFields} />
            )}
            {step === 3 && (
              <RegistrationForm
                onSubmit={onSubmitStepThree}
                schema={schemaStepThree}
                step={step}
                text={stepThreeFields}
              />
            )}
          </FormWrapper>
        )}
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
