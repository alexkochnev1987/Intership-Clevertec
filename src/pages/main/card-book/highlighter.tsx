import React from 'react';
import styled from 'styled-components';

const Paragraph = styled.p``;
const Highlight = styled.span`
  color: rgb(255, 82, 83);
`;

export const Highlighter = ({ title, search, view }: { title: string; search: string; view: boolean }) => {
  const regexp = new RegExp(search, 'ig');
  const matchValue = title.match(regexp);

  if (search) {
    return (
      <Paragraph className={view ? 'subtitle-small hide__text-overflow' : 'h5 card__content-text'}>
        {title.split(regexp).map((elem, index, arr) => {
          if (index < arr.length - 1) {
            const c = matchValue?.shift();

            return (
              <React.Fragment>
                {elem}
                <Highlight data-test-id='highlight-matches' key={`${elem + index}`}>
                  {c}
                </Highlight>
              </React.Fragment>
            );
          }

          return elem;
        })}
      </Paragraph>
    );
  }

  return (
    <Paragraph className={view ? 'subtitle-small hide__text-overflow' : 'h5 card__content-text'}>{title}</Paragraph>
  );
};
