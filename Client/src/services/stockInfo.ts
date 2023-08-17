import { useQuery } from '@tanstack/react-query';
import { StockInformation } from '../@types/stock';
import { getStockInfo } from '../api/stockinfo';

export const useGetStockInfo = () => {
  return useQuery<StockInformation[]>(['stockInfo'], getStockInfo, {
    refetchOnWindowFocus: false,
    initialData: [],
    refetchInterval: 2000,
  });
};
