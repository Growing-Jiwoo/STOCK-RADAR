import { BuyStock } from './../types/stock';
import { ApiUrl } from './ApiUrl';
import { instance } from './axios';

export const buyStock = async (buyStockInfo: BuyStock): Promise<BuyStock> => {
  try {
    const response = await instance.post(`${ApiUrl.buyStock}`, buyStockInfo);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Stock purchase failed.');
  }
};
