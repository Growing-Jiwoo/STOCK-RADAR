import { useQuery } from '@tanstack/react-query';
import { StockInformation, StockPriceHistory } from '../types/stock';
import { getStockInfo, getStockPriceHistory } from '../apis/stockinfo';
import { QUERY_KEYS } from '../utils/constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  stockDataState,
  stockPriceHistoryState,
} from '../recoil/stockInfo/atoms';

export const useStockData = () => {
  const [recoilStockData, setRecoilStockData] = useRecoilState(stockDataState);

  const { data: stockData } = useQuery<StockInformation[]>(
    [QUERY_KEYS.STOCK_INFO],
    getStockInfo,
    {
      initialData: recoilStockData,
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    setRecoilStockData(stockData);
  }, [stockData, setRecoilStockData]);

  return { stockData: recoilStockData };
};

export const useStockPriceHistory = (stockId: number, day: string) => {
  const [recoilStockData, setRecoilStockData] = useRecoilState(
    stockPriceHistoryState
  );

  const { data: stockPrice } = useQuery<StockPriceHistory[]>(
    [`${QUERY_KEYS.STOCK_PRICE_HISTORY}/${stockId}/${day}`],
    () => getStockPriceHistory(stockId, day),
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (stockPrice) {
      setRecoilStockData(stockPrice);
    }
  }, [stockPrice, setRecoilStockData]);

  return { stockPriceHisData: recoilStockData };
};
