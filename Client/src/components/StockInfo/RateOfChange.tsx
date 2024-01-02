import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentPriceState,
  maxPriceState,
  minPriceState,
  stockDataState,
} from '../../recoil/stockInfo/atoms';
import {
  StockPrice,
  DownArrowIcon,
  UpArrowIcon,
  TodayLimitPrice,
} from './styled';
import { useEffect } from 'react';

type KeysProps = {
  keys: string;
};

export function RateOfChange(keys: KeysProps) {
  const [recoilStockData] = useRecoilState(stockDataState);
  const setCurrentPriceState = useSetRecoilState(currentPriceState);
  const minPriceData = useRecoilValue(minPriceState);
  const maxPriceData = useRecoilValue(maxPriceState);

  const getStockPrice = (key: string) => {
    const stockName = key;

    const selectedStock = recoilStockData.find(
      (stock) => stock.name === stockName
    );

    if (selectedStock) {
      const currentPrice = selectedStock.current_price;
      const startPrice = selectedStock.start_price;
      const rateOfChange = selectedStock.rate_of_change;

      return {
        currentPrice,
        isLower: currentPrice < startPrice,
        rateOfChange,
      };
    }

    return {
      currentPrice: 0,
      isLower: false,
      rateOfChange: 0,
    };
  };
  const stockPriceData = getStockPrice(keys.keys);

  useEffect(() => {
    setCurrentPriceState(stockPriceData.currentPrice);
  }, [keys, setCurrentPriceState]);

  return (
    <>
      <StockPrice isLower={stockPriceData.isLower}>
        ${stockPriceData.currentPrice} / {stockPriceData.rateOfChange}%
        {stockPriceData.isLower ? <DownArrowIcon /> : <UpArrowIcon />}
      </StockPrice>
      <TodayLimitPrice>오늘의 상한가 : {maxPriceData}</TodayLimitPrice>
      <TodayLimitPrice>오늘의 하한가 : {minPriceData}</TodayLimitPrice>
    </>
  );
}
