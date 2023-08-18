import { useQuery } from '@tanstack/react-query';
import { StockInformation } from '../types/stock';
import { getStockInfo } from '../apis/stockinfo';
import { QUERY_KEYS } from '../utils/constants';

export const useGetStockInfo = () => {
  return useQuery<StockInformation[]>([QUERY_KEYS.STOCK_INFO], getStockInfo, {
    refetchOnWindowFocus: false,
    initialData: [],
    refetchInterval: 2000,
  });
};
