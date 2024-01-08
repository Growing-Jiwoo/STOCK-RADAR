import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { stockDataState } from '../recoil/stockInfo/atoms';
import { stockPriceSelector } from '../recoil/stockInfo/selectors';
import { useGetStockInPossessionInfoData } from './useStockInPossession';

export const useStockDetails = () => {
  const quantityInPossession = useGetStockInPossessionInfoData('quantity');
  const StockInPossession = useGetStockInPossessionInfoData('stock_name');
  const StockInPossessionPrice =
    useGetStockInPossessionInfoData('purchase_price');
  const stockData = useRecoilValue(stockDataState);
  const [totalCurrentPrice, setTotalCurrentPrice] = useState(0);
  const [possessionStockTotalPrice, setPossessionStockTotalPrice] = useState(0);
  const [stockPriceDifference, setStockPriceDifference] = useState(0);
  const [percentageDifference, setPercentageDifference] = useState(0);

  const getStockPrice = useRecoilValue(stockPriceSelector);
  const stockPriceData = StockInPossession
    ? getStockPrice(StockInPossession)
    : [];

  useEffect(() => {
    if (quantityInPossession) {
      const currnetPrice = stockPriceData.reduce((total, arr, idx) => {
        const price = arr.currentPrice * parseFloat(quantityInPossession[idx]);
        return total + price;
      }, 0);

      setTotalCurrentPrice(currnetPrice);
    }
  }, [stockData, stockPriceData, quantityInPossession]);

  useEffect(() => {
    const difference = Number(
      (possessionStockTotalPrice - totalCurrentPrice).toFixed(2)
    );

    setStockPriceDifference(difference);
  }, [possessionStockTotalPrice, totalCurrentPrice]);

  useEffect(() => {
    const price =
      StockInPossessionPrice?.reduce(
        (acc, value) => acc + parseFloat(value),
        0
      ) ?? 0;

    setPossessionStockTotalPrice(price);
  }, [StockInPossessionPrice]);

  useEffect(() => {
    const percentageDiff = Number(
      ((stockPriceDifference / possessionStockTotalPrice) * 100).toFixed(2)
    );

    setPercentageDifference(percentageDiff);
  }, [stockPriceDifference, possessionStockTotalPrice]);

  return {
    totalCurrentPrice,
    possessionStockTotalPrice,
    stockPriceDifference,
    percentageDifference,
  };
};
