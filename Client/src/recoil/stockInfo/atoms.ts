import { atom } from 'recoil';
import { StockInformation } from '../../types/stock';

export const stockDataState = atom<StockInformation[]>({
  key: 'stockData',
  default: [],
});
