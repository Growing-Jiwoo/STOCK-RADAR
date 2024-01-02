import { TradingBtn, TradingBtnContainer } from './styled';

export function StockTradingButton() {
  return (
    <TradingBtnContainer>
      <TradingBtn isNegative={true}>구매</TradingBtn>
      <TradingBtn isNegative={false}>판매</TradingBtn>
    </TradingBtnContainer>
  );
}
