import styled from 'styled-components';

export const StockListContainer = styled.div`
  font-family: var(--font-nanumfont);
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40vw;
  min-width: 550px;
  height: 100px;
`;

export const StockPossessionContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column wrap;
`;

export const StockPossessionTitle = styled.span`
  width: 200px;
  font-family: var(--font-nanumfontB);
  font-size: 15px;
  text-align: center;
`;

export const StockPossessionContent = styled.span`
  font-size: 12px;
`;
