import { useQuery } from '@tanstack/react-query';
import { StockInformation } from '../types/stock';
import { getStockInfo } from '../apis/stockinfo';
import { QUERY_KEYS } from '../utils/constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { stockDataState } from '../recoil/stockInfo/atoms';

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
