import { memo, useMemo } from 'react';
import { Column } from 'react-table';
import { useTableInstance } from '../../hooks/useTableInstance';
import { useGetStockTradingHistory } from '../../services/stockTrading';
import { StockTradingHistory } from '../../types/stockTrading';
import ReactPaginate from 'react-js-pagination';
import { usePagination } from '../../hooks/usePagination';
import {
  PaginationContainer,
  StockTableContainer,
  StockTraindingHistoryStatus,
} from './styled';

export function MyStockTradingHistory() {
  const itemsPerPage = 10;
  const historyList = useGetStockTradingHistory('list');

  const { currentPage, paginatedItems, handlePageChange } = usePagination(
    historyList ?? [],
    itemsPerPage
  );

  const stockTableColumns = useMemo<Column<StockTradingHistory>[]>(
    () => [
      { Header: '', accessor: 'purchase_date' },
      {
        Header: '',
        id: 'quantityAndStatus',
        accessor: (row) => ({
          quantity: row.quantity,
          status: row.status,
          stock_name: row.stock_name,
        }),
        Cell: ({ value }: { value: StockTradingHistory }) => (
          <>
            <span>{value.stock_name}</span>
            <StockTraindingHistoryStatus status={value.status}>
              {value.quantity}주 {value.status === 0 ? '구매' : '판매'}
            </StockTraindingHistoryStatus>
          </>
        ),
      },
      {
        Header: '',
        id: 'stock_price_per_unit',
        accessor: (row) => ({
          stock_price_per_unit: row.stock_price_per_unit,
        }),
        Cell: ({ value }: { value: StockTradingHistory }) => (
          <span>1주당 ${value.stock_price_per_unit}</span>
        ),
      },
    ],
    []
  );

  const tableInstance = useTableInstance(paginatedItems, stockTableColumns);

  return (
    <StockTableContainer>
      <table className="stock-table" {...tableInstance.getTableProps()}>
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
            const rowData = tableInstance.data[row.index];

            return (
              <tr {...row.getRowProps({ key: rowData.his_id })}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <PaginationContainer>
        <ReactPaginate
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={historyList?.length ?? 0}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="<"
          nextPageText=">"
          firstPageText="<<"
          lastPageText=">>"
        />
      </PaginationContainer>
    </StockTableContainer>
  );
}

export default memo(MyStockTradingHistory);
