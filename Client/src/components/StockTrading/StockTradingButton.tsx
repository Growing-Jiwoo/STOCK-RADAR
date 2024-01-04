import { memo, useState } from 'react';
import { StockTradingPopup } from './StockTradingPopup';
import { TradingBtn, TradingBtnContainer } from './styled';

export function StockTradingButton() {
  const [stockBuymodalOpen, setStockBuyModalOpen] = useState(false);
  const [stockSellmodalOpen, setStockSellModalOpen] = useState(false);

  const openBuyPopup = () => {
    setStockBuyModalOpen(true);
  };

  const openSellPopup = () => {
    setStockSellModalOpen(true);
  };

  return (
    <TradingBtnContainer>
      <TradingBtn
        isNegative={true}
        onClick={() => {
          openBuyPopup();
        }}
      >
        구매
      </TradingBtn>
      <StockTradingPopup
        isOpen={stockBuymodalOpen}
        closeModal={() => setStockBuyModalOpen(false)}
        actionType="buy"
      />

      <TradingBtn
        isNegative={false}
        onClick={() => {
          openSellPopup();
        }}
      >
        판매
      </TradingBtn>

      <StockTradingPopup
        isOpen={stockSellmodalOpen}
        closeModal={() => setStockSellModalOpen(false)}
        actionType="sell"
      />
    </TradingBtnContainer>
  );
}
export default memo(StockTradingButton);
