import React, {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import SearchBar from '../components/Home/SearchBar';
import SuggestionList from '../components/Home/SuggestionList';
import useDebounce from '../hooks/useDebounce';
import styled from 'styled-components';
import { getSick } from '../lib/apis/sick';
import { SickDataType } from '../types/sick';
import { getCacheData, setCacheData } from '../lib/utils/cache';

const DEFAULT_SELECTED_INDEX = -1;
const DEFAULT_DEBOUNCE_DELAY = 300;

function Home() {
  const [keyword, setKeyword] = useState('');
  const [tempKeyword, setTempKeyword] = useState('');
  const [sicks, setSicks] = useState<SickDataType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(DEFAULT_SELECTED_INDEX);
  const [isShowSuggestion, setIsShowSuggestion] = useState(true);
  const inputElement = useRef<HTMLInputElement>(null);
  const keywordParam = useDebounce(keyword, DEFAULT_DEBOUNCE_DELAY);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  useEffect(() => {
    setSelectedIndex(-1);
    setTempKeyword('');
    if (!keywordParam) {
      setSicks([]);
      return;
    }

    if (getCacheData(keywordParam)) {
      setSicks(getCacheData(keywordParam) as SickDataType[]);
      return;
    }

    console.info('calling api');
    getSick({ keyword: keywordParam })
      .then((res) => {
        setSicks(res.data);
        setCacheData(keywordParam, res.data);
      })
      .catch((e) => {
        console.info(e);
      });
  }, [keywordParam]);

  const handleChangeKeywordInput = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setTempKeyword(e.target.value);
    setIsShowSuggestion(true);
  };

  const handleSubmitSearchBar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsShowSuggestion(false);
    if (!isShowSuggestion) {
      alert(`${sicks[selectedIndex].sickNm} 검색이동`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (sicks.length === 0) return;
    const allowKeys = ['ArrowDown', 'ArrowUp'];
    if (e.key === allowKeys[0]) {
      if (selectedIndex === sicks.length - 1) {
        setSelectedIndex(0);
        setTempKeyword(sicks[0].sickNm);
        return;
      }
      setSelectedIndex(selectedIndex + 1);
      setTempKeyword(sicks[selectedIndex + 1].sickNm);
      setIsShowSuggestion(true);
      return;
    }
    if (e.key === allowKeys[1]) {
      if (selectedIndex === 0) {
        setSelectedIndex(sicks.length - 1);
        setTempKeyword(sicks[sicks.length - 1].sickNm);
        return;
      }
      setSelectedIndex(selectedIndex - 1);
      setTempKeyword(sicks[selectedIndex - 1].sickNm);
      setIsShowSuggestion(true);
    }
  };

  const handleClickListItem = (listIndex: number) => {
    setSelectedIndex(listIndex);
    setTempKeyword(sicks[listIndex].sickNm);
    setIsShowSuggestion(false);
  };

  const handleBlurInput = (e: FocusEvent<HTMLInputElement>) => {
    setIsShowSuggestion(false);
  }

  return (
    <HomeWrapper>
      <div>
        <Title>국내 모든 임상시험 검색하고 온라인으로 참여하기</Title>
        <SearchBar
          keyword={tempKeyword ? tempKeyword : keyword}
          inputRef={inputElement}
          onChange={handleChangeKeywordInput}
          onSubmit={handleSubmitSearchBar}
          onKeyDown={handleKeyDown}
          onBlur={handleBlurInput}
        />
        {keywordParam && isShowSuggestion && (
          <SuggestionList
            sicks={sicks}
            keyword={keywordParam}
            selectedIndex={selectedIndex}
            onClick={handleClickListItem}
          />
        )}
      </div>
    </HomeWrapper>
  );
}

export default Home;

const HomeWrapper = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 500px;
    bottom: 250px;
  }
`;
const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.4;
  width: 70%;
`;
