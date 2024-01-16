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
        <RecentStockList />
        <StockTable />
      </StockTableContainer>
    </Suspense>
  );
}

// to do list
// 주식 판매시에 해당 주식에 대해서 몇주를 가지고 있는지 modal ui에 출력할 것
// 내 정보 페이지를 만들어서 내가 보유중인 주식 리스트 만들기
// 내 정보 페이지에서 주식 구매, 판매 히스토리 UI 만들기
