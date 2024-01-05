import { selector, selectorFamily } from 'recoil';
import { StockPriceHistory } from '../../types/stock';
import { stockDataState, stockPriceHistoryState } from './atoms';

export const selectedStockDataState = selectorFamily({
  key: 'selectedStockData',
  get:
    (index: string) =>
    ({ get }) => {
      const stockData = get(stockDataState);

      const selectedStock = stockData.find((stock) => stock.name === index);
      return selectedStock || null;
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

export const stockPriceSelector = selector({
  key: 'stockPriceSelector',
  get: ({ get }) => {
    const recoilStockData = get(stockDataState);

    return (key: string) => {
      const stockName = key;

      const selectedStock = recoilStockData.find(
        (stock) => stock.name === stockName
      );

      if (selectedStock) {
        const currentPrice = selectedStock.current_price;
        const startPrice = selectedStock.start_price;
        const rateOfChange = selectedStock.rate_of_change;

        return {
          currentPrice,
          isLower: currentPrice < startPrice,
          rateOfChange,
        };
      }

      return {
        currentPrice: 0,
        isLower: false,
        rateOfChange: 0,
      };
    };
  },
});
