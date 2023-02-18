import { useState } from 'react';
import styled from 'styled-components';

import iconCat from '../../../assets/img/icon_cat.png';
import { Feedback, FeedbackProps } from '../../components/feedback/feedback';
import { OpenMenuIcon } from '../../components/open-menu-icon';
import { Rank } from '../../components/rank/rank';
import { BookProps } from '../../main/card-book/card-book';
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

const feedbacks: FeedbackProps[] = [
  {
    id: 1,
    rate: 4,
    name: 'Alex',
    date: '5 января 2019',
    comment: `Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не
      оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение
      современных методик предоставляет широкие возможности для позиций, занимаемых участниками в
      отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на
      базе интернет-аналитики выводы будут в
      равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций
      — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И
      нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически,
      превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.`,
  },
  {
    rate: 4,
    name: 'Alex',
    date: '5 января 2019',
    id: 4,
  },
];

const DropDown = styled.div<{ open: boolean }>`
  max-height: ${(props) => (props.open ? '0' : '10000px')};
  transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow: hidden;
  padding-top: 1rem;
`;

export const CardBookPage = ({ book }: { book: BookProps }) => {
  const { rank, img, name } = book;
  const [openComments, setOpenComments] = useState(false);
  const description = `Алгоритмы — это всего лишь пошаговые алгоритмы решения задач,
    и большинство таких задач уже были кем-то решены, протестированы и проверены. Можно,
    конечно, погрузится в глубокую философию гениального Кнута, изучить многостраничные
    фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?`;
  const description2 = `Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы
     — это просто. А грокать алгоритмы — это веселое и увлекательное занятие.`;

  return (
    <div className='card__page__container'>
      <div className='card__page__content'>
        <div className='card__img-container-grid'>
          {img ? (
            <SwiperSlider img={img} />
          ) : (
            <div className='card__page-empty' data-test-id='slide-big'>
              <img src={iconCat} alt='empty' />
            </div>
          )}
        </div>
        <h3>{name}</h3>
        <p className='h5 inactive-text card__page-h5'>Адитья Бхаргава, Патрик Нимейер, 2019</p>
        <button className='button-middle card__page__button' type='button'>
          Забронировать
        </button>
        <div className='card__page__book-description'>
          <h5 className='card__page__content-h5 h5'>О книге</h5>
          <p className='body-large card__page-decription'>{description}</p>
          <p className='body-large'>{description2}</p>
        </div>
      </div>
      <div className='card__page__content-container'>
        <h5 className='card__page__content-h5 h5'>Рейтинг</h5>
        <div className='card__page__rank-container'>
          <Rank rank={rank} showRank={true} />
        </div>
      </div>
      <div className='card__page__content-container'>
        <h5 className='card__page__content-h5 h5'>Подробная информация</h5>
        <div className='card__page__info-container'>
          <div className='card_page_info-column'>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Издательство</p>
              <p className='body-large card__page__book-info-text'>Питер</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Год издания</p>
              <p className='body-large card__page__book-info-text'>2019</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Страниц</p>
              <p className='body-large card__page__book-info-text'>288</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Переплет</p>
              <p className='body-large card__page__book-info-text'>Мягкая обложка</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Формат</p>
              <p className='body-large card__page__book-info-text'>700Х100</p>
            </div>
          </div>
          <div className='card_page_info-column'>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Жанр</p>
              <p className='body-large card__page__book-info-text'>Компьютерная литература</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Вес</p>
              <p className='body-large card__page__book-info-text'>370г</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>ISBN</p>
              <p className='body-large card__page__book-info-text'>978-5-4461-0923-4</p>
            </div>
            <div className='card__page__book-info'>
              <p className='subtitle-large inactive-text'>Изготовитель</p>
              <p className='body-large card__page__book-info-text'>
                ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='flex card__page__feedback-title'>
          <h5 className='h5 card__page__feedback-title'>
            Отзывы
            <span className='card__page__feedbacks-counter'>{feedbacks.length}</span>
          </h5>
          <Button data-test-id='button-hide-reviews' type='button' onClick={() => setOpenComments(!openComments)}>
            <OpenMenuIcon open={openComments} color='black' onClick={() => setOpenComments(!openComments)} />
          </Button>
        </div>
        <DropDown open={openComments}>
          {feedbacks.map((x) => (
            <Feedback feed={x} key={x.id} />
          ))}
        </DropDown>
        <button className='button-middle card__page__feedback-button' type='button' data-test-id='button-rating'>
          Оценить книгу
        </button>
      </div>
    </div>
  );
};
