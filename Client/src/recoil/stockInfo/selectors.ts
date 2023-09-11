import { selectorFamily } from 'recoil';
import { stockDataState } from './atoms';

export const selectedStockDataState = selectorFamily({
  key: 'selectedStockData',
  get:
    (index: string) =>
    ({ get }) => {
      const stockData = get(stockDataState);
      const stockIndex = Number(index);
      if (stockIndex >= 0 && stockIndex < stockData.length) {
        return stockData[stockIndex];
      }

      return [];
    },
});
