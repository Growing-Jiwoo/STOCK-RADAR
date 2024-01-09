import styled from 'styled-components';

export const StockListContainer = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 45vw;
  min-width: 480px;
  height: 100px;
  gap: 20px;
`;

export const StockName = styled.span`
  width: 200px;
  font-family: var(--font-nanumfontB);
  font-size: 16px;
  text-align: center;
`;
