import React from 'react';
import styled from 'styled-components';
import color from '../../styles/color';
import { SickDataType } from '../../types/sick';
import SuggestionListItem from './SuggestionListItem';

interface Prop {
  sicks: SickDataType[];
  keyword: string;
  selectedIndex: number;
  onClick: (listIndex: number) => void;
}

function SuggestionList({ sicks, keyword, selectedIndex, onClick }: Prop) {
  return (
    <ListWrapper>
      <RecommendText>추천검색어</RecommendText>
      {sicks.length === 0 && <li>검색어 없음</li>}
      {sicks.map((sick, sickIndex) => {
        return (
          <SuggestionListItem
            key={sick.sickCd}
            sick={sick}
            sickIndex={sickIndex}
            keyword={keyword}
            selectedIndex={selectedIndex}
            onClick={onClick}
          />
        );
      })}
    </ListWrapper>
  );
}

export default SuggestionList;

const ListWrapper = styled.ul`
  width: 100%;
  padding: 20px;
  overflow: auto;
  position: absolute;
  top: 175px;
  left: 0;
  border-radius: 30px;
  box-shadow: 0px 5px 10px ${color.gray1};
  background: ${color.white};
`;
const RecommendText = styled.li`
  color: ${color.gray1};
  margin-bottom: 10px;
`;
