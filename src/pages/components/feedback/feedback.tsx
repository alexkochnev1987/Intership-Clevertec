import avatar from '../../../assets/img/avatar.png';
import { HOST } from '../../../store/book-slice';
import { Comment } from '../../../store/description-slice';
import { Rank } from '../rank/rank';

import './feedback.css';

export const Feedback = (props: { feed: Comment }) => {
  const { rating, createdAt, text, user } = props.feed;
  const date = new Date(createdAt).toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='feedback__container'>
      <div className='feedback__head flex'>
        {user.avatarUrl ? <img src={`${HOST}${user.avatarUrl}`} alt='user' /> : <img src={avatar} alt='user' />}

        <p className='body-large'>
          {user.firstName} {user.lastName}
        </p>
        <p className='body-large'>{date}</p>
      </div>
      <Rank rank={rating} />
      <div className='feedback__comment'>
        <p className='body-large'>{text}</p>
      </div>
    </div>
  );
};
