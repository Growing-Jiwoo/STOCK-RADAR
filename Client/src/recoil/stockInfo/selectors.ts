import { selector, selectorFamily } from 'recoil';
import { StockPriceHistory } from '../../types/stock';
import { stockDataState, stockPriceHistoryState } from './atoms';

export const selectedStockDataState = selectorFamily({
  key: 'selectedStockData',
  get:
    (index: string) =>
    ({ get }) => {
      const stockData = get(stockDataState);
      const stockIndex = Number(index);
      if (stockIndex >= 0 && stockIndex <= stockData.length) {
        return stockData[stockIndex - 1];
      }

      return null;
    },
});

export const stockPricesSelector = selector<number[]>({
  key: 'stockPricesSelector',
  get: ({ get }) => {
    const stockPriceHistory = get(stockPriceHistoryState);
    const stockPrices: number[] = stockPriceHistory.map(
      (item: StockPriceHistory) => item.current_price
    );
    return stockPrices;
  },
});

export const timeStampsSelector = selector<string[]>({
  key: 'timeStampsSelector',
  get: ({ get }) => {
    const stockPriceHistory = get(stockPriceHistoryState);
    const timeStamps: string[] = stockPriceHistory.map(
      (item: StockPriceHistory) => item.timestamp
    );
    return timeStamps;
  },
});
