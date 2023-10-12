import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import { useStockPriceHistory } from '../../services/stockInfo';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';

function StockDetailInfo(): JSX.Element {
  const { stockNumber, stockDetailId } = useParams<StockDetailParams>();
  const recoilData = useRecoilValue(
    selectedStockDataState(stockNumber as string)
  );

  useStockPriceHistory(Number(stockNumber), '30');

  return (
    <>
      <p>현재 가격 ${recoilData?.current_price}</p>
      <StockPriceHistoryChart />
    </>
  );
}

export default StockDetailInfo;
