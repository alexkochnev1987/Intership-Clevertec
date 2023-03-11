import styled from 'styled-components';

export const LoginWrapper = styled.div`
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(231.58deg, #f83600 -53.35%, #f9d423 297.76%);
  gap: 46px;
  @media screen and (max-width: 575px) {
    gap: 8px;
  }
`;

export const Heading = styled.h3`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0.1px;
  color: #ffffff;
  text-align: center;
  @media screen and (max-width: 575px) {
    font-size: 18px;
    line-height: 28px;
  }
`;
export const FormWrapper = styled.div`
  min-width: 416px;
  padding: 50px 56px;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 16px;
  gap: 32px;
  @media screen and (max-width: 575px) {
    min-width: 280px;
    max-width: 288px;
    padding: 24px 16px;
  }
`;

export const FormTitle = styled.p`
  color: #363636;
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
  max-width: 400px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: ${(props) => props.color || 'rgb(244, 44, 79)'};
  mix-blend-mode: normal;
`;

export const Input = styled.input<{ error: boolean }>`
  box-sizing: border-box;
  height: 56px;
  display: block;
  width: 100%;
  max-width: 528px;
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
  max-width: 416px;
  display: flex;
  align-items: center;
  gap: 16px;
  @media screen and (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
  }
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
  border: none;
  background: none;
  cursor: pointer;
`;

export const CheckPassword = styled.span`
  position: absolute;
  right: 40px;
  top: 23px;
  border: none;
  background: none;
`;
export const ContentLink = styled.span`
  max-width: 400px;
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
  max-width: 416px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #363636;
`;
