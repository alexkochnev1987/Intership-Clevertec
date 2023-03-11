import { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useClickOutside } from '../../../hooks/use-click-outside';
import { useAppDispatch, useAppSelector } from '../../../store/store-hooks';
import { logoutUser } from '../../../store/user-slice';
import { OpenMenuIcon } from '../../components/open-menu-icon';
import { BurgerContext } from '../layout';

import { Blur, BurgerMenu, Button, DropDown, OpenLink } from './styled';

import './menu.css';

enum NavigationLinks {
  showcase = 'Витрина книг',
  allBooks = 'Все книги',
  terms = 'Правила пользования',
  contract = 'Договор оферты',
}

export const NavigationPage = () => {
  const dispatch = useAppDispatch();
  const { close, setState } = useContext(BurgerContext);
  const [show, setShow] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const openNav = () => (isClicked ? setShow(!show) : setIsClicked(true));
  const categories = useAppSelector((state) => state.categories.categories);
  const books = useAppSelector((state) => state.books.books);

  const closeNav = () => {
    setState(true);
    setShow(false);
    setIsClicked(false);
  };
  const burgerMenu = useRef(null);

  const countBooksWithCategory = (category: string) => books.filter((x) => x.categories.includes(category)).length;

  useClickOutside(burgerMenu, () => setState(true), close);

  return (
    <Blur close={close}>
      <BurgerMenu data-test-id='burger-navigation' ref={burgerMenu}>
        <ul>
          <li className='nav__first-link'>
            <NavLink
              to='/books'
              className={({ isActive }) => (isActive ? 'nav__link-active' : '')}
              onClick={openNav}
              data-test-id='navigation-showcase'
              end={false}
            >
              {({ isActive }) =>
                isActive ? (
                  <OpenLink data-test-id='burger-showcase'>
                    {NavigationLinks.showcase}
                    <OpenMenuIcon open={!show} onClick={() => setShow(!show)} />
                  </OpenLink>
                ) : (
                  <span data-test-id='burger-showcase'>{NavigationLinks.showcase}</span>
                )
              }
            </NavLink>
          </li>
          <DropDown show={!show}>
            <ul className='nav__all-books'>
              <li className='h5'>
                <NavLink
                  to='/books/all'
                  className={({ isActive }) => (isActive ? 'nav__link-active' : '')}
                  onClick={() => setState(true)}
                  data-test-id='navigation-books'
                >
                  <span data-test-id='burger-books'>{NavigationLinks.allBooks}</span>
                </NavLink>
              </li>
              <ul>
                {categories.map((x) => (
                  <li className='nav__books-categories' key={x.name}>
                    <NavLink
                      to={`/books/${x.path}`}
                      className={({ isActive }) => (isActive ? 'nav__link-active' : '')}
                      onClick={() => setState(true)}
                    >
                      <span data-test-id={`burger-${x.path}`}>
                        <span className='nav__books-span' data-test-id={`navigation-${x.path}`}>
                          {x.name}
                        </span>
                      </span>
                      <span data-test-id={`burger-book-count-for-${x.path}`}>
                        <span className='inactive-text' data-test-id={`navigation-book-count-for-${x.path}`}>
                          {countBooksWithCategory(x.name)}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </ul>
          </DropDown>
          <li className='nav__first-link'>
            <NavLink
              to='/terms'
              className={({ isActive }) => (isActive ? 'nav__link-active' : '')}
              onClick={closeNav}
              data-test-id='navigation-terms'
            >
              {({ isActive }) =>
                isActive ? (
                  <Button data-test-id='burger-terms' className='nav__link-active'>
                    {NavigationLinks.terms}
                  </Button>
                ) : (
                  <Button data-test-id='burger-terms'>{NavigationLinks.terms}</Button>
                )
              }
            </NavLink>
          </li>
          <li className='nav__first-link'>
            <NavLink
              to='/contract'
              className={({ isActive }) => (isActive ? 'nav__link-active' : '')}
              onClick={closeNav}
              data-test-id='navigation-contract'
            >
              {NavigationLinks.contract}
            </NavLink>
          </li>
          <hr />
          <li className='nav__first-link'>Профиль</li>
          <Button onClick={() => dispatch(logoutUser())}>
            <li className='nav__first-link'>Выход</li>
          </Button>
        </ul>
      </BurgerMenu>
    </Blur>
  );
};
