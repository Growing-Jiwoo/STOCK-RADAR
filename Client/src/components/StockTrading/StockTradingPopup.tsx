import { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { buyStock, sellStock } from '../../apis/stockTrading';
import { currentPriceState } from '../../recoil/stockInfo/atoms';
import {
  BuyStock,
  SellStock,
  StockDetailParams,
  StockName,
} from '../../types/stock';
import {
  BtnContainer,
  CloseBtn,
  ClosePopupButton,
  SubMentContainer,
  Title,
} from '../Comment/styled';
import { AgreeButton } from '../Commons/styled';
import { QuantityBtn, StockTradingContainer } from './styled';

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

interface StockTradingPopupProps {
  isOpen: boolean;
  closeModal: () => void;
  actionType: 'buy' | 'sell';
}

export function StockTradingPopup({
  isOpen,
  closeModal,
  actionType,
}: StockTradingPopupProps) {
  const { stockName, stockDetailId } = useParams<StockDetailParams>();
  const stockCurrentPrice = useRecoilValue(currentPriceState);
  const [quantity, setQuantity] = useState(0);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleStockTrading = async () => {
    const stockTradingRequestBody: BuyStock | SellStock =
      actionType === 'buy'
        ? {
            stock: Number(stockDetailId),
            stock_name: stockName as StockName,
            quantity,
          }
        : { stock_id: Number(stockDetailId), quantity };

    try {
      actionType === 'buy'
        ? await buyStock(stockTradingRequestBody as BuyStock)
        : await sellStock(stockTradingRequestBody as SellStock);
      closeModal();
      setQuantity(0);
    } catch (error) {
      console.error('Stock trading failed:', error);
      toast.error(`Stock trading failed: ${error}`);
    }
  };

  const calculateTotalPrice = () => {
    return `$${(quantity * stockCurrentPrice).toFixed(2)}`;
  };

  return (
    <>
      <Modal isOpen={isOpen} contentLabel="Popup Modal" style={customStyles}>
        <Title>
          주식 {actionType === 'buy' ? '구매' : '판매'}하기
          <CloseBtn onClick={closeModal} />
        </Title>

        <SubMentContainer>
          {stockName}의 현재 가격은 ${stockCurrentPrice} 입니다. <br />
          <StockTradingContainer>
            {actionType === 'buy' ? '구매' : '판매'}할 수량 선택
            <QuantityBtn onClick={handleDecrement}>-</QuantityBtn>
            {quantity}
            <QuantityBtn onClick={handleIncrement}>+</QuantityBtn>
            <br />총 {actionType === 'buy' ? '구매' : '판매'} 금액 :{' '}
            {calculateTotalPrice()}
          </StockTradingContainer>
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
              handleStockTrading();
            }}
          >
            {actionType === 'buy' ? '구매' : '판매'}
          </AgreeButton>
        </BtnContainer>
      </Modal>
    </>
  );
}
