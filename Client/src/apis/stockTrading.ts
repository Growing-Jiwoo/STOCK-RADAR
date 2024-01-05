import { StockName } from './../types/stock';
import { StockInPossession, TradingStockInfo } from './../types/stockTrading';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const buyStock = async (
  buyStockInfo: TradingStockInfo
): Promise<TradingStockInfo> => {
  try {
    const response = await instance.post(`${ApiUrl.buyStock}`, buyStockInfo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Stock purchase failed.');
  }
};

export const sellStock = async (
  sellStockInfo: TradingStockInfo
): Promise<TradingStockInfo> => {
  try {
    const response = await instance.post(`${ApiUrl.sellStock}`, sellStockInfo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Stock purchase failed.');
  }
};

export const getStockInPossession = async (
  stockName: StockName | 'list'
): Promise<StockInPossession> => {
  try {
    const response = await instance.get(
      `${ApiUrl.StockInPossession}/${stockName}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to query stock information in possession.');
  }
};
