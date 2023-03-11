import { BurgerButtonIcon, BurgerLine } from './styled';

export const BurgerButton = ({ open, handler }: { open: boolean; handler: () => void }) => (
  <BurgerButtonIcon onClick={handler} close={open} data-test-id='button-burger'>
    <BurgerLine close={open} />
    <BurgerLine close={open} />
    <BurgerLine close={open} />
  </BurgerButtonIcon>
);
