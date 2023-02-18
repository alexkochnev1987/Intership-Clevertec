import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { BookProps, CardBook } from './card-book/card-book';
import { Search } from './search/search';

import './main-page.css';

export const books: BookProps[] = [
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 0,
    img: null,
    category: 'kids',
    bookId: '1527',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image'],
    category: 'story',
    bookId: '1529',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'psychology',
    bookId: '1528',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'fantastic',
    bookId: '1530',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 0,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1531',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1532',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1533',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1534',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1535',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1536',
  },
  {
    name: 'Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих',
    rank: 4,
    img: ['Image', 'Image', 'Image'],
    category: 'kids',
    bookId: '1537',
  },
];

export const MainPage = () => {
  const [view, setView] = useState(true);
  const windowWidth = useRef(window.innerWidth);
  let myBooks = books;

  if (Number(windowWidth) < 575) {
    myBooks = books.filter((a, i) => (i < 6 ? true : false));
  }

  return (
    <section className='main-page flex'>
      <Search view={view} setView={setView} />
      <div className={view ? 'main__cards' : 'main__cards-flex'}>
        {myBooks.map((book) => (
          <NavLink to={`/books/${book.category}/${book.bookId}`} key={book.bookId} className='main-page-button'>
            <CardBook book={book} view={view} />
          </NavLink>
        ))}
      </div>
    </section>
  );
};
