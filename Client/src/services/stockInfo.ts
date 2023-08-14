import { useQuery } from '@tanstack/react-query';
import { getStockInfo } from '../api/stockinfo';

export const useGetStockInfo = () => {
  return useQuery({
    queryKey: ['stockInfo'],
    queryFn: getStockInfo,
    refetchOnWindowFocus: false,
    initialData: [],
    refetchInterval: 2000,
  });
};
