import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { useStockData, useStockPriceHistory } from '../../services/stockInfo';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../Commons/Spinner';
import { RateOfChange } from './RateOfChange';

function StockDetailInfo(): JSX.Element {
  const { stockNumber } = useParams<StockDetailParams>();
  const recoilData = useRecoilValue(
    selectedStockDataState(stockNumber as string)
  );

  if (!recoilData) {
    return <p>Error: Stock data is undefined.</p>;
  }

  useStockPriceHistory(Number(stockNumber), '30');
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
