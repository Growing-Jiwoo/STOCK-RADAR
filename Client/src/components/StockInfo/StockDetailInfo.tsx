import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { useStockData, useStockPriceHistory } from '../../services/stockInfo';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../Commons/Spinner';

function StockDetailInfo(): JSX.Element {
  const { stockNumber } = useParams<StockDetailParams>();
  const recoilData = useRecoilValue(
    selectedStockDataState(stockNumber as string)
  );

  useStockPriceHistory(Number(stockNumber), '30');
  useStockData();
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <p>현재 가격 ${recoilData?.current_price}</p>
        <StockPriceHistoryChart />
      </Suspense>
    </>
  );
}

export default StockDetailInfo;
