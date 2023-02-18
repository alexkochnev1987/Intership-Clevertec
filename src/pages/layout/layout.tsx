import { createContext, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/header/header';

import { Footer } from './footer/footer';

import './layout.css';

interface BurgerState {
  close: boolean;
  setState: (open: boolean) => void;
}

export const BurgerContext = createContext<BurgerState>({ close: true, setState: () => {} });

export const Layout = () => {
  const [burgerState, setBurgerState] = useState(true);

  const valueProvider = useMemo(() => {
    const changeBurgerState = (open: boolean) => {
      setBurgerState(open);
    };

    return { close: burgerState, setState: changeBurgerState };
  }, [burgerState]);

  return (
    <BurgerContext.Provider value={valueProvider}>
      <div className='container'>
        <Header />
        <div className='layout__container'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </BurgerContext.Provider>
  );
};
