import { useParams } from 'react-router-dom';
import { useStockPossessionDetailsData } from '../../hooks/useStockPossessionDetailsData';
import { StockDetailParams, StockName } from '../../types/stock';
import { StockPossessionContent, StockPossessionTitle } from '../MyInfo/styled';
import { SeeMoreButton } from './SeeMoreButton';
import {
  ReturnStockContainer,
  StockPossessionDetailContainer,
  StockPrice,
} from './styled';
import { WateringCalculatorButton } from '../StockTrading/WateringCalculatorButton';

export function MyStockDetailInfos() {
  const { stockName } = useParams<StockDetailParams>();
  const {
    stockInPossessionList,
    averageStockPrice,
    returnPrice,
    returnPercentage,
    currentTotalPrice,
    quantity,
  } = useStockPossessionDetailsData(stockName as StockName);

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

      <StockPossessionDetailContainer>
        <WateringCalculatorButton />
      </StockPossessionDetailContainer>
      <SeeMoreButton></SeeMoreButton>
    </>
  ) : (
    <span>보유중인 주식이 없습니다.</span>
  );
}

// to do list
// 1. Navbar를 투명하게 만들고 Myinfo나 로그아웃 버튼을 좀 다르게 배치하기
// 2. 조건 주문 기능 추가하기
// 3. 차트 1일, 7일, 30일 차트로 구분해서 볼 수 있게끔 하기
