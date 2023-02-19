import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
          {category} / {book?.categories[0]}
        </p>
      </section>
      {book && !loading && <CardBookPage book={book} />}
    </section>
  );
};
