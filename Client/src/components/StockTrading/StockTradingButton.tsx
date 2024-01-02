import { memo, useState } from 'react';
import { StockBuyPopUp } from './StockBuyPopUp';
import { TradingBtn, TradingBtnContainer } from './styled';

export function StockTradingButton() {
  const [modalOpen, setModalOpen] = useState(false);

  const openPopup = () => {
    setModalOpen(true);
  };
  return (
    <TradingBtnContainer>
      <TradingBtn
        isNegative={true}
        onClick={() => {
          openPopup();
        }}
      >
        구매
      </TradingBtn>
      <StockBuyPopUp
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
      />

      <TradingBtn isNegative={false}>판매</TradingBtn>
    </TradingBtnContainer>
  );
}
export default memo(StockTradingButton);
