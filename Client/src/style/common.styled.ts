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
