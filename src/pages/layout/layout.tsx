import { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import { fetchCategories } from '../../store/categories-slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { ErrorMessage } from '../components/error-message/error-message';
import { Header } from '../components/header/header';
import { Spinner } from '../components/spinner/spinner';

import { Footer } from './footer/footer';

import './layout.css';

interface BurgerState {
  close: boolean;
  setState: (open: boolean) => void;
}

export const BurgerContext = createContext<BurgerState>({ close: true, setState: () => {} });

export const Layout = () => {
  const [burgerState, setBurgerState] = useState(false);
  const token = useAppSelector((state) => state.user.jwt);
  const loader = useAppSelector((state) => state.loader.loading);
  const errorCategories = useAppSelector((state) => state.categories.error);
  const errorBooks = useAppSelector((state) => state.books.error);
  const errorDescription = useAppSelector((state) => state.description.error);
  const dispatch = useAppDispatch();

  axios.interceptors.request.use((config) => {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const valueProvider = useMemo(() => {
    const changeBurgerState = (open: boolean) => {
      setBurgerState(open);
    };

    return { close: burgerState, setState: changeBurgerState };
  }, [burgerState]);

  useEffect(() => {
    const checkErrors = () => {
      if (errorBooks || errorCategories || errorDescription) {
        setBurgerState(false);
      } else {
        setBurgerState(true);
      }
    };

    checkErrors();
  }, [errorBooks, errorCategories, errorDescription]);

  return (
    <BurgerContext.Provider value={valueProvider}>
      <div className='container'>
        {(errorCategories || errorBooks || errorDescription) && <ErrorMessage />}
        {loader && <Spinner />}
        <Header />
        <div className='layout__container'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </BurgerContext.Provider>
  );
};
