import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../store/store-hooks';
import { setUser } from '../store/user-slice';

export const useUserIsLogged = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const userFromStorage = localStorage.getItem('user');

    if (token && userFromStorage) {
      dispatch(setUser({ jwt: token, user: JSON.parse(userFromStorage) }));
      if (location.state) {
        navigate(-1);
      }
      navigate('/');
    }
  }, [dispatch, location.state, navigate]);
};
