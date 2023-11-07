import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../recoil/stockInfo/selectors';
import { useStockData, useStockPriceHistory } from '../services/stockInfo';
import { StockPriceHistoryChart } from '../components/Chart/StockPriceHistoryChart';
import { Suspense } from 'react';
import LoadingSpinner from '../components/Commons/Spinner';
import { RateOfChange } from '../components/StockInfo/RateOfChange';
import Comment from '../components/Comment/Comment';
import CommentInput from '../components/Comment/CommentInput';

function StockDetailInfo(): JSX.Element {
  const { stockName } = useParams<StockDetailParams>();
  const recoilData = useRecoilValue(
    selectedStockDataState(stockName as string)
  );
  useStockPriceHistory(stockName as string, '30');
  useStockData(); // 해당 함수가 계속 데이터가 바뀌면서 자식 컴포넌트 리렌더링을 유발하므로 차후에 수정 필요

  if (!recoilData) {
    return <p>Error: Stock data is undefined.</p>;
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <p>현재 가격</p>
        <RateOfChange keys={recoilData.name} />
        <StockPriceHistoryChart />

        <CommentInput stockName={stockName as string} />
        <Comment />
      </Suspense>
    </>
  );
}

export default StockDetailInfo;
