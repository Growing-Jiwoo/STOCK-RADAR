import styled from 'styled-components';
import { Colors } from '../../style/common.styled';
import { FontSize } from '../../types/stock';

interface StockPossessionStatus {
  status: number;
}

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

export const StockPossessionTitle = styled.span<FontSize>`
  width: 200px;
  font-family: var(--font-nanumfontB);
  font-size: ${(props) => props.fontSize};
  text-align: center;
`;

export const StockPossessionStatus = styled.span<StockPossessionStatus>`
  width: 200px;
  font-family: var(--font-nanumfontB);
  color: ${(props) =>
    props.status === 0 ? Colors.vDeepGray : Colors.pastelBlue};
  font-size: 15px;
  text-align: left;
  margin-left: 5px;
`;

export const StockPossessionContent = styled.span<FontSize>`
  font-size: ${(props) => props.fontSize};
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

export const StockTableContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column wrap;
  align-items: center;
  font-family: var(--font-nanumfont);

  .stock-table {
    margin-top: 10px;
    width: 40%;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
  }

  .stock-table td,
  .stock-table th {
    border: transparent;
    vertical-align: top;
    text-align: center;
  }

  .stock-table th {
    text-align: left;
    color: #fff;
  }
`;

export const StockTraindingHistoryStatus = styled.p<StockPossessionStatus>`
  font-family: var(--font-nanumfontB);
  color: ${(props) =>
    props.status === 0 ? Colors.vDeepGray : Colors.pastelBlue};
  font-size: 10px;
  text-align: center;
`;

export const PaginationContainer = styled.div`
  .page-link {
    font-size: 12px;
  }
`;
