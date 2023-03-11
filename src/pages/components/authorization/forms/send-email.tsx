import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { SendEmailButtonValues } from '../../../../constants/authorization-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaSendEmail } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppSelector } from '../../../../store/store-hooks';
import { ContentLink, FormTitle, FormWrapper, Input, InputError, InputsWrapper, InputWrapper } from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const SendEmail = ({ onSubmit }: { onSubmit: SubmitHandler<{ email: string }> }) => {
  const error = useAppSelector((state) => state.user.error);
  const text = 'На это email  будет отправлено письмо с инструкциями по восстановлению пароля';
  const placeHolder = 'Email';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ resolver: yupResolver(schemaSendEmail), mode: 'all', criteriaMode: 'all' });

  useUserIsLogged();

  return (
    <FormWrapper>
      <Link to={NavigationRoutes.login}>
        <ContentLink style={{ color: '#727272' }}>
          <span style={{ transform: 'rotate(180deg) translate(0, 3px)' }}>
            <GoTo width='18px' height='12px' stroke='#727272' />
          </span>
          вход в личный кабинет
        </ContentLink>
      </Link>
      <FormTitle>Восстановление пароля</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
        <InputsWrapper>
          <InputWrapper>
            <Input error={!!errors?.email} placeholder={placeHolder} {...register('email')} />
            {errors.email && <InputError data-test-id='hint'>{errors.email.message}</InputError>}
            {error && <InputError data-test-id='hint'>error:{error}</InputError>}
            <InputError color='#A7A7A7' data-test-id='hint'>
              {text}
            </InputError>
          </InputWrapper>
        </InputsWrapper>
        <SubmitButtonForForm {...SendEmailButtonValues} isValid={isValid} />
      </form>
    </FormWrapper>
  );
};
