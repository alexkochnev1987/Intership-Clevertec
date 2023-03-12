import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { AuthTextMessages, SendEmailButtonValues, TitleFormText } from '../../../../constants/authorization-constants';
import { NavigationRoutes } from '../../../../constants/routes';
import { schemaSendEmail } from '../../../../constants/validation-schema';
import { useUserIsLogged } from '../../../../hooks/use-user-is-logged';
import { useAppSelector } from '../../../../store/store-hooks';
import { HighlightError } from '../highlight-error/highlight-error';
import {
  ContentLink,
  ElementColors,
  FormTitle,
  FormWrapper,
  Input,
  InputError,
  InputsWrapper,
  InputWrapper,
} from '../login/styled';
import { SubmitButtonForForm } from '../login/submit-button';

export const SendEmail = ({ onSubmit }: { onSubmit: SubmitHandler<{ email: string }> }) => {
  const error = useAppSelector((state) => state.user.error);
  const text = 'На это email  будет отправлено письмо с инструкциями по восстановлению пароля';
  const placeHolder = 'Email';
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
  } = useForm<{ email: string }>({ resolver: yupResolver(schemaSendEmail), mode: 'all', criteriaMode: 'all' });
  const [secondFocus, setSecondFocus] = useState(false);

  useUserIsLogged();

  return (
    <FormWrapper>
      <Link to={NavigationRoutes.login}>
        <ContentLink color={ElementColors.secondTextColor}>
          <span className='rotate-arrow'>
            <GoTo width='18px' height='12px' stroke={ElementColors.secondTextColor} />
          </span>
          {AuthTextMessages.enter}
        </ContentLink>
      </Link>
      <FormTitle>{TitleFormText.repairPassword}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)} data-test-id='send-email-form'>
        <InputsWrapper>
          <InputWrapper>
            <Input
              error={!!errors?.email}
              placeholder={placeHolder}
              {...register('email', {
                onBlur: () => {
                  setSecondFocus(true);
                },
                onChange: () => {
                  setSecondFocus(false);
                },
              })}
            />
            {error && <InputError data-test-id='hint'>error:{error}</InputError>}
            {errors.email ? (
              dirtyFields.email ? (
                <HighlightError color={secondFocus} title={text} search={errors.email.types} />
              ) : (
                <InputError data-test-id='hint'>{errors.email.message}</InputError>
              )
            ) : (
              <InputError color={ElementColors.hintText} data-test-id='hint'>
                {text}
              </InputError>
            )}
          </InputWrapper>
        </InputsWrapper>
        <SubmitButtonForForm {...SendEmailButtonValues} isValid={isValid} />
      </form>
    </FormWrapper>
  );
};
