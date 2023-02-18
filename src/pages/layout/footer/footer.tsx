import React from 'react';

import facebook from '../../../assets/img/facebook.png';
import instagram from '../../../assets/img/instagram.png';
import linkedIn from '../../../assets/img/linked.png';
import vk from '../../../assets/img/vk.png';

import './footer.css';

export const Footer = () => (
  <footer className='footer__container flex'>
    <div className='body-small second-link-text flex footer__text'>
      <p>© 2020-2023 Cleverland.</p>
      <p>Все права защищены.</p>
    </div>
    <div className='footer__icons flex'>
      <img src={facebook} alt='facebook icon' className='facebook' />
      <img src={instagram} alt='instagram icon' className='instagram' />
      <img src={vk} alt='vk icon' className='vk' />
      <img src={linkedIn} alt='linkedIn icon' className='linked-in' />
    </div>
  </footer>
);
