import { Suspense } from 'react';
import { useGetStockInPossessionInfoData } from '../../hooks/useStockInPossession';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';
import Spinner from '../Commons/Spinner';
import { RateOfChange } from '../StockInfo/RateOfChange';
import { StockListContainer, StockName } from './styled';
import { StockName as StockNameType } from '../../types/stock';
export function MyPossessionStockList(): JSX.Element {
  const stockInPossessionList = useGetStockInPossessionInfoData('stock_name');
  const quantityInPossession = useGetStockInPossessionInfoData('quantity');
  return (
    <div>
      {stockInPossessionList?.map((stockName: string, idx: number) => (
        <StockListContainer key={idx}>
          <Suspense fallback={<Spinner />}>
            <StockPriceHistoryChart
              possessionStock={stockName as StockNameType}
            />
          </Suspense>
          <StockName>
            {stockName} : {quantityInPossession?.[idx]}주
          </StockName>
          <RateOfChange keys={stockName} />
        </StockListContainer>
      ))}
    </div>
  );
}
