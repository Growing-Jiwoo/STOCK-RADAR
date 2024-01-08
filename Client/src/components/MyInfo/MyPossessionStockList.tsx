import { useGetStockInPossessionInfoData } from '../../hooks/useStockInPossession';
import { RateOfChange } from '../StockInfo/RateOfChange';
import { StockListContainer, StockName } from './styled';

export function MyPossessionStockList(): JSX.Element {
  const StockInPossessionList = useGetStockInPossessionInfoData('stock_name');

  return (
    <div>
      {StockInPossessionList?.map((stockName: string, index: number) => (
        <StockListContainer key={index}>
          <StockName> {stockName}</StockName>
          <RateOfChange keys={stockName} />
        </StockListContainer>
      ))}
    </div>
  );
}
