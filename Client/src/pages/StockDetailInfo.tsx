import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../recoil/stockInfo/selectors';
import { useStockData, useStockPriceHistory } from '../services/stockInfo';
import { StockPriceHistoryChart } from '../components/Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../components/Commons/Spinner';
import { RateOfChange } from '../components/StockInfo/RateOfChange';

function StockDetailInfo(): JSX.Element {
  const { stockName } = useParams<StockDetailParams>();
  const recoilData = useRecoilValue(
    selectedStockDataState(stockName as string)
  );

  console.log(stockName);

  if (!recoilData) {
    return <p>Error: Stock data is undefined.</p>;
  }

  useStockPriceHistory(stockName as string, '30');
  useStockData();

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <p>현재 가격</p>
        <RateOfChange keys={recoilData.name} />
        <StockPriceHistoryChart />
      </Suspense>
    </>
  );
}

export default StockDetailInfo;
