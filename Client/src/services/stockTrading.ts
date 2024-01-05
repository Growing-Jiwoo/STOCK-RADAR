import { StockName } from './../types/stock';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../utils/constants';
import { AxiosError } from 'axios';
import { QueryKey } from '../types/reactQuery';
import { getStockInPossession } from '../apis/stockTrading';
import { StockInPossession } from '../types/stock';
import { queryClient } from '../react-query/queryClient';

export const useGetStockInPossessionList = (stockName: StockName | 'list') => {
  const { data: stockInPossessionList } = useQuery<
    StockInPossession,
    AxiosError,
    StockInPossession,
    QueryKey
  >(
    [`${QUERY_KEYS.STOCK_IN_POSSESSION}/${stockName}`],
    () => getStockInPossession(stockName),
    {
      staleTime: 3 * 60 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  return { stockInPossessionList };
};

export const prefetchStockInPossessionList = async (
  stockName: StockName | 'list'
) => {
  await queryClient.prefetchQuery(
    [`${QUERY_KEYS.STOCK_IN_POSSESSION}/${stockName}`],
    () => getStockInPossession(stockName),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );
};
