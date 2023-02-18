import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Layout } from './pages/layout/layout';
import { LayoutMain } from './pages/layout-main/layout-main';
import { MainPage } from './pages/main/main-page';
import { Terms } from './pages/terms/terms';

import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<LayoutMain />}>
            <Route path='/' element={<Navigate to='/books/all' />} />
            <Route path='/books' element={<Navigate to='/books/all' />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/terms' element={<Terms contentView='terms' />} />
            <Route path='/contract' element={<Terms contentView='contract' />} />
          </Route>
          <Route path='/books/:category/:bookId' element={<BookPage />} />
          <Route path='/profile' element={<MainPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
