import { useState } from 'react';
import { useStockDetails } from '../../hooks/useStockDetailInfos';
import { DownArrowIcon, StockPrice, UpArrowIcon } from '../StockInfo/styled';
import { MyPossessionStockList } from './MyPossessionStockList';
import { MyStockTradingHistory } from './MyStockTradingHistory';
export function MyStockInPossession(): JSX.Element {
  const {
    totalCurrentPrice,
    possessionStockTotalPrice,
    stockPriceDifference,
    percentageDifference,
  } = useStockDetails();

  const [showStockList, setShowStockList] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleStockListClick = () => {
    setShowStockList(!showStockList);
  };

  return (
    <>
      <div onClick={handleStockListClick}>
        {showStockList
          ? '돌아가기'
          : '소유한 주식 (클릭하여 소유한 주식 목록 보기)'}
      </div>
      {showStockList && <MyPossessionStockList />}

      {!showStockList && (
        <>
          <div>총 주식 구매 금액: ${possessionStockTotalPrice}</div>
          <div>현재 보유 중인 주식 총 금액: ${totalCurrentPrice}</div>
          <div>주식 보유 수익: ${stockPriceDifference}</div>
          <div>
            총 현재 보유 중인 주식의 백분율:{' '}
            <StockPrice isLower={+percentageDifference <= 0}>
              {percentageDifference}%
              {+percentageDifference <= 0 ? <DownArrowIcon /> : <UpArrowIcon />}
            </StockPrice>
          </div>
          <div onClick={() => setShowOrderHistory(!showOrderHistory)}>
            주문 내역
          </div>
          {showOrderHistory && <MyStockTradingHistory />}
        </>
      )}
    </>
  );
}
