import { useState, useEffect } from 'react';
import { queryClient } from '../react-query/queryClient';
import { StockInPossession } from '../types/stockTrading';
import { QUERY_KEYS } from '../utils/constants';

export const useGetStockInPossessionInfoData = (
  key: keyof StockInPossession
) => {
  const [totalData, setTotalData] = useState<string[] | undefined>();

  useEffect(() => {
    const stockInPossessionData = queryClient.getQueryData<StockInPossession[]>(
      [`${QUERY_KEYS.STOCK_IN_POSSESSION}/list`]
    );

    if (stockInPossessionData) {
      const valuesArray = stockInPossessionData.map((item) =>
        String(item[key])
      );
      setTotalData(valuesArray);
    }
  }, [key]);

  return totalData;
};
