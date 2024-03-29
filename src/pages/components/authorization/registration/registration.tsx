import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  errorMessage,
  errorMessageServer,
  stepOneFields,
  stepThreeFields,
  stepTwoFields,
  successMessage,
  TitleFormText,
} from '../../../../constants/authorization-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaStepOne, schemaStepThree, schemaStepTwo } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { registerUser, RegistrationRequest, resetError } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { AuthMessage } from '../auth-message/auth-message';
import { StepOneForm } from '../forms/step-one-form';
import { StepThreeForm } from '../forms/step-three-form';
import { StepTwoForm } from '../forms/step-two-form';
import { FormTitle, FormWrapper, Heading, LoginWrapper, MessageSubtitle } from '../login/styled';

export const Registration = () => {
  const registration = useAppSelector((state) => state.user.registration);
  const error = useAppSelector((state) => state.user.error);
  const [step, setStep] = useState(1);
  const [registrationData, setRegistrationData] = useState<RegistrationRequest>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const loader = useAppSelector((state) => state.loader.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Partial<RegistrationRequest>> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, ...data }));
    setStep((x) => x + 1);
  };

  const onSubmitStepThree: SubmitHandler<Partial<RegistrationRequest>> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, ...data }));
    dispatch(registerUser(registrationData));
  };

  enum FieldText {
    errorType = '400',
    subTitle = ' шаг из 3',
  }

  const checkErrorType = (errorType: string) =>
    errorType === FieldText.errorType ? (
      <AuthMessage
        {...errorMessage}
        callBack={() => {
          setStep(1);
          dispatch(resetError());
        }}
      />
    ) : (
      <AuthMessage
        {...errorMessageServer}
        callBack={() => {
          dispatch(registerUser(registrationData));
        }}
      />
    );

  useUserIsLogged();

  return (
    <React.Fragment>
      <LoginWrapper data-test-id='auth'>
        <Heading>{TitleFormText.companyName}</Heading>
        {registration ? (
          <AuthMessage {...successMessage} callBack={() => navigate(NavigationRoutes.login)} />
        ) : error ? (
          checkErrorType(error)
        ) : (
          <FormWrapper>
            <div>
              <FormTitle>{TitleFormText.registrationHeading}</FormTitle>
              <MessageSubtitle>
                {step}
                {FieldText.subTitle}
              </MessageSubtitle>
            </div>
            {step === 1 && <StepOneForm onSubmit={onSubmit} schema={schemaStepOne} step={step} text={stepOneFields} />}
            {step === 2 && <StepTwoForm onSubmit={onSubmit} schema={schemaStepTwo} step={step} text={stepTwoFields} />}

            {step === 3 && (
              <StepThreeForm onSubmit={onSubmitStepThree} schema={schemaStepThree} step={step} text={stepThreeFields} />
            )}
          </FormWrapper>
        )}
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
