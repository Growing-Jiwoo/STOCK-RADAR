import { useMemo } from 'react';
import { Column, useTable } from 'react-table';
import { TableStyle } from '../component/StockInfo/styled';
import { StockInformation } from '../@types/stock';
import { useGetStockInfo } from '../services/stockInfo';

export default function StockInfo() {
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
