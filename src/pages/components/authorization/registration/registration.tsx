import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { stepOneFields, stepThreeFields, stepTwoFields } from '../../../../constants/authorisation-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaStepOne, schemaStepThree, schemaStepTwo } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { registerUser, RegistrationRequest } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { RegistrationForm } from '../forms/registration-form';
import { FormTitle, FormWrapper, LoginWrapper, MessageSubtitle } from '../login/styled';

export const Registration = () => {
  const [step, setStep] = useState(1);
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

  const onSubmitStepOne: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, firstName: data.first, lastName: data.second }));
    setStep((x) => x + 1);
    // dispatch(registerUser(data));
  };

  const onSubmitStepTwo: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, username: data.first, password: data.second }));
    setStep((x) => x + 1);
    console.log(data, registrationData);

    // dispatch(registerUser(data));
  };

  const onSubmitStepThree: SubmitHandler<{ first: string; second: string }> = (data, e) => {
    e?.preventDefault();
    setRegistrationData((s) => ({ ...s, phone: data.first, email: data.second }));
    console.log(data, registrationData);

    // dispatch(registerUser(data));
  };

  return (
    <React.Fragment>
      <LoginWrapper>
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
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
  //   return (
  //     <React.Fragment>
  //       <LoginWrapper>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           <FormWrapper>
  //             <FormTitle>Регистрация</FormTitle>
  //             <MessageSubtitle>{step} из 3</MessageSubtitle>
  //             {step === 1 && (
  //               <InputsWrapper>
  //                 <InputWrapper>
  //                   <Input
  //                     error={!!errors?.username}
  //                     placeholder='Придумайте логин для входа'
  //                     {...register('username')}
  //                   />

  //                   {errors.username ? (
  //                     <InputError>{errors.username.message}</InputError>
  //                   ) : (
  //                     <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
  //                   )}
  //                 </InputWrapper>

  //                 <InputWrapper>
  //                   <PasswordButton type='button' onClick={() => setShowPassword((s) => !s)}>
  //                     {isDirty && errors?.password && <Checked width='9.5px' />}
  //                     {showPassword ? <Eye width='24px' /> : <EyeClosed width='24px' />}
  //                   </PasswordButton>
  //                   <Input
  //                     error={!!errors?.password}
  //                     placeholder='Пароль'
  //                     type={showPassword ? 'text' : 'password'}
  //                     {...register('password')}
  //                   />
  //                   <InputError color='#A7A7A7'>Пароль не менее 8 символов, с заглавной буквой и цифрой</InputError>
  //                   {errors.password && <InputError>{errors.password.message}</InputError>}
  //                 </InputWrapper>
  //               </InputsWrapper>
  //             )}

  //             {step === 1 && (
  //               <React.Fragment>
  //                 <InputWrapper>
  //                   <Input
  //                     error={!!errors?.firstName}
  //                     placeholder='Придумайте логин для входа'
  //                     {...register('firstName', {
  //                       required: 'Поле не может быть пустым',
  //                     })}
  //                   />
  //                   <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
  //                   {errors.firstName && <InputError>{errors.firstName.message}</InputError>}
  //                 </InputWrapper>
  //                 <InputWrapper>
  //                   <Input
  //                     error={!!errors?.lastName}
  //                     placeholder='Придумайте логин для входа'
  //                     {...register('lastName', {
  //                       required: 'Поле не может быть пустым',
  //                     })}
  //                   />
  //                   <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
  //                   {errors.lastName && <InputError>{errors.lastName.message}</InputError>}
  //                 </InputWrapper>
  //               </React.Fragment>
  //             )}

  //             {step === 1 && (
  //               <React.Fragment>
  //                 <InputWrapper>
  //                   <Input error={!!errors?.phone} placeholder='Придумайте логин для входа' {...register('phone')} />
  //                   <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
  //                   {errors.phone && <InputError>{errors.phone.message}</InputError>}
  //                 </InputWrapper>
  //                 <InputWrapper>
  //                   <Input error={!!errors?.email} placeholder='Придумайте логин для входа' {...register('email')} />
  //                   <InputError color='#A7A7A7'>Используйте для логина латинский алфавит и цифры</InputError>
  //                   {errors.email && <InputError>{errors.email.message}</InputError>}
  //                 </InputWrapper>
  //               </React.Fragment>
  //             )}
  //   <SubmitWrapper>
  //     {/* {step === 3 ? ( */}
  //     <SubmitButton type='submit' disabled={!isValid}>
  //       {ButtonText[step]}
  //     </SubmitButton>
  //     {/* ) : ( */}
  //     <SubmitButton
  //       type='button'
  //       disabled={isInvalidFields()}
  //       onClick={() => {
  //         setStep((s) => s + 1);
  //       }}
  //     >
  //       {ButtonText[step]}
  //     </SubmitButton>
  //     {/* )} */}
  //     <SubmitContentWrapper>
  //       <ContentQuestion>Есть учётная запись?</ContentQuestion>

  //       <Link to={NavigationRoutes.login}>
  //         <ContentLink>
  //           Войти
  //           <GoTo width='18px' height='12px' />
  //         </ContentLink>
  //       </Link>
  //     </SubmitContentWrapper>
  //   </SubmitWrapper>
  //           </FormWrapper>
  //         </form>
  //       </LoginWrapper>
  //       {loader && <Spinner />}
  //     </React.Fragment>
  //   );
};
