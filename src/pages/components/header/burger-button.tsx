import styled, { css } from 'styled-components';

const BurgerButtonIcon = styled.button<{ close: boolean }>`
  background: none;
  border: none;
  visibility: hidden;
  padding-top: '5px';
  cursor: pointer;
  @media screen and (min-width: 576px) and (max-width: 900px) {
    visibility: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 11;
  }
  @media screen and (max-width: 575px) {
    visibility: visible;
    display: block;
    padding-top: ${(props) => (props.close ? '4px' : '0px')};
    z-index: 11;
  }
`;

const BurgerLine = styled.span<{ close: boolean }>`
  ${(props) => {
    if (!props.close) {
      return css`
        :first-child {
          transform: rotate(45deg) translate(11px, 5px);
        }
        :nth-last-child(2) {
          transform: scaleY(0);
        }
        :nth-last-child(1) {
          transform: rotate(-45deg) translate(6px, 0);
        }
      `;
    }

    return css``;
  }}
  display: block;
  width: 27px;
  height: 3px;
  margin-bottom: 5px;
  position: relative;
  background: #363636;
  border-radius: 3px;
  z-index: 1;
  transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  @media screen and (max-width: 575px) {
  }
`;

export const BurgerButton = ({ open, handler }: { open: boolean; handler: () => void }) => (
  <BurgerButtonIcon onClick={handler} close={open} data-test-id='button-burger'>
    <BurgerLine close={open} />
    <BurgerLine close={open} />
    <BurgerLine close={open} />
  </BurgerButtonIcon>
);
