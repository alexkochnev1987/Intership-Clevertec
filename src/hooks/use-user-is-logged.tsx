import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../store/store-hooks';
import { setUser } from '../store/user-slice';

export const useUserIsLogged = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.user?.firstName);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const userFromStorage = localStorage.getItem('user');

    if (token && userFromStorage) {
      dispatch(setUser({ jwt: token, user: JSON.parse(userFromStorage) }));
      navigate('/');
    }
  }, [dispatch, navigate, userName]);
};
