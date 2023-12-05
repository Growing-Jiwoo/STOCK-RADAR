import React from 'react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Column } from 'react-table';
import { useRecoilValue } from 'recoil';
import { useTableInstance } from '../../hooks/useTableInstance';
import { maxPriceState, minPriceState } from '../../recoil/stockInfo/atoms';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { StockDetailParams, StockTradingListType } from '../../types/stock';
import { StockTradingTableRow } from './StockTradingTableRow';
import { StockTradingTable, StyledTableCell } from './styled';

function StockTradingListTable() {
  const { stockName } = useParams<StockDetailParams>();
  const stockData: StockTradingListType =
    useRecoilValue(selectedStockDataState(stockName as string)) ||
    ({} as StockTradingListType);
  const rateOfChange: number = stockData.rate_of_change;
  const currentPrice: number = stockData.current_price;

  const stockTableColumns = useMemo<Column<StockTradingListType>[]>(
    () => [
      {
        Header: 'Current Price',
        accessor: 'current_price',
        Cell: ({ value }) => <span>{`$${value}`}</span>,
      },
      {
        Header: 'Rate of Change',
        accessor: 'rate_of_change',
        Cell: ({ value }) => <span>{`${value}%`}</span>,
      },
    ],
    []
  );

  /* to do list
          1. 테이블에서 현재 주식의 오늘자 상한가 하한가를 테이블에 출력
          2. 테이블에서 현재 주식을 구매 및 판매 하려할 때 가격을 테이블에 출력
          3. 오늘 가격중에 제일 높았던 가격과 제일 낮았던 가격을 출력 
          4. 해당 테이블은 차트 밑에 버튼을 만들어서 호가라는 탭에서 확인할 수 있게 하기 
  */

  const minPriceData = useRecoilValue(minPriceState); // 해당 주식의 오늘 하루 하한가
  const maxPriceData = useRecoilValue(maxPriceState); // 해당 주식의 오늘 하루 상한가

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
            <React.Fragment key={row.id}>
              <StockTradingTableRow
                variation={rateOfChange + 4.5}
                price={currentPrice * (1 + 4.5 / 100)}
                isNegative={rateOfChange + 4.5 < 0}
              />
              <StockTradingTableRow
                variation={rateOfChange + 3}
                price={currentPrice * (1 + 3 / 100)}
                isNegative={rateOfChange + 3 < 0}
              />
              <StockTradingTableRow
                variation={rateOfChange + 1.5}
                price={currentPrice * (1 + 1.5 / 100)}
                isNegative={rateOfChange + 1.5 < 0}
              />
              <tr>
                <StyledTableCell
                  isNegative={rateOfChange < 0}
                  {...row.cells[0].getCellProps()}
                >
                  {row.cells[0].render('Cell')}
                </StyledTableCell>
                <StyledTableCell
                  isNegative={rateOfChange < 0}
                  {...row.cells[1].getCellProps()}
                >
                  {row.cells[1].render('Cell')} - 현재 가격
                </StyledTableCell>
              </tr>
              <StockTradingTableRow
                variation={rateOfChange - 1.5}
                price={currentPrice * (1 - 1.5 / 100)}
                isNegative={rateOfChange - 1.5 < 0}
              />
              <StockTradingTableRow
                variation={rateOfChange - 3}
                price={currentPrice * (1 - 3 / 100)}
                isNegative={rateOfChange - 3 < 0}
              />
              <StockTradingTableRow
                variation={rateOfChange - 4.5}
                price={currentPrice * (1 - 4.5 / 100)}
                isNegative={rateOfChange - 4.5 < 0}
              />
            </React.Fragment>
          );
        })}
      </tbody>
    </StockTradingTable>
  );
}

export default StockTradingListTable;
