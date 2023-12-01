import { useMemo } from 'react';
import { Column } from 'react-table';
import { useTableInstance } from '../../hooks/useTableInstance';
import { useStockData } from '../../services/stockInfo';
import { StockInformation } from '../../types/stock';

function StockTradingListTable() {
  {
    /* to do list
          1. 테이블에서 현재 주식의 오늘자 상한가 하한가를 테이블에 출력
          2. 테이블에서 현재 주식을 구매 및 판매 하려할 때 가격을 테이블에 출력
          3. 오늘 가격중에 제일 높았던 가격과 제일 낮았던 가격을 출력 
          4. 해당 테이블은 차트 밑에 버튼을 만들어서 호가라는 탭에서 확인할 수 있게 하기 
    */
  }
  const { stockData } = useStockData();
  const stockTableColumns = useMemo<Column<StockInformation>[]>(
    () => [{ Header: '호가', accessor: 'name' }],
    []
  );

  const tableInstance = useTableInstance(stockData, stockTableColumns);

  return (
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
          return (
            <tr>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default StockTradingListTable;
