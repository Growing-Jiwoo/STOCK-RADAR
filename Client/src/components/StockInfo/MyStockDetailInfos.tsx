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
import { WateringCalculatorButton } from './WateringCalculatorButton';

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
// 1. 자세히 보기 누르면 투자 원금, 해당 주식에 대한 거래 히스토리(기존 hook 활용) 등등 세부 정보 출력 (완)
// 2. 물타기 계산기 생성 (진행중)
// 3. django 통해서 특정 주식에 대한 히스토리만 불러올 수 있도록 하게끔 api 수정 (완) -> api 호출 부분 수정해야함 (완)
// 4. 보유중인 주식에 대한 hook들 이름 바꾸고 세부 정보 보는 커스텀 훅 생성 (useStockPossessionDetails, useStockDetailInfos)
// -> 새로 만드는 커스텀 훅은 stockName을 매개변수로 받아야 함 (완))
// 5. Navbar를 투명하게 만들고 Myinfo나 로그아웃 버튼을 좀 다르게 배치하기
