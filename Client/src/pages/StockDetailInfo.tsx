import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../recoil/stockInfo/selectors';
import { useGetStockDetailInfos } from '../services/stockInfo';
import { StockPriceHistoryChart } from '../components/Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../components/Commons/Spinner';
import { RateOfChange } from '../components/StockInfo/RateOfChange';
import { StockDetailTab } from '../components/StockInfo/StockDetailTab';
import { StockTradingButton } from '../components/StockTrading/StockTradingButton';

function StockDetailInfo(): JSX.Element {
  const { stockName } = useParams<StockDetailParams>();
  const selectedStockData = useRecoilValue(
    selectedStockDataState(stockName as string)
  );

  useGetStockDetailInfos(stockName as string, '30');

  if (!selectedStockData) {
    return <p>Error: Stock data is undefined.</p>;
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <p>현재 가격</p>
        <RateOfChange keys={selectedStockData.name} />
        <StockPriceHistoryChart />
        <StockTradingButton />
        <StockDetailTab />
      </Suspense>
    </>
  );
}

export default StockDetailInfo;
