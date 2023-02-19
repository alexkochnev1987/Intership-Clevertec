import styled from 'styled-components';

import warning from '../../../assets/img/warning-circle.png';

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  max-width: 1440px;
  position: fixed;
  top: 64px;
  z-index: 12;
  @media screen and (min-width: 576px) and (max-width: 900px) {
    padding-left: 16px;
    padding-right: 16px;
    max-width: 640px;
  }
  @media screen and (max-width: 575px) {
    margin: 0 auto;
    max-width: 320px;
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  padding: 27px 33px;
  background: #feebea;
  border: 1.5px solid #f42c4f;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (min-width: 576px) and (max-width: 900px) {
    padding: 19px 27px;
  }
  @media screen and (max-width: 575px) {
    align-items: flex-start;
    padding: 12px 18px;
    gap: 12px;
  }
`;
const ErrorImage = styled.div`
  img {
    width: 100%;
  }
  @media screen and (min-width: 576px) and (max-width: 900px) {
    img {
      width: 18px;
      height: 18px;
    }
  }
  @media screen and (max-width: 575px) {
    img {
      width: 24px;
      height: 24px;
    }
  }
`;
const ErrorText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;

  @media screen and (min-width: 576px) and (max-width: 900px) {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.1px;
    color: #363636;
  }
  @media screen and (max-width: 575px) {
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }
`;

const ButtonClose = styled.button`
  width: 10px;
  height: 10px;
  display: block;
  background: none;
  border: none;
  padding-top: '5px';
  cursor: pointer;
`;

const Line = styled.span`
  display: block;
  width: 13px;
  height: 2px;
  position: relative;
  background: #363636;
  border-radius: 3px;
  :first-child {
    transform: rotate(45deg) translate(8px, 8px);
  }
  :last-child {
    transform: rotate(-45deg) translate(-7px, 6px);
  }
`;

export const ErrorMessage = () => {
  const message = 'Что-то пошло не так обновите страницу через некоторое время';

  return (
    <ErrorWrapper data-test-id='error'>
      <ErrorContainer>
        <ErrorImage>
          <img src={warning} alt='warning' />
        </ErrorImage>
        <ErrorText>{message}</ErrorText>
        <ButtonClose>
          <Line />
          <Line />
        </ButtonClose>
      </ErrorContainer>
    </ErrorWrapper>
  );
};
