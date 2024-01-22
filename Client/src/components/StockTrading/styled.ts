import styled from 'styled-components';
import { Colors, StyledCommonflexCenter } from '../../style/common.styled';
import { StockPriceProps } from '../../types/stock';
import { CellColorProps } from '../../types/stockTrading';

export const StockTradingTable = styled.table`
  width: 30%;

  td {
    width: 100px;
  }
`;

export const StyledTableCell = styled.td<CellColorProps>`
  color: ${(props) => (props.isNegative ? 'blue' : 'red')};
`;

export const TradingBtnContainer = styled.div`
  ${StyledCommonflexCenter}
  width: 30%;
  gap: 20px;
`;

export const TradingBtn = styled.button<CellColorProps>`
  width: 100px;
  height: 40px;
  border: transparent;
  font-family: var(--font-nanumfontEB);
  font-size: 16px;
  border-radius: 5px;
  color: white;
  background-color: ${(props) =>
    props.isNegative ? Colors.blue : Colors.gray};

  &:hover {
    color: ${(props) => (props.isNegative ? Colors.blue : Colors.gray)};
    background-color: transparent;

    border: 1px solid
      ${(props) => (props.isNegative ? Colors.blue : Colors.gray)};
  }
`;

export const QuantityBtn = styled.button`
  border: transparent;
`;

export const StockTradingContainer = styled.div`
  font-size: 14px;
  text-align: right;
  margin-top: 20px;
  font-family: var(--font-nanumfont);
`;

export const StockInPossessionText = styled.div`
  font-size: 14px;
  margin-top: 5px;
  font-family: var(--font-nanumfontEB);
`;

export const StockTradingListContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-size: 17px;
  font-family: var(--font-nanumfontB);
`;

export const LimitPrice = styled.span<StockPriceProps>`
  font-size: 15px;
  font-family: var(--font-nanumfont);
  margin: 7px 0;
  color: ${(props) => (props.isLower ? 'blue' : 'red')};
`;
