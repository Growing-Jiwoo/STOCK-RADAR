import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { StockInformation } from '../types/stock';
import { useRecoilState } from 'recoil';
import { stockDataState } from '../recoil/stockInfo/atoms';

export const useStockTableInstance = () => {
  const stockData = useRecoilState(stockDataState);

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
    data: stockData[0],
  });

  return tableInstance;
};
