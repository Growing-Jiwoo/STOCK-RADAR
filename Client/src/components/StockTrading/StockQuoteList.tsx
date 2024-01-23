import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { StockDetailParams, StockName } from '../../types/stock';
import { StockTradingListType } from '../../types/stockTrading';
import { StockPriceCenterWide } from '../StockInfo/styled';
import { StockTradingListContainer, LimitPrice } from './styled';

interface StockPriceRendererProps {
  multiplier: number;
  isReversed: boolean;
  rateOfChange: number;
  currentPrice: number;
}

function StockPriceRenderer({
  multiplier,
  isReversed,
  rateOfChange,
  currentPrice,
}: StockPriceRendererProps) {
  const renderStockPrice = (index: number) => {
    const accumulatedCurrentPrice =
      currentPrice + index * multiplier * currentPrice;
    const accumulatedRate = rateOfChange + index * (multiplier * 10);

    return (
      <StockPriceCenterWide key={index} isLower={accumulatedRate <= 0}>
        ${accumulatedCurrentPrice.toFixed(2)} / {accumulatedRate.toFixed(2)}%
      </StockPriceCenterWide>
    );
  };

  const renderStockPrices = () =>
    Array.from({ length: 6 }, (_, index) =>
      renderStockPrice(isReversed ? 6 - index : index + 1)
    );

  return <>{renderStockPrices()}</>;
}

function StockQuoteList() {
  const { stockName } = useParams<StockDetailParams>();
  const stockData: StockTradingListType =
    useRecoilValue(selectedStockDataState(stockName as StockName)) ||
    ({} as StockTradingListType);
  const rateOfChange: number = stockData.rate_of_change;
  const currentPrice: number = stockData.current_price;
  const openningPrice: number = stockData.start_price;
  const todayUpperLimit: number = +(
    openningPrice +
    openningPrice * 0.3
  ).toFixed(2);
  const todayLowerLimit: number = +(
    openningPrice +
    openningPrice * -0.3
  ).toFixed(2);

  return (
    <StockTradingListContainer>
      <LimitPrice isLower={false}>
        상한가 ${todayUpperLimit} / 30.00%
      </LimitPrice>
      <StockPriceRenderer
        multiplier={0.05}
        isReversed
        rateOfChange={rateOfChange}
        currentPrice={currentPrice}
      />

      <StockPriceCenterWide isLower={rateOfChange <= 0}>
        ${currentPrice.toFixed(2)} / {rateOfChange.toFixed(2)}% - 현재 주가
      </StockPriceCenterWide>

      <StockPriceRenderer
        multiplier={-0.05}
        isReversed={false}
        rateOfChange={rateOfChange}
        currentPrice={currentPrice}
      />
      <LimitPrice isLower={true}>
        하한가 ${todayLowerLimit} / -30.00%
      </LimitPrice>
    </StockTradingListContainer>
  );
}

export default StockQuoteList;
