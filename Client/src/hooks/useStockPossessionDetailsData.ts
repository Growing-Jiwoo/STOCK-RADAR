import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { stockPriceSelector } from '../recoil/stockInfo/selectors';
import { useGetStockInPossessionList } from '../services/stockTrading';
import { StockName } from '../types/stock';

export const useStockPossessionDetailsData = (stockName: StockName) => {
  const { stockInPossessionList } = useGetStockInPossessionList(
    stockName as StockName
  );
  const { quantity, purchase_price: purchasePrice } =
    stockInPossessionList?.[0] || {};
  const getStockPrice = useRecoilValue(stockPriceSelector);
  const stockPriceData = getStockPrice(stockName as StockName);
  const [returnPrice, setReturnPrice] = useState(0);
  const [returnPercentage, setReturnPercentage] = useState(0);
  const [currentTotalPrice, setCurrentTotalPrice] = useState(0);

  useEffect(() => {
    if (
      stockPriceData &&
      quantity !== undefined &&
      purchasePrice !== undefined
    ) {
      const currentTotalPrice = (
        stockPriceData[0]?.currentPrice * quantity
      ).toFixed(2);

      const returnPrice = (purchasePrice - +currentTotalPrice).toFixed(2);

      const returnPercentage = (
        ((purchasePrice - +currentTotalPrice) / purchasePrice) *
        100
      ).toFixed(2);

      setReturnPrice(+returnPrice);
      setReturnPercentage(+returnPercentage);
      setCurrentTotalPrice(+currentTotalPrice);
    }
  }, [stockPriceData, quantity, purchasePrice]);

  return {
    stockInPossessionList,
    quantity,
    averageStockPrice: ((purchasePrice ?? 0) / (quantity ?? 0)).toFixed(2),
    returnPrice,
    returnPercentage,
    currentTotalPrice,
    purchasePrice,
  };
};
