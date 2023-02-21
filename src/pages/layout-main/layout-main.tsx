import { Outlet } from 'react-router-dom';

import { NavigationPage } from '../layout/navigation/navigation';

export const LayoutMain = () => (
  <div className='layout__main-container'>
    <NavigationPage />
    <Outlet />
  </div>
);
