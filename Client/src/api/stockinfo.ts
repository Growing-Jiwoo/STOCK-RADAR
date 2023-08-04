import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const getStockInfo = async () => {
  try {
    const response = await instance.get(ApiUrl.stockinfo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
