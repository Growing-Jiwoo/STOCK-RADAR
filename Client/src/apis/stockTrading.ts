import { toast } from 'react-toastify';
import { StockName } from './../types/stock';
import {
  StockInPossession,
  StockTradingHistory,
  TradingStockInfo,
} from './../types/stockTrading';
import { API_URL } from '../const/apiUrl';
import { instance } from './axios';

export const buyStock = async (
  buyStockInfo: TradingStockInfo
): Promise<TradingStockInfo> => {
  try {
    const response = await instance.post(`${API_URL.buyStock}`, buyStockInfo);
    toast.success('성공적으로 주식을 구매했습니다.');
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
    const response = await instance.post(`${API_URL.sellStock}`, sellStockInfo);
    toast.success('성공적으로 주식을 판매했습니다.');
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
      `${API_URL.StockInPossession}/${stockName}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to query stock information in possession.');
  }
};

export const getStockTradingHistory =
  async (): Promise<StockTradingHistory> => {
    try {
      const response = await instance.get(`${API_URL.StockTradingHistory}`);
      return response.data.data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to Get Stock Trading History.');
    }
  };
