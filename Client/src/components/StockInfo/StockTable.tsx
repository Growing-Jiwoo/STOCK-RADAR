import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Column } from 'react-table';
import { useSetRecoilState } from 'recoil';
import { useTableInstance } from '../../hooks/useTableInstance';
import { selectedStockAtom } from '../../recoil/stockInfo/atoms';
import { useStockData } from '../../services/stockInfo';
import { StockInformation } from '../../types/stock';
import storage from '../../utils/localStorage';

function StockTable() {
  const navigate = useNavigate();
  const setSelectedStock = useSetRecoilState(selectedStockAtom);
  const { stockData } = useStockData();
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

  const handleClick = (key: string, value: string) => {
    const MAX_VIEWS = 5;
    const storedData: string | null = storage.get('views');
    const previousViews: Record<string, string> = storedData
      ? JSON.parse(storedData)
      : {};
    const newData: Record<string, string> = { ...previousViews, [key]: value };
    const keys = Object.keys(newData);

    if (keys.length > MAX_VIEWS) {
      const oldestKey = keys.shift();
      if (oldestKey) {
        delete newData[oldestKey];
      }
    }
    storage.set('views', JSON.stringify(newData));

    setSelectedStock(key);
  };

  const handleRowClick = (rowData: StockInformation) => {
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
