import React, { useState } from 'react';

import { ReactComponent as SearchIcon } from '../../../assets/img/search-icon.svg';
import { ReactComponent as SortIcon } from '../../../assets/img/sort-icon.svg';

import { ButtonClose, ButtonOpen, Input, LineOne, LineTwo, SearchInput, SortButton } from './styled';

import './search.css';

interface SearchProps {
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  view: boolean;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setAsc: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Search = ({ setView, view, setSearch, setAsc }: SearchProps) => {
  const placeholder = 'Поиск книги или автора…';
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
            <SearchIcon />
          </ButtonOpen>
          <Input
            open={open}
            type='text'
            placeholder={placeholder}
            data-test-id='input-search'
            onChange={(v) => setSearch(v.target.value)}
          />
          <ButtonClose onClick={() => setOpen(false)} open={open} data-test-id='button-search-close'>
            <LineOne />
            <LineTwo />
          </ButtonClose>
        </SearchInput>
        <div className='search__input-container flex'>
          <SortButton
            onClick={() => setAsc((v) => !v)}
            className='search__input search__input-select'
            data-test-id='sort-rating-button'
          >
            <SortIcon fill='#ff740f' />
            <span>{select}</span>
          </SortButton>
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
