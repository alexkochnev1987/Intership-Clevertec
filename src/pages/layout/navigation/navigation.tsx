import { useContext, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { useClickOutside } from '../../../hooks/use-click-outside';
import { useAppSelector } from '../../../store/store-hooks';
import { OpenMenuIcon } from '../../components/open-menu-icon';
import { BurgerContext } from '../layout';

import './menu.css';

enum NavigationLinks {
  showcase = 'Витрина книг',
  allBooks = 'Все книги',
  terms = 'Правила пользования',
  contract = 'Договор оферты',
}

const Blur = styled.section<{ close: boolean }>`
  @media screen and (max-width: 900px) {
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 94px;
    position: absolute;
    z-index: ${(props) => (props.close ? '5' : '5')};
    left: ${(props) => (props.close ? '-150%' : '0')};
    transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
    padding-left: 16px;
  }

  @media screen and (max-width: 575px) {
    padding-top: 80px;
  }
`;

const BurgerMenu = styled.nav`
  max-width: 279px;
  z-index: 10;
  @media screen and (max-width: 900px) {
    padding: 32px;
    width: 70%;
    max-width: 502px;
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 10px;
    background: #f9f9fa;
  }
  @media screen and (max-width: 575px) {
    width: 100%;
    max-width: 288px;
    position: absolute;
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 10px;
    background: #f9f9fa;
  }
`;

const DropDown = styled.li<{ show: boolean }>`
  max-height: ${(props) => (props.show ? '0' : '1000px')};
  transition: 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  overflow: hidden;
`;

const OpenLink = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: space-between;
  max-width: 255px;
`;

const Button = styled.button`
  background: none;
  display: flex;
  cursor: pointer;
  border: none;
`;

export const NavigationPage = () => {
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
        </ul>
      </BurgerMenu>
    </Blur>
  );
};
