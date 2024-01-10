const BASE_URL = 'http://127.0.0.1:8000';

export const API_URL = {
  stockinfo: `${BASE_URL}/stockinfo`,
  stockPriceHistory: `${BASE_URL}/stock_price_history`,
  signin: `${BASE_URL}/signin`,
  signup: `${BASE_URL}/signup`,
  refreshToken: `${BASE_URL}/refreshToken`,
  comment: `${BASE_URL}/stocks_comments`,
  buyStock: `${BASE_URL}/purchase_stock`,
  sellStock: `${BASE_URL}/sell_stock`,
  StockInPossession: `${BASE_URL}/user_stocks`,
  StockTradingHistory: `${BASE_URL}/stock_trading_history`,
};
