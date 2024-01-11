import { StockName } from './../types/stock';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../const/queryKey';
import { AxiosError } from 'axios';
import { QueryKey } from '../types/reactQuery';
import {
  getStockInPossession,
  getStockTradingHistory,
} from '../apis/stockTrading';
import { StockInPossession, StockTradingHistory } from '../types/stockTrading';
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

export const useGetStockTradingHistory = () => {
  const { data: stockTradingHistoryData } = useQuery<
    StockTradingHistory[],
    AxiosError,
    StockTradingHistory[],
    QueryKey
  >([`${QUERY_KEYS.STOCK_TRADING_HISTORY}`], () => getStockTradingHistory(), {
    staleTime: 3 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  return stockTradingHistoryData;
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

export const prefetchStockTradingHistory = async () => {
  await queryClient.prefetchQuery(
    [`${QUERY_KEYS.STOCK_TRADING_HISTORY}`],
    () => getStockTradingHistory(),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 15 * 60 * 1000,
    }
  );
};
