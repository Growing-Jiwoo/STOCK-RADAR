import { memo, useMemo } from 'react';
import { Column } from 'react-table';
import { useTableInstance } from '../../hooks/useTableInstance';
import { useGetStockTradingHistory } from '../../services/stockTrading';
import { StockTradingHistory } from '../../types/stockTrading';
import ReactPaginate from 'react-js-pagination';
import { usePagination } from '../../hooks/usePagination';

export function MyStockTradingHistory() {
  const itemsPerPage = 10;
  const historyList = useGetStockTradingHistory();

  const { currentPage, paginatedItems, handlePageChange } = usePagination(
    historyList ?? [],
    itemsPerPage
  );

  const stockTableColumns = useMemo<Column<StockTradingHistory>[]>(
    () => [
      { Header: '일자', accessor: 'purchase_date' },
      { Header: '수량', accessor: 'quantity' },
      { Header: '상태', accessor: 'status' },
      { Header: '주식명', accessor: 'stock_name' },
      { Header: '매수가', accessor: 'stock_price_per_unit' },
    ],
    []
  );

  const tableInstance = useTableInstance(paginatedItems, stockTableColumns);

  return (
    <>
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
      <ReactPaginate
        activePage={currentPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={historyList?.length ?? 0}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
        prevPageText="이전"
        nextPageText="다음"
        firstPageText="첫 페이지"
        lastPageText="마지막 페이지"
      />
    </>
  );
}

export default memo(MyStockTradingHistory);
