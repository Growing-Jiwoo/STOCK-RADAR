import { useState } from 'react';

interface PaginationReturnData<T> {
  currentPage: number;
  paginatedItems: T[];
  handlePageChange: (pageNumber: number) => void;
}

export function usePagination<T>(
  items: T[],
  itemsPerPage: number
): PaginationReturnData<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items?.slice(startIndex, endIndex) ?? [];

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    paginatedItems,
    handlePageChange,
  };
}
