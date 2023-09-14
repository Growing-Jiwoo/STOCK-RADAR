import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';

import { QUERY_KEYS } from '../../utils/constants';
import useContinuousStockDetail from '../../hooks/useContinuousStockDetail';
import { getStockDetailInfo } from '../../apis/stockinfo';

function StockDetailInfo(): JSX.Element {
  const { stockNumber, stockDetailId } = useParams<StockDetailParams>();
  const queryKey = `${QUERY_KEYS.STOCK_INFO}_${stockDetailId}`;
  const data = useContinuousStockDetail(
    queryKey,
    () => getStockDetailInfo(stockDetailId as string),
    2000
  );

  return (
    <>
      <h2>Stock Detail Page</h2>
      <p>Displaying content for ID: {stockDetailId}</p>
      <p>{data?.current_price}</p>
    </>
  );
}

export default StockDetailInfo;
