import { useEffect, useState } from 'react';
import { useGetStockInPossessionInfoData } from './useStockInPossession';
import { useRecoilValue } from 'recoil';
import { stockPriceSelector } from '../recoil/stockInfo/selectors';
import { stockDataState } from '../recoil/stockInfo/atoms';

const useStockPossessionDetails = () => {
  const stockInPossessionList = useGetStockInPossessionInfoData('stock_name');
  const quantityInPossession = useGetStockInPossessionInfoData('quantity');
  const stockInPossessionPrice =
    useGetStockInPossessionInfoData('purchase_price');
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
      const averagePrices = quantityInPossession.map((quantity, idx) => {
        const averagePrice = (
          parseFloat(stockInPossessionPrice[idx]) / parseFloat(quantity)
        ).toFixed(2);
        return +averagePrice;
      });
      setAverageStockPrices(averagePrices);
    }
  }, [quantityInPossession, stockInPossessionPrice]);

  useEffect(() => {
    if (quantityInPossession) {
      const price = stockPriceData.map(
        (arr: { currentPrice: number }, idx: number) => {
          const returnPrice = Number(
            (arr.currentPrice * parseFloat(quantityInPossession[idx])).toFixed(
              2
            )
          );
          return returnPrice;
        }
      );

      setStockReturnPrices(price);
    }
  }, [stockData]);

  useEffect(() => {
    if (stockReturnPricesprices && stockInPossessionPrice) {
      const differences = stockReturnPricesprices.map((price, idx) => {
        const stockInPossession = parseFloat(stockInPossessionPrice[idx]);
        const diff = parseFloat(
          (((price - stockInPossession) / stockInPossession) * 100).toFixed(2)
        );
        return diff;
      });
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

export default useStockPossessionDetails;
