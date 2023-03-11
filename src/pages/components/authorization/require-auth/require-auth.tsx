import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { NavigationRoutes } from '../../../../constants/routes';
import { useAppSelector } from '../../../../store/store-hooks';

export const RequireAuth = ({ children }: { children: ReactElement }) => {
  const auth = useAppSelector((state) => state.user.user?.username);

  if (!auth) {
    return <Navigate to={NavigationRoutes.login} />;
  }

  return children;
};
