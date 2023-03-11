import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import userLogo from '../../../assets/img/avatar.png';
import logo1 from '../../../assets/img/logo.png';
import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import { logoutUser } from '../../../store/user-slice';
import { BurgerContext } from '../../layout/layout';
import { Button } from '../../layout/navigation/styled';

import { BurgerButton } from './burger-button';
import { WrapperExit, WrapperUser } from './styled';

import './header.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.user);
  const { close, setState } = useContext(BurgerContext);

  const handler = () => {
    if (close) {
      setState(false);
    } else {
      setState(true);
    }
  };

  return (
    <div className='header__wrapper'>
      <div className='header__content flex'>
        <button type='button' className='header__name-button' onClick={() => navigate('/books')}>
          <img src={logo1} alt='logo' className='img__logo' />
        </button>

        <BurgerButton open={close} handler={handler} />
        <h3 className='h3 header__name'>Библиотека</h3>
        <WrapperUser>
          <div className='header__user'>
            <p className='header__greet subtitle-small'>Привет, {user?.firstName}!</p>
            <img src={userLogo} alt='user-logo' />
          </div>
          <WrapperExit>
            <li className='nav__first-link'>Профиль</li>
            <Button onClick={() => dispatch(logoutUser())}>
              <li className='nav__first-link'>Выход</li>
            </Button>
          </WrapperExit>
        </WrapperUser>
      </div>
    </div>
  );
};
