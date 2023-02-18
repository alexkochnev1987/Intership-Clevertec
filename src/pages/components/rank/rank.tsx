import React from 'react';

import star from '../../../assets/img/star.png';
import starFill from '../../../assets/img/star-f.png';

import './rank.css';

export const Rank = (props: { rank: number; showRank?: boolean; smallGap?: boolean; view?: boolean }) => {
  const { rank, showRank, smallGap, view } = props;

  return (
    <div>
      {rank > 0 ? (
        <div className={view ? 'rank-wrapper' : 'rank-wrapper rank__wrapper-small'}>
          <div className={smallGap ? 'rank__gap-small flex' : 'rank__gap flex'}>
            <img src={starFill} alt='star' className={view ? '' : 'rank__star__small'} />
            <img src={starFill} alt='star' className={view ? '' : 'rank__star__small'} />
            <img src={starFill} alt='star' className={view ? '' : 'rank__star__small'} />
            <img src={starFill} alt='star' className={view ? '' : 'rank__star__small'} />
            <img src={star} alt='star' className={view ? '' : 'rank__star__small'} />
          </div>
          {showRank && <p className='h5'>{rank}</p>}
        </div>
      ) : (
        <p className='inactive-text body-small'>еще нет оценок</p>
      )}
    </div>
  );
};
