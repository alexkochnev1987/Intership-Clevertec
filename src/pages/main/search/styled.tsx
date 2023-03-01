import styled from 'styled-components';

export const SearchInput = styled.div<{ open: boolean }>`
  display: flex;
  @media screen and (max-width: 575px) {
    position: ${(props) => (props.open ? 'absolute' : 'relative')};
    width: ${(props) => (props.open ? '288px' : '32px')};
    z-index: 1;
  }
`;

export const Input = styled.input<{ open: boolean }>`
  width: 100%;
  outline: none;
  border: none;
  height: 38px;
  box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
    0px 1px 5px rgba(191, 196, 201, 0.24);
  border-radius: 599px;
  outline: none;
  padding: 0.25rem 0.5rem 0.5rem 0;
  caret-color: #f83600;
  :focus {
    ::placeholder {
      display: none;
    }
  }
  ::placeholder {
    color: #a7a7a7;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.125rem;
    padding-left: 32px;
  }
  @media screen and (max-width: 575px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
    width: ${(props) => (props.open ? '100%' : '32px')};
    height: 32px;
  }
`;

export const SortButton = styled.button`
  position: absolute;
  border: none;
  background: none;
  color: #a7a7a7;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  gap: 10px;
  @media screen and (max-width: 575px) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    width: 32px;
    padding: 5px;
    color: white;
    span {
      display: none;
    }
  }
`;

export const ButtonClose = styled.button<{ open: boolean }>`
  display: none;
  cursor: pointer;
  position: absolute;
  border: none;
  background: none;
  transform: translate(265px, -2px);
  @media screen and (max-width: 575px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
  }
`;

export const ButtonOpen = styled(ButtonClose)`
  transform: translate(8px, 10px);
  display: block;

  @media screen and (max-width: 575px) {
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 599px;
    outline: none;
    transform: translate(0px, 0px);
    height: 32px;
    width: 32px;
    display: ${(props) => (props.open ? 'block' : 'none')};
  }
`;

export const LineOne = styled.span`
  display: block;
  height: 3px;
  width: 15px;
  background: #ff740f;
  transform: rotate(45deg) translate(10px, 14px);
  border-radius: 5px;
`;
export const LineTwo = styled(LineOne)`
  transform: rotate(-45deg) translate(-12px, 8px);
`;
