import { toast } from 'react-toastify';
import { buyStock, sellStock } from '../apis/stockTrading';
import { QUERY_KEYS } from '../const/queryKey';
import { queryClient } from '../react-query/queryClient';
import { TradingStockInfo } from '../types/stockTrading';

export const useStockTrading = async (
  stockTradingRequestBody: TradingStockInfo
) => {
  try {
    const actionType = stockTradingRequestBody.actionType;
    const stockName = stockTradingRequestBody.stock_name;
    actionType === 'buy'
      ? await buyStock(stockTradingRequestBody as TradingStockInfo)
      : await sellStock(stockTradingRequestBody as TradingStockInfo);

    const stockChartAllQueryKeys = queryClient
      .getQueryCache()
      .findAll([`${QUERY_KEYS.STOCK_PRICE_HISTORY}/`]);

    await queryClient.refetchQueries(stockChartAllQueryKeys);

    await queryClient.refetchQueries([
      `${QUERY_KEYS.STOCK_IN_POSSESSION}/${stockName}`,
    ]);
  } catch (error) {
    console.error('Stock trading failed:', error);
    toast.error(`Stock trading failed: ${error}`);
  }
};
