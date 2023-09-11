export interface StockInformation {
  id: string;
  current_price: number;
  name: string;
  percentage_diff?: number;
  rate_of_change: number;
  start_price: number;
  timestamp: string;
  yesterday_price: number;
}

export interface StockDetailParams extends Record<string, string> {
  stockNumber: string;
  stockDetailId: string;
}
