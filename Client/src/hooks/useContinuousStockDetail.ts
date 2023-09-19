import { useQuery } from '@tanstack/react-query';
import { StockInformation } from '../types/stock';

type FetchDataFunction = () => Promise<StockInformation>;

function useContinuousStockDetail(
  queryKey: string,
  fetchDataFunction: FetchDataFunction,
  IntervalTime?: number
) {
  const { data } = useQuery<StockInformation>([queryKey], fetchDataFunction, {
    refetchInterval: IntervalTime,
  });

  return data;
}

export default useContinuousStockDetail;
