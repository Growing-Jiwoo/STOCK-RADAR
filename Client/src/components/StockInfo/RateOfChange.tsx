import { useRecoilState } from 'recoil';
import { stockDataState } from '../../recoil/stockInfo/atoms';
import { StockPrice, DownArrowIcon, UpArrowIcon } from './styled';

type KeysProps = {
  keys: string;
};

export function RateOfChange(keys: KeysProps) {
  const [recoilStockData] = useRecoilState(stockDataState);

  const getStockPrice = (key: string) => {
    const stockIndex = parseInt(key.replace(/\D/g, '')) - 1;
    const currentPrice = recoilStockData[stockIndex]?.current_price;
    const startPrice = recoilStockData[stockIndex]?.start_price;
    const rateOfChange = recoilStockData[stockIndex]?.rate_of_change;

    return {
      currentPrice,
      isLower: currentPrice < startPrice,
      rateOfChange,
    };
  };

  return (
    <StockPrice isLower={getStockPrice(keys.keys).isLower}>
      {getStockPrice(keys.keys).currentPrice}{' '}
      {getStockPrice(keys.keys).rateOfChange}%
      {getStockPrice(keys.keys).isLower ? <DownArrowIcon /> : <UpArrowIcon />}
    </StockPrice>
  );
}
