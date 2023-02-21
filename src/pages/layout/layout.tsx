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
  const [burgerState, setBurgerState] = useState(false);
  const loader = useAppSelector((state) => state.loader.loading);
  const errorCategories = useAppSelector((state) => state.categories.error);
  const errorBooks = useAppSelector((state) => state.books.error);
  const errorDescription = useAppSelector((state) => state.description.error);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchBooks());
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
