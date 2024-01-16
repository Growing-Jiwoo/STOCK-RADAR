import { useState } from 'react';
import { useStockPossessionTotalData } from '../../hooks/useStockPossessionTotalData';
import { DownArrowIcon, StockPrice, UpArrowIcon } from '../StockInfo/styled';
import { MyPossessionStockList } from './MyPossessionStockList';
import { MyStockTradingHistory } from './MyStockTradingHistory';
import {
  MyInfoButton,
  MyInfoSubTitle,
  MyInfoTitle,
  MyInfoTitleContainer,
  StockPrincipal,
} from './styled';

export function MyStockInPossession(): JSX.Element {
  const { totalCurrentPrice, possessionStockTotalPrice, percentageDifference } =
    useStockPossessionTotalData();

  const [showStockList, setShowStockList] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleStockListClick = () => {
    setShowStockList(!showStockList);
    setShowOrderHistory(false);
  };

  const handleOrderHistoryClick = () => {
    setShowOrderHistory(!showOrderHistory);
    setShowStockList(false);
  };

  return (
    <>
      {!showStockList && !showOrderHistory && (
        <MyInfoTitleContainer>
          <MyInfoTitle>총 수익</MyInfoTitle>
          <br />
          <MyInfoSubTitle>
            ${totalCurrentPrice} /{' '}
            <StockPrice isLower={+percentageDifference <= 0}>
              {percentageDifference}%
              {+percentageDifference <= 0 ? <DownArrowIcon /> : <UpArrowIcon />}
            </StockPrice>
          </MyInfoSubTitle>
          <StockPrincipal>원금: ${possessionStockTotalPrice}</StockPrincipal>
        </MyInfoTitleContainer>
      )}
      <MyInfoButton onClick={handleOrderHistoryClick}>
        {showOrderHistory ? (
          '처음으로'
        ) : (
          <>
            <span>주문 내역</span>
            <span>{'>'}</span>
          </>
        )}
      </MyInfoButton>

      <MyInfoButton onClick={handleStockListClick}>
        {showStockList ? (
          '처음으로'
        ) : (
          <>
            <span>보유 주식</span>
            <span>{'>'}</span>
          </>
        )}
      </MyInfoButton>
      {showStockList && <MyPossessionStockList />}
      {showOrderHistory && <MyStockTradingHistory />}
    </>
  );
}
