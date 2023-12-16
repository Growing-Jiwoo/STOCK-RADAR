import { useQuery } from '@tanstack/react-query';
import { StockInformation, StockPriceHistory } from '../types/stock';
import { getStockInfo, getStockPriceHistory } from '../apis/stockinfo';
import { QUERY_KEYS } from '../utils/constants';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { stockPriceHistoryState } from '../recoil/stockInfo/atoms';
import { AxiosError } from 'axios';
import { QueryKey } from '../types/reactQuery';
import { useSuspenseQueries } from '@suspensive/react-query';
import { getCommentList } from '../apis/board';
import { stockDataState } from '../recoil/stockInfo/atoms';

export const useStockData = () => {
  const { data: stockData = [] } = useQuery<
    StockInformation[],
    AxiosError,
    StockInformation[],
    QueryKey
  >([QUERY_KEYS.STOCK_INFO], getStockInfo, {
    refetchInterval: 1000,
  });

  return { stockData };
};

export const useStockPriceHistory = (
  stockName: string,
  day: string
): { stockPriceHisData: StockPriceHistory[] | undefined } => {
  const [recoilStockData, setRecoilStockData] = useRecoilState(
    stockPriceHistoryState
  );

  const { data: stockPrice } = useQuery<
    StockPriceHistory[],
    AxiosError,
    StockPriceHistory[],
    QueryKey
  >(
    [`${QUERY_KEYS.STOCK_PRICE_HISTORY}/${stockName}/${day}`],
    () => getStockPriceHistory(stockName, day),
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

export const useGetStockDetailInfos = (stockName: string, day: string) => {
  const [
    { data: stockData },
    { data: commentData },
    { data: stockPriceHistoryData },
  ] = useSuspenseQueries({
    queries: [
      {
        queryKey: [QUERY_KEYS.STOCK_INFO],
        queryFn: () => getStockInfo(),
        refetchInterval: 1000,
      },
      {
        queryKey: [`${QUERY_KEYS.GET_COMMENT_LIST}/${stockName}`],
        queryFn: () => getCommentList(stockName),
      },
      {
        queryKey: [`${QUERY_KEYS.STOCK_PRICE_HISTORY}/${stockName}/${day}`],
        queryFn: () => getStockPriceHistory(stockName, day),
        refetchInterval: 1000,
      },
    ],
  });

  const [, setStockDataState] = useRecoilState(stockDataState);
  const [, setStockPriceHistory] = useRecoilState(stockPriceHistoryState);

  useEffect(() => {
    setStockDataState(stockData);
    setStockPriceHistory(stockPriceHistoryData);
  }, [stockData, stockPriceHistoryData]);

  return { stockData, commentData, stockPriceHistoryData };
};
