import React from 'react';
import { MultipleFieldErrors } from 'react-hook-form';
import styled from 'styled-components';

import { ElementColors } from '../login/styled';

const Paragraph = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: ${(props) => props.color};
  mix-blend-mode: normal;
`;
const Highlight = styled.span`
  color: ${ElementColors.errorHintText};
`;

export const HighlightError = ({
  title,
  search,
  color,
}: {
  color: boolean;
  title: string;
  search: MultipleFieldErrors | undefined;
}) => {
  const checkColor = (colorName: boolean) => (colorName ? ElementColors.errorHintText : ElementColors.hintText);

  if (search) {
    if (search.required) {
      return (
        <Paragraph color={checkColor(color)} data-test-id='hint'>
          <Highlight>{title}</Highlight>
        </Paragraph>
      );
    }
    const errors = Object.values(search).flat() as string[];
    const titleArr = title.split(errors[0]);

    if (errors.length > 1) {
      titleArr
        .pop()
        ?.split(errors[1])
        .forEach((x) => titleArr.push(x));
    }
    if (errors.length > 2) {
      titleArr
        .pop()
        ?.split(errors[2])
        .forEach((x) => titleArr.push(x));
    }

    return (
      <Paragraph color={checkColor(color)} data-test-id='hint'>
        {titleArr.map((elem, index) => {
          if (errors.length > 0) {
            if (index === 0) {
              return (
                <React.Fragment key={`${elem + index}`}>
                  <span>{elem}</span>
                  <Highlight>{errors[0]}</Highlight>
                </React.Fragment>
              );
            }
          }
          if (errors.length > 1) {
            if (index === 1) {
              return (
                <React.Fragment key={`${elem + index}`}>
                  <span>{elem}</span>
                  <Highlight>{errors[1]}</Highlight>
                </React.Fragment>
              );
            }
          }
          if (errors.length > 2) {
            if (index === 2) {
              return (
                <React.Fragment key={`${elem + index}`}>
                  <span>{elem}</span>
                  <Highlight>{errors[2]}</Highlight>
                </React.Fragment>
              );
            }
          }

          return <span key={elem}>{elem}</span>;
        })}
      </Paragraph>
    );
  }

  return (
    <Paragraph color={checkColor(color)} data-test-id='hint'>
      {title}
    </Paragraph>
  );
};
