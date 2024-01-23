import { Colors, StyledCommonflexCenter } from './../../style/common.styled';
import styled from 'styled-components';
import { ReactComponent as DeleteBtnImg } from '../../assets/icons/btn-close-gray.svg';
import { ReactComponent as UpArrowIconImg } from '../../assets/icons/icon_up.svg';
import { ReactComponent as DownArrowIconImg } from '../../assets/icons/icon_down.svg';
import {
  FontSize,
  StockDetailTabButtonProps,
  StockPriceProps,
} from '../../types/stock';
import { CellColorProps } from '../../types/stockTrading';
export const StockTableContainer = styled.div`
  width: 100%;
  display: flex;
  margin-left: 20%;

  .stock-table {
    margin-top: 5%;
    width: 100%;
    font-family: var(--font-nanumfont);
    border-collapse: collapse;
    font-size: 15px;
    text-align: center;
  }

  .stock-table th {
    font-family: var(--font-nanumfontEB);
  }

  .stock-table td:nth-child(1) {
    font-family: var(--font-nanumfontB);
  }

  .stock-table td,
  .stock-table th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  .stock-table tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }

  .stock-table tr:hover {
    background-color: #f0f0f0;
  }

  .stock-table th {
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #45bda9;
    color: #fff;
  }

  .stock-table tr {
    cursor: pointer;
  }

  .stock-table thead {
    font-size: 20px;
  }
`;

export const Container = styled.div`
  ${StyledCommonflexCenter}
  width: 40%;
  flex-flow: column;
`;

export const RecentListContainer = styled.div`
  ${StyledCommonflexCenter}
  flex-flow: column;
  width: 30%;
  font-family: var(--font-nanumfont);
  font-size: 13px;
`;

export const StockContainer = styled.div`
  ${StyledCommonflexCenter}
  width: 150px;
  border: 1px solid #bfc2cb;
  flex-flow: column;
`;

export const StockNameContainer = styled.div`
  ${StyledCommonflexCenter}
  width: 100%;
`;

export const DeleteButton = styled.button`
  border: transparent;
  background-color: transparent;
  cursor: pointer;
`;

export const DeleteBtn = styled(DeleteBtnImg)`
  width: 16px;
  height: 16px;
  padding-bottom: 4px;
`;

export const StockPrice = styled.span<StockPriceProps>`
  color: ${(props) => (props.isLower ? 'blue' : 'red')};
`;

export const StockPriceCenterWide = styled.span<StockPriceProps>`
  width: 250px;
  color: ${(props) => (props.isLower ? 'blue' : 'red')};
  text-align: center;
`;

export const DownArrowIcon = styled(DownArrowIconImg)`
  width: 12px;
  height: 10px;
  margin-left: 3px;
  padding-bottom: 3px;
`;

export const UpArrowIcon = styled(UpArrowIconImg)`
  width: 12px;
  height: 10px;
  margin-left: 3px;
  padding-bottom: 3px;
`;

export const TabSubContainer = styled.div`
  flex-flow: column wrap;
  ${StyledCommonflexCenter}
  width: 100%;
`;

export const TabContainer = styled.div`
  flex-flow: row wrap;
  ${StyledCommonflexCenter}
  width: 100%;
`;

export const TabButton = styled.button<StockDetailTabButtonProps>`
  height: 50px;
  background-color: transparent;
  border: transparent;
  font-family: var(--font-nanumfont);
  font-size: 16px;
  font-weight: 700;
  color: ${(props) => (props.isActive ? 'black' : 'gray')};
  border-bottom: ${(props) => (props.isActive ? '2px solid gray' : 'none')};

  &:hover,
  &:active {
    color: black;
    border-bottom: 2px solid gray;
  }
`;

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

export const StockPossessionDetailContainer = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 350px;
`;

export const ReturnStockContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-end;
`;

export const SeeMoreLine = styled.div`
  position: relative;
  width: 350px;
  height: 2px;
  background-color: black;
  margin: 0 auto;
  top: 21px;
`;

export const BoundaryLine = styled.div`
  width: 350px;
  height: 1px;
  background-color: ${Colors.deepGray};
  margin: 10px 0;
`;

export const SeeMoreText = styled.div`
  cursor: pointer;
  font-family: var(--font-nanumfontB);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 5px;
  z-index: 2;
  margin-top: 20px;
`;

export const TraidngHistoryTitle = styled.span`
  width: 350px;
  font-size: 20px;
  font-family: var(--font-nanumfontB);
  text-align: center;
`;

export const TraidngHistorySubTitle = styled.span`
  width: 350px;
  font-size: 10px;
  font-family: var(--font-nanumfontB);
  text-align: center;
  margin-bottom: 8px;
  color: ${Colors.gray};
`;

export const WateringCalculator = styled.button`
  width: 85px;
  height: 35px;
  border: transparent;
  font-family: var(--font-nanumfontEB);
  font-size: 12px;
  border-radius: 5px;
  color: ${Colors.white};
  background-color: ${Colors.gray};
  margin: 8px 0 0 76%;

  &:hover {
    color: ${Colors.gray};
    background-color: transparent;
    border: 1px solid ${Colors.gray};
  }
`;

export const QuantityInput = styled.input`
  width: ${(props) => props.width}px;
  border: transparent;
  outline: transparent;
`;

export const WateringPopUpMent = styled.p<FontSize>`
  font-size: ${(props) => props.fontSize};
  font-family: var(--font-nanumfontB);
  margin: 0 0 -3px 0;
  padding-left: 10px;

  span {
    color: ${Colors.deepGray};
    font-size: 15px;
  }
`;
export const EstimatedPriceContainer = styled.div`
  width: 100%;
  background-color: ${Colors.lightGray};
  ${StyledCommonflexCenter}
  justify-content: space-evenly;
  margin: 12px auto 0px auto;
  padding: 10px;
  border-radius: 10px;
  font-family: var(--font-nanumfont);
`;

export const EstimatedPriceSubContainer = styled.div`
  ${StyledCommonflexCenter}
  flex-flow: column wrap;

  p {
    margin: 2px 0;
  }

  p:nth-child(1) {
    font-size: 13px;
    color: black;
  }
  p:nth-child(3) {
    color: ${Colors.vDeepGray};
    font-family: var(--font-nanumfontB);
  }
`;

export const EstimatedPrice = styled.p<StockPriceProps>`
  color: ${(props) => (props.isLower ? 'blue' : 'red')};
  font-family: var(--font-nanumfontB);
`;
