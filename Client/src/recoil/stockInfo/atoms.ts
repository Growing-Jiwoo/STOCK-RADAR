import { atom } from 'recoil';
import { StockInformation, StockPriceHistory } from '../../types/stock';

export const stockDataState = atom<StockInformation[]>({
  key: 'stockData',
  default: [],
});

export const stockPriceHistoryState = atom<StockPriceHistory[]>({
  key: 'stockPriceHis',
  default: [],
});
