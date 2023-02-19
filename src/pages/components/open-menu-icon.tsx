import styled from 'styled-components';

const First = styled.div<{ open: boolean }>`
  width: 13px;
  height: 3px;
  background: black;
  transform: ${(props) => (props.open ? 'rotate(45deg) translate(14px,9px)' : 'rotate(-45deg) translate(-6px, 9px)')};
  border-radius: 5px;
  background: ${({ color }) => (color ? color : '#ff740f')};
`;

const Second = styled(First)`
  transform: ${(props) => (props.open ? 'rotate(-45deg) translate(-13px,10px)' : 'rotate(45deg) translate(5px, 10px)')};
`;

const Button = styled.div`
  height: 20px;
  width: 30px;
  background: none;
  display: flex;
  cursor: pointer;
  border: none;
`;

export const OpenMenuIcon = ({ open, onClick, color }: { open: boolean; onClick: () => void; color?: string }) => (
  <Button onClick={onClick}>
    <First open={open} color={color} />
    <Second open={open} color={color} />
  </Button>
);
