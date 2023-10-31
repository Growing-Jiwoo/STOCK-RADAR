import styled from 'styled-components';

export const StyledCommonContainer = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  height: 70%;
  width: 100%;
  border: 1px soild black;
`;

export const StyledCommonInput = styled.input`
  outline: none;
  border: none;
  width: 70%;
  height: 50px;
  border-radius: 10px;
  margin-bottom: 50px;
`;

export const StyledCommonTitle = styled.h2`
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 20px;
`;

export const StyledCommonFormContainer = styled.form`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

export const StyledCommonButton = styled.button`
  border: 1px solid black;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  height: 50px;
`;

export const StyledCommonflexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Colors = {
  lightBlue: '#e9eeff',
  grayBlue: '#a4aebf',
  blue: '#406bf8',
  pastelBlue: '#3497fd',
  black: '#141414',
  green: '#05e1aa',
  purple: '#c840e9',
  yellow: '#ffcc00',
  gray: '#c4c4c4',
  lightGray: '#e5e5eb',
  deepGray: '#90909e',
  vDeepGray: '#2b2b2b',
  white: '#fff',
};
