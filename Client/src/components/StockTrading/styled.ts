import styled from 'styled-components';
import { Colors, StyledCommonflexCenter } from '../../style/common.styled';
import { CellColorProps } from '../../types/stock';

export const StockTradingTable = styled.table`
  width: 30%;
`;

export const StyledTableCell = styled.td<CellColorProps>`
  color: ${(props) => (props.isNegative ? 'blue' : 'red')};
`;

export const TodayLimitPrice = styled.p`
  font-size: 11px;
  margin-bottom: 0.3rem;
  width: 100%;
  text-align: right;
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

export const StockBuyContainer = styled.div`
  font-size: 14px;
  text-align: right;
  margin-top: 20px;
  font-family: var(--font-nanumfont);
`;
