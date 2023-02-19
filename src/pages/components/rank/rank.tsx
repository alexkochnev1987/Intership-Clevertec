import star from '../../../assets/img/star.png';
import starFill from '../../../assets/img/star-f.png';

import './rank.css';

export const Rank = (props: { rank: number | null; showRank?: boolean; smallGap?: boolean; view?: boolean }) => {
  const { rank, showRank, smallGap, view } = props;
  const noScore = 'еще нет оценок';

  return (
    <div>
      {rank ? (
        <div className={view ? 'rank-wrapper' : 'rank-wrapper rank__wrapper-small'}>
          <div className={smallGap ? 'rank__gap-small flex' : 'rank__gap flex'}>
            {Array(5)
              .fill(1)
              .map((_, index) => (
                <img src={rank >= index + 1 ? starFill : star} alt='star' className={view ? '' : 'rank__star__small'} />
              ))}
          </div>
          {showRank && <p className='h5'>{rank}</p>}
        </div>
      ) : (
        <p className='inactive-text body-small'>{noScore}</p>
      )}
    </div>
  );
};
