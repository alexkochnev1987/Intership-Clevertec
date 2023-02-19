import styled from 'styled-components';

const Wrapper = styled.div`
  z-index: 15;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(54, 54, 54, 0.3);
  backdrop-filter: blur(10px);
`;

const Loader = styled.div`
  border: 10px solid #ff740f;
  border-top: 10px solid #f3f3f3;
  border-radius: 50%;
  width: 69px;
  height: 69px;

  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @media screen and (min-width: 576px) and (max-width: 900px) {
    border: 7px solid #ff740f;
    border-top: 7px solid #f3f3f3;
    width: 44px;
    height: 44px;
  }
  @media screen and (max-width: 575px) {
  }
`;

export const Spinner = () => (
  <Wrapper data-test-id='loader'>
    <Loader />
  </Wrapper>
);
