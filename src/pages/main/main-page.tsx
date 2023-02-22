import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Book } from '../../store/book-slice';
import { useAppSelector } from '../../store/store-hooks';

import { CardBook } from './card-book/card-book';
import { Search } from './search/search';

import './main-page.css';

const Empty = styled.div`
  padding-top: 200px;
  grid-column-start: 1;
  grid-column-end: 5;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  p {
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    text-align: center;
    letter-spacing: 0.1px;
    color: #a7a7a7;
  }
  @media screen and (min-width: 576px) and (max-width: 900px) {
  }
  @media screen and (max-width: 575px) {
    padding: 140px 10px 0;
    align-items: center;
    p {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      line-height: 28px;
    }
  }
`;

export const MainPage = () => {
  const [view, setView] = useState(true);
  const [search, setSearch] = useState('');
  const [asc, setAsc] = useState(false);
  const allBooks = useAppSelector((state) => state.books.books);
  const categories = useAppSelector((state) => state.categories.categories);
  const { category } = useParams();
  const filterCategory = (book: Book) => {
    if (category === 'all') {
      return true;
    }

    if (category) {
      const categoryName = categories.find((elem) => elem.path === category);

      if (categoryName) return book.categories.includes(categoryName.name) ? true : false;
    }

    return false;
  };

  const filterSearch = (book: Book) => {
    if (search) {
      return book.title.toLowerCase().includes(search.toLowerCase().trim());
    }

    return true;
  };

  const sortBooks = (a: Book, b: Book) => {
    const first = a.rating || 0;
    const second = b.rating || 0;

    return asc ? first - second : second - first;
  };

  const filteredBooks = allBooks.filter(filterCategory).filter(filterSearch).sort(sortBooks);

  return (
    <section className='main-page flex'>
      <Search view={view} setView={setView} setSearch={setSearch} setAsc={setAsc} />
      <div className={view ? 'main__cards' : 'main__cards-flex'}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <NavLink to={`${book.id}`} key={book.id} className='main-page-button'>
              <CardBook book={book} view={view} search={search} />
            </NavLink>
          ))
        ) : (
          <Empty>
            {search ? (
              <p data-test-id='search-result-not-found'>По запросу ничего не найдено</p>
            ) : (
              <p data-test-id='empty-category'>В этой категории книг ещё нет</p>
            )}
          </Empty>
        )}
      </div>
    </section>
  );
};
