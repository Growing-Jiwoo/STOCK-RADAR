import axios from 'axios';
import { ApiUrl } from './ApiUrl';

export const getStockInfo = async () => {
  try {
    const response = await axios.get(ApiUrl.stockinfo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
