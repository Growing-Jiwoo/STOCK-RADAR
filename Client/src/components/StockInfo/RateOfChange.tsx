import { useSetRecoilState, useRecoilValue } from 'recoil';
import { currentPriceState } from '../../recoil/stockInfo/atoms';
import { StockPrice, DownArrowIcon, UpArrowIcon } from './styled';
import { useEffect } from 'react';
import { stockPriceSelector } from '../../recoil/stockInfo/selectors';

type KeysProps = {
  keys: string;
};

export function RateOfChange(keys: KeysProps) {
  const setCurrentPriceState = useSetRecoilState(currentPriceState);
  const stockName: string = keys.keys;
  const getStockPrice = useRecoilValue(stockPriceSelector);
  const stockPriceData = getStockPrice(stockName);

  useEffect(() => {
    if (stockPriceData.length > 0) {
      setCurrentPriceState(stockPriceData[0].currentPrice);
    }
  }, [keys, setCurrentPriceState, stockPriceData]);

  return (
    <>
      {stockPriceData.map((stock, index) => (
        <StockPrice key={index} isLower={stock.isLower}>
          ${stock.currentPrice} / {stock.rateOfChange}%
          {stock.isLower ? <DownArrowIcon /> : <UpArrowIcon />}
        </StockPrice>
      ))}
    </>
  );
}
