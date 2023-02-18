import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { NavigationPage } from '../layout/navigation/navigation';
import { books } from '../main/main-page';

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
  const book = books.find((x) => x.bookId === bookId);

  return (
    <section className='book-page'>
      <Container>
        <NavigationPage />
      </Container>
      <section className='book__description'>
        <p className='body-small book__description-text'>
          {category} / {book?.name}
        </p>
      </section>
      {book && <CardBookPage book={book} />}
    </section>
  );
};
