import { StockInformation, StockName } from './stock';

export type StockTradingListType = Pick<
  StockInformation,
  'start_price' | 'yesterday_price' | 'current_price' | 'rate_of_change'
>;

export interface CellColorProps {
  isNegative: boolean;
}

export interface TradingStockInfo {
  stock_id: number;
  quantity: number;
  stock_name: StockName;
}

export interface StockInPossession {
  user: number;
  quantity: number;
  stock_name: StockName;
  purchase_price: number;
}
