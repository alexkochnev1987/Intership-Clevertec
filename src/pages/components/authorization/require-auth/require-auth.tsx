import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../../../store/store-hooks';

export const RequireAuth = ({ children }: { children: ReactElement }) => {
  const auth = useAppSelector((state) => state.user.user);
  //   const location = useLocation();

  if (!auth) {
    return <Navigate to='/login' state={{ from: true }} />;
  }

  return children;
};
