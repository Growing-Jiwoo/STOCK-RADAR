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

export const currentPriceState = atom<number>({
  key: 'currentPrice',
  default: 0,
});

export const minPriceState = atom({
  key: 'minPriceState',
  default: 0,
});

export const maxPriceState = atom({
  key: 'maxPriceState',
  default: 0,
});
