import { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { buyStock } from '../../apis/stockTrading';
import { currentPriceState } from '../../recoil/stockInfo/atoms';
import { BuyStock, StockDetailParams } from '../../types/stock';
import {
  BtnContainer,
  CloseBtn,
  ClosePopupButton,
  SubMentContainer,
  Title,
} from '../Comment/styled';
import { AgreeButton } from '../Commons/styled';
import { QuantityBtn, StockBuyContainer } from './styled';

Modal.setAppElement('#root');

const customStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(43, 43, 43, 0.6)',
    zIndex: 1001,
  },
  content: {
    width: '450px',
    height: '280px',
    padding: '0px 0px',
    borderRadius: '4px',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'auto',
  },
};

export function StockBuyPopUp({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const { stockName, stockDetailId } = useParams<StockDetailParams>();
  const stockCurrentPrice = useRecoilValue(currentPriceState);
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleStockBuy = async () => {
    const buyStockRequestBody: BuyStock = {
      stock: Number(stockDetailId),
      quantity: quantity,
    };

    await buyStock(buyStockRequestBody);

    closeModal();
    setQuantity(0);
  };

  const calculateTotalPrice = () => {
    return `$${(quantity * stockCurrentPrice).toFixed(2)}`;
  };

  return (
    <>
      <Modal isOpen={isOpen} contentLabel="Popup Modal" style={customStyles}>
        <Title>
          주식 구매하기
          <CloseBtn onClick={closeModal} />
        </Title>

        <SubMentContainer>
          {stockName}의 현재 가격은 ${stockCurrentPrice} 입니다. <br />
          <StockBuyContainer>
            구매할 수량 선택
            <QuantityBtn onClick={handleDecrement}>-</QuantityBtn>
            {quantity}
            <QuantityBtn onClick={handleIncrement}>+</QuantityBtn>
            <br />총 구매 금액 : {calculateTotalPrice()}
          </StockBuyContainer>
        </SubMentContainer>

        <BtnContainer>
          <ClosePopupButton
            width="80px"
            height="38px"
            onClick={() => {
              setQuantity(0);
              closeModal();
            }}
          >
            취소
          </ClosePopupButton>
          <AgreeButton
            width="80px"
            height="38px"
            onClick={() => {
              handleStockBuy();
            }}
          >
            구매
          </AgreeButton>
        </BtnContainer>
      </Modal>
    </>
  );
}
