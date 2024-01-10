import { StockInformation, StockPriceHistory } from '../types/stock';
import { API_URL } from '../const/apiUrl';
import { instance } from './axios';

export const getStockInfo = async (): Promise<StockInformation[]> => {
  try {
    const response = await instance.get(API_URL.stockinfo);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getStockDetailInfo = async (
  stockId: string
): Promise<StockInformation> => {
  try {
    const response = await instance.get(`${API_URL.stockinfo}/${stockId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch stock detail info');
  }
};

export const getStockPriceHistory = async (
  stockName: string,
  day: string
): Promise<StockPriceHistory[]> => {
  try {
    const response = await instance.get(
      `${API_URL.stockPriceHistory}/${stockName}/${day}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
