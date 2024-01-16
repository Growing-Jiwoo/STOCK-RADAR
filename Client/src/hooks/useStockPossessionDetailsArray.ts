import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stockPriceSelector } from '../recoil/stockInfo/selectors';
import { stockDataState } from '../recoil/stockInfo/atoms';
import { useStockPossessionList } from './useStockInPossession';

export const useStockPossessionDetailsArray = () => {
  const stockInPossessionList = useStockPossessionList('stock_name');
  const quantityInPossession = useStockPossessionList('quantity');
  const stockInPossessionPrice = useStockPossessionList('purchase_price');
  const getStockPrice = useRecoilValue(stockPriceSelector);
  const stockData = useRecoilValue(stockDataState);
  const [returnPricePercentage, setReturnPricePercentage] = useState<number[]>(
    []
  );
  const [stockReturnPricesprices, setStockReturnPrices] = useState<number[]>(
    []
  );
  const stockPriceData = stockInPossessionList
    ? getStockPrice(stockInPossessionList)
    : [];
  const [averageStockPrices, setAverageStockPrices] = useState<number[]>([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (quantityInPossession && stockInPossessionPrice) {
      const averagePrices = quantityInPossession.reduce(
        (acc: number[], quantity, idx) => {
          const averagePrice = (
            parseFloat(stockInPossessionPrice[idx]) / parseFloat(quantity)
          ).toFixed(2);
          acc.push(+averagePrice);
          return acc;
        },
        []
      );

      setAverageStockPrices(averagePrices);
    }
  }, [quantityInPossession, stockInPossessionPrice]);

  useEffect(() => {
    if (quantityInPossession) {
      const prices = stockPriceData.reduce((acc: number[], arr, idx) => {
        const returnPrice = Number(
          (arr.currentPrice * parseFloat(quantityInPossession[idx])).toFixed(2)
        );
        acc.push(returnPrice);
        return acc;
      }, []);

      setStockReturnPrices(prices);
    }
  }, [stockData]);

  useEffect(() => {
    if (stockReturnPricesprices && stockInPossessionPrice) {
      const differences = stockReturnPricesprices.reduce(
        (acc: number[], price, idx) => {
          const stockInPossession = parseFloat(stockInPossessionPrice[idx]);
          const diff = parseFloat(
            (((price - stockInPossession) / stockInPossession) * 100).toFixed(2)
          );
          acc.push(diff);
          return acc;
        },
        []
      );

      if (differences.length > 0) {
        setReturnPricePercentage(differences);
        setLoading(false);
      }
    }
  }, [stockData]);

  return {
    stockInPossessionList,
    quantityInPossession,
    stockInPossessionPrice,
    returnPricePercentage,
    stockReturnPricesprices,
    averageStockPrices,
    loading,
  };
};
