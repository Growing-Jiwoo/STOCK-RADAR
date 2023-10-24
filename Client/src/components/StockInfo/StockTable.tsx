import { useNavigate } from 'react-router-dom';
import { useStockTableInstance } from '../../hooks/useStockTableInstance';
import storage from '../../utils/localStorage';

function StockTable() {
  const tableInstance = useStockTableInstance();
  const navigate = useNavigate();

  const handleClick = (key: string, value: string) => {
    const MAX_VIEWS = 5;

    const storedData: string | null = storage.get('views');
    const previousViews = storedData ? JSON.parse(storedData) : {};

    const newData = { ...previousViews, [key]: value };

    const keys = Object.keys(newData);
    if (keys.length > MAX_VIEWS) {
      const oldestKey = keys.shift();
      if (oldestKey) {
        delete newData[oldestKey];
      }
    }
    storage.set('views', JSON.stringify(newData));
  };

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
            <tr
              onClick={() => {
                navigate(
                  `/stock/${tableInstance.data[row.index].name.split(' ')[1]}/${
                    tableInstance.data[row.index].id
                  }`
                );
                handleClick(
                  `stock${tableInstance.data[row.index].name.split(' ')[1]}`,
                  `/stock/${tableInstance.data[row.index].name.split(' ')[1]}/${
                    tableInstance.data[row.index].id
                  }`
                );
              }}
              {...row.getRowProps()}
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
