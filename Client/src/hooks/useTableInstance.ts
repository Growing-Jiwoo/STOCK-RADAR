import { Column, useTable, TableInstance } from 'react-table';

export const useTableInstance = <T extends object>(
  data: T[],
  columns: Column<T>[]
): TableInstance<T> => {
  const tableInstance = useTable({
    columns,
    data,
  });

  return tableInstance;
};
