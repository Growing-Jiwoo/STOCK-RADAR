import { StockInformation, StockPriceHistory } from '../types/stock';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const getStockInfo = async (): Promise<StockInformation[]> => {
  try {
    const response = await instance.get(ApiUrl.stockinfo);
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
    const response = await instance.get(`${ApiUrl.stockinfo}/${stockId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch stock detail info');
  }
};

export const getStockPriceHistory = async (
  stockId: number,
  day: string
): Promise<StockPriceHistory[]> => {
  try {
    const response = await instance.get(
      `${ApiUrl.stockPriceHistory}/${stockId}/${day}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
