import { Link } from 'react-router-dom';

import { ReactComponent as GoTo } from '../../../../assets/img/go-to.svg';
import { SubmitButtonForm } from '../../../../constants/authorisation-constants';

import { ContentLink, ContentQuestion, SubmitButton, SubmitContentWrapper, SubmitWrapper } from './styled';

export const SubmitButtonForForm = ({ button, question, link, linkName, isValid }: SubmitButtonForm) => (
  <SubmitWrapper>
    <SubmitButton type='submit' disabled={!isValid}>
      {button}
    </SubmitButton>
    <SubmitContentWrapper>
      <ContentQuestion>{question}</ContentQuestion>
      {link && (
        <Link to={link}>
          <ContentLink>
            {linkName}
            <GoTo width='18px' height='12px' />
          </ContentLink>
        </Link>
      )}
    </SubmitContentWrapper>
  </SubmitWrapper>
);
