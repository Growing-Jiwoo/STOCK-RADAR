export interface StockInformation {
  current_price: number;
  name: string;
  percentage_diff?: number;
  rate_of_change: number;
  start_price: number;
  timestamp: string;
  yesterday_price: number;
}
