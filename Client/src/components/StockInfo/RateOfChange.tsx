import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  currentPriceState,
  stockDataState,
} from '../../recoil/stockInfo/atoms';
import { StockPrice, DownArrowIcon, UpArrowIcon } from './styled';
import { useEffect } from 'react';

type KeysProps = {
  keys: string;
};

export function RateOfChange(keys: KeysProps) {
  const [recoilStockData] = useRecoilState(stockDataState);
  const setCurrentPriceState = useSetRecoilState(currentPriceState);

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
    </>
  );
}
