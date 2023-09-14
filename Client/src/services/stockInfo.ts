import { useQuery, useQueryClient } from '@tanstack/react-query';
import { StockInformation } from '../types/stock';
import { getStockInfo, getStockDetailInfo } from '../apis/stockinfo';
import { QUERY_KEYS } from '../utils/constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { stockDataState } from '../recoil/stockInfo/atoms';

export const useStockData = () => {
  const queryClient = useQueryClient();
  const [recoilStockData, setRecoilStockData] = useRecoilState(stockDataState);

  const { data: stockData } = useQuery<StockInformation[]>(
    [QUERY_KEYS.STOCK_INFO],
    getStockInfo,
    {
      initialData: recoilStockData,
      refetchInterval: 1500,
    }
  );

  useEffect(() => {
    setRecoilStockData(stockData);
    const queryKeys = stockData.map((stock) => {
      return `${stock.id}`;
    });

    queryKeys.forEach((queryKey) => {
      queryClient.prefetchQuery([`${QUERY_KEYS.STOCK_INFO}_${queryKey}`], () =>
        getStockDetailInfo(queryKey)
      );
    });
  }, [stockData]);

  return { stockData: recoilStockData };
};
