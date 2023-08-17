import { StockInformation } from '../@types/stock';
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
