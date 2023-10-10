import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import { useRecoilValue, useRecoilState } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { useStockPriceHistory } from '../../services/stockInfo';
import { stockPriceHistoryState } from '../../recoil/stockInfo/atoms';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';

function StockDetailInfo(): JSX.Element {
  const { stockNumber, stockDetailId } = useParams<StockDetailParams>();
  const stockPriceHistory = useRecoilState(stockPriceHistoryState);
  const recoilData = useRecoilValue(
    selectedStockDataState(stockNumber as string)
  );
  const currentPrices: number[] = stockPriceHistory[0].map(
    (item) => item.current_price
  );
  const timeStamps: string[] = stockPriceHistory[0].map(
    (item) => item.timestamp
  );

  useStockPriceHistory(Number(stockNumber), '1');

  return (
    <>
      <h2>Stock Detail Page</h2>
      <p>Displaying content for ID: {stockDetailId}</p>
      <p>{recoilData?.current_price}</p>
      <StockPriceHistoryChart priceData={currentPrices} />
    </>
  );
}

export default StockDetailInfo;
