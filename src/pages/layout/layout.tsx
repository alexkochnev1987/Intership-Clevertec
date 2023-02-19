import { createContext, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchBooks } from '../../store/book-slice';
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
  const [burgerState, setBurgerState] = useState(true);
  const loaderBooks = useAppSelector((state) => state.books.loading);
  const loaderDescription = useAppSelector((state) => state.description.loading);
  const loaderCategories = useAppSelector((state) => state.categories.loading);
  const errorBooks = useAppSelector((state) => state.books.error);
  const errorDescription = useAppSelector((state) => state.description.error);
  const errorCategories = useAppSelector((state) => state.categories.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchCategories());
  }, [dispatch]);

  const valueProvider = useMemo(() => {
    const changeBurgerState = (open: boolean) => {
      setBurgerState(open);
    };

    return { close: burgerState, setState: changeBurgerState };
  }, [burgerState]);

  useEffect(() => {
    if (errorBooks) setBurgerState(false);
    setBurgerState(true);
  }, [errorBooks]);

  return (
    <BurgerContext.Provider value={valueProvider}>
      <div className='container'>
        {(errorBooks || errorDescription || errorCategories) && <ErrorMessage />}
        {(loaderBooks || loaderDescription || loaderCategories) && <Spinner />}
        <Header />
        <div className='layout__container'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </BurgerContext.Provider>
  );
};
