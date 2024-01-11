import styled from 'styled-components';
import { Colors } from '../../style/common.styled';

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
export const MyInfoTitleContainer = styled.div``;

export const MyInfoTitle = styled.span`
  font-family: var(--font-nanumfontEB);
  font-size: 25px;
`;

export const MyInfoSubTitle = styled.span`
  font-family: var(--font-nanumfontB);
  font-size: 18px;
`;

export const StockPrincipal = styled.p`
  font-family: var(--font-nanumfont);
  font-size: 13px;
  color: ${Colors.deepGray};
`;

export const MyInfoButton = styled.button`
  font-family: var(--font-nanumfontB);
  width: 23vw;
  min-width: 210px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  padding: 0px 12px;
  margin-bottom: 15px;
  align-items: center;
  background-color: transparent;

  &:hover {
    background-color: ${Colors.gray};
  }
`;
