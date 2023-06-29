import { useEffect, useMemo, useState } from 'react';
import { Column, useTable } from 'react-table';
import { TableStyle } from './styled';
import { getStockInfo } from '../../../api/stockinfo';

interface StockInfomation {
  current_price: number;
  name: string;
  percentage_diff: number;
  rate_of_change: number;
  start_price: number;
  timestamp: string;
  yesterday_price: number;
}

export default function StockInfo() {
  const [data, setData] = useState<StockInfomation[]>([]);
  const columns = useMemo<Column<StockInfomation>[]>(
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

  useEffect(() => {
    getStockInfo().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <TableStyle>
      <table {...tableInstance.getTableProps()}>
        <thead>
          {tableInstance.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...tableInstance.getTableBodyProps()}>
          {tableInstance.rows.map((row) => {
            tableInstance.prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableStyle>
  );
}
