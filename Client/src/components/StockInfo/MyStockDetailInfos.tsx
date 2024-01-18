import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStockPossessionDetailsData } from '../../hooks/useStockPossessionDetailsData';
import { useGetStockTradingHistory } from '../../services/stockTrading';
import { StockDetailParams, StockName } from '../../types/stock';
import {
  StockPossessionContent,
  StockPossessionStatus,
  StockPossessionTitle,
} from '../MyInfo/styled';
import {
  BoundaryLine,
  ReturnStockContainer,
  SeeMoreLine,
  SeeMoreText,
  StockPossessionDetailContainer,
  StockPrice,
  TraidngHistorySubTitle,
  TraidngHistoryTitle,
} from './styled';

export function MyStockDetailInfos() {
  const { stockName } = useParams<StockDetailParams>();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleMent, setIsVisibleMent] = useState('자세히 보기');

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    isVisible ? setIsVisibleMent('자세히 보기') : setIsVisibleMent('숨기기');
  };
  const {
    stockInPossessionList,
    averageStockPrice,
    returnPrice,
    returnPercentage,
    currentTotalPrice,
    quantity,
    purchasePrice,
  } = useStockPossessionDetailsData(stockName as StockName);

  const historyList = useGetStockTradingHistory(stockName as StockName)?.slice(
    -5
  );

  return stockInPossessionList?.[0] ? (
    <>
      <StockPossessionDetailContainer>
        <StockPossessionTitle fontSize="19px">
          내 주식 평균
        </StockPossessionTitle>
        <StockPossessionContent fontSize="16px">
          ${averageStockPrice}
        </StockPossessionContent>
      </StockPossessionDetailContainer>

      <StockPossessionDetailContainer>
        <StockPossessionTitle fontSize="19px">보유 수량</StockPossessionTitle>
        <StockPossessionContent fontSize="16px">
          {quantity}주
        </StockPossessionContent>
      </StockPossessionDetailContainer>

      <StockPossessionDetailContainer>
        <StockPossessionTitle fontSize="19px">총 금액</StockPossessionTitle>
        <ReturnStockContainer>
          <StockPossessionContent fontSize="16px">
            ${currentTotalPrice}
          </StockPossessionContent>
          <StockPossessionContent fontSize="11px">
            <StockPrice isLower={returnPrice <= 0}>
              (${returnPrice} / {returnPercentage}%)
            </StockPrice>
          </StockPossessionContent>
        </ReturnStockContainer>
      </StockPossessionDetailContainer>

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
  ) : (
    <span>보유중인 주식이 없습니다.</span>
  );
}

// to do list
// 1. 자세히 보기 누르면 투자 원금, 해당 주식에 대한 거래 히스토리(기존 hook 활용) 등등 세부 정보 출력 (완)
// 2. 물타기 계산기 생성
// 3. django 통해서 특정 주식에 대한 히스토리만 불러올 수 있도록 하게끔 api 수정 (완) -> api 호출 부분 수정해야함 (완)
// 4. 보유중인 주식에 대한 hook들 이름 바꾸고 세부 정보 보는 커스텀 훅 생성 (useStockPossessionDetails, useStockDetailInfos)
// -> 새로 만드는 커스텀 훅은 stockName을 매개변수로 받아야 함
// 5. Navbar를 투명하게 만들고 Myinfo나 로그아웃 버튼을 좀 다르게 배치하기
