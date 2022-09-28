import React from 'react';
import styled from 'styled-components';
import { SickDataType } from '../../types/sick';

interface Props {
  sick: SickDataType;
  sickIndex: number;
  keyword: string;
  selectedIndex: number;
  onClick: (listIndex: number) => void;
}

function SuggestionListItem({
  sick,
  sickIndex,
  keyword,
  selectedIndex,
  onClick,
}: Props) {
  const highlightedText = (text: string, keyword: string) => {
    const upperCaseText = text.toUpperCase();
    const upperCaseKeyword = keyword.toUpperCase();
    if (keyword && upperCaseText.includes(upperCaseKeyword)) {
      const texts = upperCaseText.split(
        new RegExp(`(${upperCaseKeyword})`, 'gi')
      );

      return (
        <>
          {texts.map((text, index) => {
            const upperCaseText = text.toUpperCase();
            return upperCaseText === upperCaseKeyword ? (
              <HighLightText key={index}>{text}</HighLightText>
            ) : (
              text
            );
          })}
        </>
      );
    }

    return text;
  };

  return (
    <ListItemWrapper
      isActive={selectedIndex === sickIndex}
      onClick={() => onClick(sickIndex)}
    >
      {highlightedText(sick.sickNm, keyword)}
    </ListItemWrapper>
  );
}

export default SuggestionListItem;

const ListItemWrapper = styled.li<{ isActive: boolean }>`
  background: ${({ isActive }) => isActive && 'skyblue'};
  display: flex;
  align-items: center;
  padding: 10px;
  height: 40px;

  :hover {
    cursor: pointer;
    background: skyblue;
  }
`;
const HighLightText = styled.strong`
  font-weight: 700;
`;
