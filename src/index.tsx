import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { NavigationRoutes } from './constants/routes';
import { BookPage } from './pages/book';
import { Login } from './pages/components/authorization/login/login';
import { Registration } from './pages/components/authorization/registration/registration';
import { RequireAuth } from './pages/components/authorization/require-auth/require-auth';
import { ErrorPage } from './pages/error-page/error-page';
import { Layout } from './pages/layout/layout';
import { LayoutMain } from './pages/layout-main/layout-main';
import { MainPage } from './pages/main/main-page';
import { Terms } from './pages/terms/terms';
import { store } from './store';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
const contentView = { terms: 'terms', contract: 'contract' };

root.render(
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path={NavigationRoutes.login} element={<Login />} />
        <Route path={NavigationRoutes.registration} element={<Registration />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route path='/' element={<LayoutMain />}>
            <Route path='/' element={<Navigate to={NavigationRoutes.books + NavigationRoutes.all} />} />
            <Route
              path={NavigationRoutes.books}
              element={<Navigate to={NavigationRoutes.books + NavigationRoutes.all} />}
            />
            <Route path={NavigationRoutes.books + NavigationRoutes.category} element={<MainPage />} />
            <Route path={NavigationRoutes.terms} element={<Terms contentView={contentView.terms} />} />
            <Route path={NavigationRoutes.contract} element={<Terms contentView={contentView.contract} />} />
          </Route>
          <Route
            path={NavigationRoutes.books + NavigationRoutes.category + NavigationRoutes.bookId}
            element={<BookPage />}
          />
          <Route path='/profile' element={<MainPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </Provider>
);
