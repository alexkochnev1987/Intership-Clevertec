import { FormTitle, FormWrapper, MessageSubtitle, SubmitButton } from '../login/styled';

export const AuthMessage = ({
  title,
  message,
  button,
  callBack,
}: {
  title: string;
  message: string;
  button: string;
  callBack: () => void;
}) => (
  <FormWrapper data-test-id='status-block'>
    <FormTitle>{title}</FormTitle>
    <MessageSubtitle>{message}</MessageSubtitle>
    {button && (
      <SubmitButton
        onClick={() => {
          callBack();
        }}
      >
        {button}
      </SubmitButton>
    )}
  </FormWrapper>
);
