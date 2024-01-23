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
