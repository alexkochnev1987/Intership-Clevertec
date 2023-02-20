import { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { fetchDescription } from '../../store/description-slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { NavigationPage } from '../layout/navigation/navigation';

import { CardBookPage } from './card-book-page/card-book-page';

import './book-page.css';

const Container = styled.div`
  display: none;
  @media screen and (min-width: 576px) and (max-width: 900px) {
    display: block;
  }
  @media screen and (max-width: 575px) {
    display: block;
  }
`;

export const BookPage = () => {
  const { category, bookId } = useParams();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) => state.description.book);
  const loading = useAppSelector((state) => state.description.loading);
  const categories = useAppSelector((state) => state.categories.categories);
  const findCategoryName = () => {
    if (category === 'all') return 'all';
    if (category) {
      const categoryName = categories.find((elem) => elem.path === category)?.name;

      return categoryName ? categoryName : '';
    }

    return '';
  };

  useEffect(() => {
    if (bookId) dispatch(fetchDescription(bookId));
  }, [dispatch, bookId]);

  return (
    <section className='book-page'>
      <Container>
        <NavigationPage />
      </Container>
      <section className='book__description'>
        <p className='body-small book__description-text'>
          <NavLink to={`/books/${category}`} data-test-id='breadcrumbs-link'>
            {findCategoryName()}
          </NavLink>{' '}
          / <span data-test-id='book-title'>{book?.title}</span>
        </p>
      </section>
      {book && !loading && <CardBookPage book={book} />}
    </section>
  );
};
