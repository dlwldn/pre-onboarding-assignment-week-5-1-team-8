import React, { ChangeEvent, FocusEvent, FormEvent, KeyboardEvent, RefObject } from 'react';
import styled from 'styled-components';
import color from '../../styles/color';
import { FiSearch } from 'react-icons/fi';

interface Prop {
  keyword: string;
  inputRef: RefObject<HTMLInputElement>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

function SearchBar({ keyword, inputRef, onChange, onSubmit, onKeyDown, onBlur }: Prop) {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        placeholder="질환명을 입력해주세요."
        value={keyword}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
        ref={inputRef}
      />
      <Button type="submit">
        <FiSearch />
      </Button>
    </Form>
  );
}

export default SearchBar;

const Form = styled.form`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: ${color.white};
`;
const Input = styled.input`
  all: unset;
  width: 100%;
  padding: 0 50px 0 20px;
  border: none;
  font-size: 20px;
`;
const Button = styled.button`
  border: none;
  width: 60px;
  height: 50px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background: ${color.blue1};
  transition: 0.3s;

  > svg {
    font-size: 25px;
    color: ${color.white};
  }

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
