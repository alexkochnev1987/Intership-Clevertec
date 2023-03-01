import styled from 'styled-components';

export const LoginWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
`;
export const FormWrapper = styled.div`
  padding: 50px 56px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  gap: 32px;
`;

export const FormTitle = styled.p`
  align-self: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 30px;
`;

export const InputsWrapper = styled.div`
  display: grid;
  grid-template-rows: 92px 92px;
  gap: 0;
`;

export const LoginInputQuestion = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: #a7a7a7;
  mix-blend-mode: normal;
`;

export const InputWrapper = styled.div`
  position: relative;
`;
export const InputError = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: ${(props) => props.color || '#F42C4F'};
  mix-blend-mode: normal;
`;

export const Input = styled.input<{ error: boolean }>`
  height: 56px;
  display: block;
  width: 100%;
  background: #f9f9fa;
  border-radius: 4px;
  padding: 12px;
  border: none;
  border-bottom: ${(props) => (props.error ? '1px solid #F42C4F' : '1px solid #bfc4c9')};
  :focus {
    ::placeholder {
      color: #363636;
      transform: translate(0, -20px);
    }
  }
  ::placeholder {
    color: #363636;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
`;

export const SubmitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const SubmitContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ContentQuestion = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: #727272;
`;

export const PasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 15px;
  /* transform: translate(590%, 170%); */
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
`;
export const ContentLink = styled.span`
  display: flex;
  align-items: center;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  gap: 16px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
`;

export const SubmitButton = styled.button`
  width: 100%;
  max-width: 416px;
  height: 52px;
  border: none;
  background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  border-radius: 30px;
  :disabled {
    background: #ebebeb;
    color: #ffffff;
  }
`;

export const MessageSubtitle = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #363636;
`;
