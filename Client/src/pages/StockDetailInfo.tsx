import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../types/stock';
import { useRecoilValue } from 'recoil';
import { StockPriceHistoryChart } from '../components/Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../components/Commons/Spinner';
import { StockDetailTab } from '../components/StockInfo/StockDetailTab';
import { StockTradingButton } from '../components/StockTrading/StockTradingButton';

function StockDetailInfo(): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StockPriceHistoryChart />
      <StockTradingButton />
      <StockDetailTab />
    </Suspense>
  );
}

export default StockDetailInfo;
