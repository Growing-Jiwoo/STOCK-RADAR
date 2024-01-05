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
