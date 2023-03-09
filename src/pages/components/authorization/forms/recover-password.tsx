import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../store/store-hooks';
import { userResetPassword, userSendEmail } from '../../../../store/user-slice';
import { Spinner } from '../../spinner/spinner';
import { AuthMessage } from '../auth-message/auth-message';
import { LoginWrapper } from '../login/styled';

import { ResetPassword } from './reset-password';
import { SendEmail } from './send-email';

export const RecoverPassword = () => {
  const [searchParams] = useSearchParams();
  const loader = useAppSelector((state) => state.loader.loading);
  const sendEmail = useAppSelector((state) => state.user.sendEmail);
  const dispatch = useAppDispatch();
  const code = searchParams.get('code');
  const onSubmit: SubmitHandler<{ first: string }> = (data) => {
    dispatch(userSendEmail({ email: data.first }));
  };

  const resetPassword: SubmitHandler<{ first: string; second: string }> = (data) => {
    if (code) dispatch(userResetPassword({ password: data.first, passwordConfirmation: data.second, code }));
  };
  const message = {
    title: 'Письмо выслано',
    message: 'Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля',
    button: '',
    callBack: () => {},
  };

  return (
    <React.Fragment>
      <LoginWrapper>
        {sendEmail ? (
          <AuthMessage {...message} />
        ) : code ? (
          <ResetPassword onSubmit={resetPassword} />
        ) : (
          <SendEmail onSubmit={onSubmit} />
        )}
      </LoginWrapper>
      {loader && <Spinner />}
    </React.Fragment>
  );
};
