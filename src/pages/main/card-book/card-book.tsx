import iconCat from '../../../assets/img/icon_cat.png';
import cover from '../../../assets/img/image.png';
import { Rank } from '../../components/rank/rank';

import './card-book.css';

export interface BookProps {
  name: string;
  rank: number;
  img: null | string[];
  category: string;
  bookId: string;
}

export const CardBook = ({ book, view }: { book: BookProps; view: boolean }) => {
  const { rank, img } = book;

  return (
    <section className={view ? 'card__container' : 'card__container-list'} data-test-id='card'>
      <div className={view ? 'card__img-container' : 'card__img-container-grid'}>
        {img ? (
          <img src={cover} alt='book' className={view ? 'card__page__img' : 'card__image-flex'} />
        ) : (
          <div className={view ? 'cat__block' : 'cat__line'}>
            <img src={iconCat} alt='empty' />
          </div>
        )}
      </div>
      <div className={view ? 'card__rank__container' : 'card__rank__container-grid order2'}>
        <Rank rank={rank} smallGap={true} view={view} />
      </div>
      <p className={view ? 'subtitle-small hide__text-overflow' : 'h5 card__content-text'}>
        Грокаем алгоритмы. Иллюстрированное пособие для програ...
      </p>
      <p
        className={
          view ? 'body-small inactive-text hide__text-overflow' : 'body-large inactive-text card__content-text'
        }
      >
        Адитья Бхаргава, Патрик Нимейер, 2019
      </p>
      <div className={view ? 'card__rank__container' : 'card__rank__container-button order2'}>
        <button className='button-small' type='button'>
          Забронировать
        </button>
      </div>
    </section>
  );
};
