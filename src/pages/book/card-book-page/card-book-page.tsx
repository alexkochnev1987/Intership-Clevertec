import { useState } from 'react';
import styled from 'styled-components';

import iconCat from '../../../assets/img/icon_cat.png';
import { BookDescription } from '../../../store/description-slice';
import { Feedback } from '../../components/feedback/feedback';
import { OpenMenuIcon } from '../../components/open-menu-icon';
import { Rank } from '../../components/rank/rank';
import { SwiperSlider } from '../swiper/swiper';

import './card-book-page.css';

const Button = styled.button`
  height: 20px;
  width: 30px;
  background: none;
  display: flex;
  cursor: pointer;
  border: none;
`;

const DropDown = styled.div<{ open: boolean }>`
  max-height: ${(props) => (props.open ? '0' : '10000px')};
  transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow: hidden;
  padding-top: 1rem;
`;

export const CardBookPage = ({ book }: { book: BookDescription }) => {
  const { rating, images, description, authors, publish, issueYear } = book;
  const [openComments, setOpenComments] = useState(false);

  return (
    <div className='card__page__container'>
      <div className='card__page__content'>
        <div className='card__book-img-container-grid'>
          {images?.length ? (
            <SwiperSlider img={images} />
          ) : (
            <div className='card__page-empty' data-test-id='slide-big'>
              <img src={iconCat} alt='empty' />
            </div>
          )}
        </div>
        <h3>
          <span data-test-id='book-title'>{book.title}</span>
        </h3>
        <p className='h5 inactive-text card__page-h5'>{authors.join(', ')}</p>
        <button className='button-middle card__page__button' type='button'>
          Забронировать
        </button>
        <div className='card__page__book-description'>
          <h5 className='card__page__content-h5 h5'>О книге</h5>
          <p className='body-large card__page-decription'>{description}</p>
        </div>
      </div>
      <div className='card__page__content-container'>
        <h5 className='card__page__content-h5 h5'>Рейтинг</h5>
        <div className='card__page__rank-container'>
          <Rank rank={rating} showRank={true} />
        </div>
      </div>
      <div className='card__page__content-container'>
        <h5 className='card__page__content-h5 h5'>Подробная информация</h5>
        <div className='card__page__info-container'>
          <div className='card_page_info-column'>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Издательство</p>
              <p className='body-large card__page__book-info-text'>{publish}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Год издания</p>
              <p className='body-large card__page__book-info-text'>{issueYear}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Страниц</p>
              <p className='body-large card__page__book-info-text'>{book.pages}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Переплет</p>
              <p className='body-large card__page__book-info-text'>{book.cover}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Формат</p>
              <p className='body-large card__page__book-info-text'>{book.format}</p>
            </div>
          </div>
          <div className='card_page_info-column'>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Жанр</p>
              <p className='body-large card__page__book-info-text'>{book.categories.join(', ')}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Вес</p>
              <p className='body-large card__page__book-info-text'>{book.weight}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>ISBN</p>
              <p className='body-large card__page__book-info-text'>{book.isbn}</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Изготовитель</p>
              <p className='body-large card__page__book-info-text'>{book.producer}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex card__page__feedback-title'>
          <h5 className='h5 card__page__feedback-title'>
            Отзывы
            <span className='card__page__feedbacks-counter'>{book.comments?.length}</span>
          </h5>
          <Button data-test-id='button-hide-reviews' type='button' onClick={() => setOpenComments(!openComments)}>
            <OpenMenuIcon open={openComments} color='black' onClick={() => setOpenComments(!openComments)} />
          </Button>
        </div>
        <DropDown open={openComments}>
          {book.comments?.length && book.comments.map((x) => <Feedback feed={x} key={x.id} />)}
        </DropDown>
        <button className='button-middle card__page__feedback-button' type='button' data-test-id='button-rating'>
          Оценить книгу
        </button>
      </div>
    </div>
  );
};
