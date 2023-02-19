import React, { useState } from 'react';
import styled from 'styled-components';

import selectIcon from '../../../assets/img/input-select.png';
import searchIcon from '../../../assets/img/search.png';

import './search.css';

interface SearchProps {
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  view: boolean;
}

const SearchInput = styled.div<{ open: boolean }>`
  display: flex;
  @media screen and (max-width: 575px) {
    position: ${(props) => (props.open ? 'absolute' : 'relative')};
    width: ${(props) => (props.open ? '288px' : '32px')};
    z-index: 1;
  }
`;

const Input = styled.input<{ open: boolean }>`
  width: 100%;
  outline: none;
  border: none;
  height: 38px;
  box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
    0px 1px 5px rgba(191, 196, 201, 0.24);
  border-radius: 599px;
  outline: none;
  padding: 0.25rem 0.5rem 0.5rem 0;
  ::placeholder {
    color: #a7a7a7;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.125rem;
    padding-left: 32px;
  }
  @media screen and (max-width: 575px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
    width: ${(props) => (props.open ? '100%' : '32px')};
    height: 32px;
  }
`;

const ButtonClose = styled.button<{ open: boolean }>`
  display: none;
  cursor: pointer;
  position: absolute;
  border: none;
  background: none;
  transform: translate(265px, -2px);
  @media screen and (max-width: 575px) {
    display: ${(props) => (props.open ? 'block' : 'none')};
  }
`;

const ButtonOpen = styled(ButtonClose)`
  transform: translate(8px, 10px);
  display: block;

  @media screen and (max-width: 575px) {
    box-shadow: 0px 2px 4px rgba(191, 196, 201, 0.2), 0px 3px 4px rgba(191, 196, 201, 0.18),
      0px 1px 5px rgba(191, 196, 201, 0.24);
    border-radius: 599px;
    outline: none;
    transform: translate(0px, 0px);
    height: 32px;
    width: 32px;
    display: ${(props) => (props.open ? 'block' : 'none')};
  }
`;

const LineOne = styled.span`
  display: block;
  height: 3px;
  width: 15px;
  background: #ff740f;
  transform: rotate(45deg) translate(10px, 14px);
  border-radius: 5px;
`;
const LineTwo = styled(LineOne)`
  transform: rotate(-45deg) translate(-12px, 8px);
`;

export const Search = ({ setView, view }: SearchProps) => {
  const placeholder = 'Поиск книги или автора..';
  const select = 'По рейтингу';
  const [open, setOpen] = useState(false);

  return (
    <section className='search__container flex'>
      <div className='search__inputs'>
        <SearchInput open={open}>
          <ButtonOpen
            className='search__input-icon'
            open={!open}
            data-test-id='button-search-open'
            onClick={() => setOpen(true)}
          >
            <img src={searchIcon} alt='' />
          </ButtonOpen>
          <Input open={open} type='text' className='' placeholder={placeholder} data-test-id='input-search' />
          <ButtonClose onClick={() => setOpen(false)} open={open} data-test-id='button-search-close'>
            <LineOne />
            <LineTwo />
          </ButtonClose>
        </SearchInput>
        {/* </div> */}
        <div className='search__input-container flex'>
          <img src={selectIcon} alt='' className='search__input-icon' />
          <input type='text' className='search__input search__input-select' placeholder={select} />
        </div>
      </div>
      <div className='search__buttons flex'>
        <button
          onClick={() => setView(true)}
          type='button'
          className={
            view ? 'search__button button-round flex' : 'search__button inactive-round-button button-round flex'
          }
          data-test-id='button-menu-view-window'
        >
          <span className='search__square-button' />
          <span className='search__square-button' />
          <span className='search__square-button' />
          <span className='search__square-button' />
        </button>
        <button
          type='button'
          className={
            view ? 'search__button inactive-round-button button-round flex' : 'search__button button-round flex'
          }
          data-test-id='button-menu-view-list'
          onClick={() => setView(false)}
        >
          <span className='search__line-button' />
          <span className='search__line-button' />
          <span className='search__line-button' />
        </button>
      </div>
    </section>
  );
};
