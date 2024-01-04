export type StockName =
  | 'QuantumCorp'
  | 'NebulaTech'
  | 'CyberVista'
  | 'BioSynth'
  | 'SynthoDynamics'
  | 'FutureNet'
  | 'StellarTronics'
  | 'TitanInvest'
  | 'QuantumHorizon'
  | 'BioGen';

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
  stockName: string;
  stockDetailId: string;
}

export interface StockPriceHistory {
  id: string;
  current_price: number;
  timestamp: string;
  stock: number;
}

export type StockPriceProps = {
  isLower: boolean;
};

export interface RecentStockListItem {
  [key: string]: string;
}

export interface StockDetailTabButtonProps {
  isActive: boolean;
}

export type StockTradingListType = Pick<
  StockInformation,
  'start_price' | 'yesterday_price' | 'current_price' | 'rate_of_change'
>;

export interface CellColorProps {
  isNegative: boolean;
}

export interface BuyStock {
  stock: number;
  quantity: number;
  stock_name: StockName;
}

export interface SellStock {
  stock_id: number;
  quantity: number;
}
