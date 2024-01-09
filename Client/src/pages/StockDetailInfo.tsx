import { StockPriceHistoryChart } from '../components/Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../components/Commons/Spinner';
import { StockDetailTab } from '../components/StockInfo/StockDetailTab';
import { StockTradingButton } from '../components/StockTrading/StockTradingButton';

function StockDetailInfo(): JSX.Element {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StockPriceHistoryChart possessionStock={''} />
      <StockTradingButton />
      <StockDetailTab />
    </Suspense>
  );
}

export default StockDetailInfo;
