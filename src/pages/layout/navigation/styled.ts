import styled from 'styled-components';

export const Blur = styled.section<{ close: boolean }>`
  @media screen and (max-width: 900px) {
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 94px;
    position: absolute;
    z-index: ${(props) => (props.close ? '5' : '5')};
    left: ${(props) => (props.close ? '-150%' : '0')};
    transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    padding-left: 16px;
  }

  @media screen and (max-width: 575px) {
    padding-top: 80px;
  }
`;

export const BurgerMenu = styled.nav`
  max-width: 279px;
  z-index: 10;
  @media screen and (max-width: 900px) {
    padding: 32px;
    width: 70%;
    max-width: 502px;
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 10px;
    background: #f9f9fa;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    max-width: 288px;
    position: absolute;
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 10px;
    background: #f9f9fa;
  }
`;

export const DropDown = styled.li<{ show: boolean }>`
  max-height: ${(props) => (props.show ? '0' : '1000px')};
  transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow: hidden;
`;

export const OpenLink = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 255px;
`;

export const Button = styled.button`
  background: none;
  display: flex;
  cursor: pointer;
  border: none;
`;
