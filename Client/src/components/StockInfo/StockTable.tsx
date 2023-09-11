// StockTable.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStockTableInstance } from '../../hooks/useStockTableInstance';

function StockTable() {
  const tableInstance = useStockTableInstance();
  const navigate = useNavigate();
  console.log(tableInstance.data);
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
              onClick={() =>
                navigate(
                  `/stock/${tableInstance.data[row.index].name.split(' ')[1]}/${
                    tableInstance.data[row.index].id
                  }`
                )
              }
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
