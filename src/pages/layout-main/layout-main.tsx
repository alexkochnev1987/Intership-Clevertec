import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { fetchBooks } from '../../store/book-slice';
import { useAppDispatch } from '../../store/store-hooks';
import { NavigationPage } from '../layout/navigation/navigation';

export const LayoutMain = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className='layout__main-container'>
      <NavigationPage />
      <Outlet />
    </div>
  );
};
