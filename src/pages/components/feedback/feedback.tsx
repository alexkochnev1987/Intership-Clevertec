import React from 'react';

import feedBackImg from '../../../assets/img/feedback-img.png';
import { Rank } from '../rank/rank';

import './feedback.css';

export interface FeedbackProps {
  name: string;
  date: string;
  rate: number;
  comment?: string;
  id: number;
}

export const Feedback = (props: { feed: FeedbackProps }) => {
  const { rate, name, date, comment } = props.feed;

  return (
    <div className='feedback__container'>
      <div className='feedback__head flex'>
        <img src={feedBackImg} alt='comment' />
        <p className='body-large'>{name}</p>
        <p className='body-large'>{date}</p>
      </div>
      <Rank rank={rate} />
      <div className='feedback__comment'>
        <p className='body-large'>{comment}</p>
      </div>
    </div>
  );
};
