import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../store/store-hooks';

import { CardBook } from './card-book/card-book';
import { Search } from './search/search';

import './main-page.css';

export const MainPage = () => {
  const [view, setView] = useState(true);
  const myBooks = useAppSelector((state) => state.books.books);

  return (
    <section className='main-page flex'>
      <Search view={view} setView={setView} />
      <div className={view ? 'main__cards' : 'main__cards-flex'}>
        {myBooks.map((book) => (
          <NavLink to={`/books/${book.categories[0]}/${book.id}`} key={book.id} className='main-page-button'>
            <CardBook book={book} view={view} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};
