import { ReactComponent as Eye } from '../../../../assets/img/eye.svg';
import { ReactComponent as EyeClosed } from '../../../../assets/img/eye-closed.svg';

import { PasswordButton } from './styled';

export const PasswordButtonComponent = ({
  showPassword,
  handler,
  showEye,
}: {
  showPassword: boolean;
  showEye: boolean | undefined;
  handler: () => void;
}) => {
  const onShowPassword = () =>
    showPassword ? (
      <PasswordButton type='button' onClick={handler} data-test-id='eye-opened'>
        <Eye width='24px' />
      </PasswordButton>
    ) : (
      <PasswordButton type='button' onClick={handler} data-test-id='eye-closed'>
        <EyeClosed width='24px' />
      </PasswordButton>
    );

  return showEye ? onShowPassword() : null;
};
