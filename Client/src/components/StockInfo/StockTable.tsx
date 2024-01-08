import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { handleLimitedClickStorage } from '../../utils/handleLimitedClickStorage';
import { useTableInstance } from '../../hooks/useTableInstance';
import { StockInformation } from '../../types/stock';
import { useRecoilValue } from 'recoil';
import { stockDataState } from '../../recoil/stockInfo/atoms';

function StockTable() {
  const navigate = useNavigate();
  const stockData = useRecoilValue(stockDataState);
  const stockTableColumns = useMemo<Column<StockInformation>[]>(
    () => [
      { Header: '주식명', accessor: 'name' },
      { Header: '시가', accessor: 'start_price' },
      { Header: '현재 가격', accessor: 'current_price' },
      { Header: '+-%', accessor: 'rate_of_change' },
      { Header: '어제 종가', accessor: 'yesterday_price' },
    ],
    []
  );

  const handleRowClick = (rowData: StockInformation) => {
    const MAX_VIEWS = 5;
    const storageKey = 'views';
    const handleClick = handleLimitedClickStorage(storageKey, MAX_VIEWS);
    const { name, id } = rowData;
    const stockURL = `/stock/${name}/${id}`;

    navigate(stockURL);
    handleClick(name, stockURL);
  };

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
          const rowData = tableInstance.data[row.index];

          return (
            <tr
              onClick={() => handleRowClick(rowData)}
              {...row.getRowProps({ key: rowData.id })}
            >
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

export default StockTable;
