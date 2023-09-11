import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import { useRecoilValue } from 'recoil';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';

function StockDetailInfo(): JSX.Element {
  const { stockNumber, stockDetailId } = useParams<StockDetailParams>();
  const selectedStockData = useRecoilValue(
    selectedStockDataState(stockNumber || '')
  );

  console.log(selectedStockData);
  // to do list
  // 1. 빈배열일때는 스피너
  // 2. 배열이 채워지면 데이터를 활용한 UI 출력

  return (
    <>
      <h2>Stock Detail Page</h2>
      <p>Displaying content for ID: {stockDetailId}</p>
    </>
  );
}

export default StockDetailInfo;
