import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import { useRecoilValue } from 'recoil';
import { useTableInstance } from '../../hooks/useTableInstance';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { StockDetailParams, StockTradingListType } from '../../types/stock';
import { StockTradingTable, StyledTableCell } from './styled';

function StockTradingListTable() {
  const { stockName } = useParams<StockDetailParams>();

  const stockTableColumns = useMemo<Column<StockTradingListType>[]>(
    () => [
      {
        Header: '',
        accessor: 'current_price',
        Cell: ({ value }) => <span>{`$${value}`}</span>,
      },
      {
        Header: '',
        accessor: 'rate_of_change',
        Cell: ({ value }) => <span>{`${value}%`}</span>,
      },
    ],
    []
  );

  const stockData: StockTradingListType =
    useRecoilValue(selectedStockDataState(stockName as string)) ||
    ({} as StockTradingListType);

  const tableInstance = useTableInstance(
    [
      {
        start_price: stockData.start_price,
        yesterday_price: stockData.yesterday_price,
        rate_of_change: stockData.rate_of_change,
        current_price: stockData.current_price,
      },
    ],
    stockTableColumns
  );

  return (
    <StockTradingTable
      className="stock-trading-table"
      {...tableInstance.getTableProps()}
    >
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
            <tr key={row.id}>
              {row.cells.map((cell) => (
                <StyledTableCell
                  isNegative={stockData.rate_of_change < 0}
                  {...cell.getCellProps()}
                >
                  {cell.render('Cell')}
                </StyledTableCell>
              ))}
            </tr>
          );
        })}
      </tbody>
    </StockTradingTable>
  );
}

export default StockTradingListTable;
