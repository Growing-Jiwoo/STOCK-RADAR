import { RecentStockList } from '../components/StockInfo/RecentStockList';
import StockTable from '../components/StockInfo/StockTable';
import { StockTableContainer } from '../components/StockInfo/styled';

export default function StockInfo() {
  return (
    <StockTableContainer>
      <RecentStockList />
      <StockTable />
    </StockTableContainer>
  );
}
