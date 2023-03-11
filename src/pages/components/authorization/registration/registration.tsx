import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  companyName,
  errorMessage,
  errorMessageServer,
  registrationHeading,
  stepOneFields,
  stepThreeFields,
  stepTwoFields,
  successMessage,
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

  const onSubmitStepOne: SubmitHandler<Partial<RegistrationRequest>> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, ...data }));
    setStep((x) => x + 1);
  };
  const onSubmitStepTwo: SubmitHandler<Partial<RegistrationRequest>> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, ...data }));
    setStep((x) => x + 1);
  };

  const onSubmitStepThree: SubmitHandler<Partial<RegistrationRequest>> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, ...data }));
    dispatch(registerUser(registrationData));
  };

  const checkErrorType = (errorType: string) =>
    errorType === '400' ? (
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
        <Heading>{companyName}</Heading>
        {registration ? (
          <AuthMessage {...successMessage} callBack={() => navigate(NavigationRoutes.login)} />
        ) : error ? (
          checkErrorType(error)
        ) : (
          <FormWrapper>
            <div>
              <FormTitle>{registrationHeading}</FormTitle>
              <MessageSubtitle>{step} шаг из 3</MessageSubtitle>
            </div>
            {step === 1 && (
              <StepOneForm onSubmit={onSubmitStepOne} schema={schemaStepOne} step={step} text={stepOneFields} />
            )}
            {step === 2 && (
              <StepTwoForm onSubmit={onSubmitStepTwo} schema={schemaStepTwo} step={step} text={stepTwoFields} />
            )}

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
