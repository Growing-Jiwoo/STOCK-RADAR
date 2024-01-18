import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStockPossessionDetailsData } from '../../hooks/useStockPossessionDetailsData';
import { useGetStockTradingHistory } from '../../services/stockTrading';
import { StockDetailParams, StockName } from '../../types/stock';
import {
  StockPossessionTitle,
  StockPossessionContent,
  StockPossessionStatus,
} from '../MyInfo/styled';
import {
  StockPossessionDetailContainer,
  ReturnStockContainer,
  BoundaryLine,
  TraidngHistoryTitle,
  TraidngHistorySubTitle,
  SeeMoreText,
  SeeMoreLine,
} from './styled';

export function SeeMoreButton() {
  const { stockName } = useParams<StockDetailParams>();
  const { purchasePrice } = useStockPossessionDetailsData(
    stockName as StockName
  );
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMent, setIsVisibleMent] = useState('자세히 보기');

  const historyList = useGetStockTradingHistory(stockName as StockName)?.slice(
    -5
  );

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    isVisible ? setIsVisibleMent('자세히 보기') : setIsVisibleMent('숨기기');
  };

  return (
    <>
      {isVisible && (
        <>
          <StockPossessionDetailContainer>
            <StockPossessionTitle fontSize="19px">
              투자 원금
            </StockPossessionTitle>
            <ReturnStockContainer>
              <StockPossessionContent fontSize="16px">
                ${purchasePrice}
              </StockPossessionContent>
            </ReturnStockContainer>
          </StockPossessionDetailContainer>

          <BoundaryLine />

          <StockPossessionDetailContainer>
            <TraidngHistoryTitle>주식 거래 내역</TraidngHistoryTitle>
            <TraidngHistorySubTitle>
              (거래 내역은 최근 5건만 조회됩니다.)
            </TraidngHistorySubTitle>
          </StockPossessionDetailContainer>
          {historyList?.map((historyItem, index) => {
            const formattedDate = historyItem.purchase_date.slice(5);

            return (
              <StockPossessionDetailContainer key={index}>
                <StockPossessionTitle fontSize="15px">
                  <StockPossessionTitle fontSize="15px">
                    {formattedDate}{' '}
                    <StockPossessionStatus status={historyItem.status}>
                      {historyItem.quantity}주{' '}
                      {historyItem.status === 0 ? '구매' : '판매'}
                    </StockPossessionStatus>
                  </StockPossessionTitle>
                </StockPossessionTitle>
                <ReturnStockContainer>
                  <StockPossessionContent fontSize="12px">
                    1주당 ${historyItem.stock_price_per_unit}
                  </StockPossessionContent>
                </ReturnStockContainer>
              </StockPossessionDetailContainer>
            );
          })}
        </>
      )}
      <div>
        <SeeMoreText onClick={toggleVisibility}>{isVisibleMent}</SeeMoreText>
        <SeeMoreLine />
      </div>
    </>
  );
}
