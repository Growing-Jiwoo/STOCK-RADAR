import { Suspense } from 'react';
import Spinner from '../components/Commons/Spinner';
import { RecentStockList } from '../components/StockInfo/RecentStockList';
import StockTable from '../components/StockInfo/StockTable';
import { StockTableContainer } from '../components/StockInfo/styled';

export default function StockInfo() {
  return (
    <Suspense fallback={<Spinner />}>
      <StockTableContainer>
        <RecentStockList />
        <StockTable />
      </StockTableContainer>
    </Suspense>
  );
}
