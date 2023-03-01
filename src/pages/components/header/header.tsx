import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import userLogo from '../../../assets/img/avatar.png';
import logo1 from '../../../assets/img/logo.png';
import { useAppSelector } from '../../../store/store-hooks';
import { BurgerContext } from '../../layout/layout';

import { BurgerButton } from './burger-button';

import './header.css';

export const Header = () => {
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

        <div className='header__user'>
          <p className='header__greet subtitle-small'>Привет, {user?.firstName}!</p>
          <img src={userLogo} alt='user-logo' />
        </div>
      </div>
    </div>
  );
};
