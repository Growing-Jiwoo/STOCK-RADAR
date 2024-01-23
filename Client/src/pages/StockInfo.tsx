import { Suspense } from 'react';
import Spinner from '../components/Commons/Spinner';
import { RecentStockList } from '../components/StockInfo/RecentStockList';
import StockTable from '../components/StockInfo/StockTable';
import { StockTableContainer } from '../components/StockInfo/styled';
import {
  prefetchStockInPossessionList,
  prefetchStockTradingHistory,
} from '../services/stockTrading';

export default function StockInfo() {
  prefetchStockInPossessionList('list');
  prefetchStockTradingHistory('list');

  return (
    <Suspense fallback={<Spinner />}>
      <StockTableContainer>
        <StockTable />
        <RecentStockList />
      </StockTableContainer>
    </Suspense>
  );
}
