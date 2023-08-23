import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { StockInformation } from '../types/stock';
import { useGetStockInfo } from '../services/stockInfo';

export const useStockTableInstance = () => {
  const { data } = useGetStockInfo();

  const columns = useMemo<Column<StockInformation>[]>(
    () => [
      {
        Header: '주식명',
        accessor: 'name',
      },
      {
        Header: '시가',
        accessor: 'start_price',
      },
      {
        Header: '현재 가격',
        accessor: 'current_price',
      },
      {
        Header: '+-%',
        accessor: 'rate_of_change',
      },
      {
        Header: '어제 종가',
        accessor: 'yesterday_price',
      },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data: data,
  });

  return tableInstance;
};
