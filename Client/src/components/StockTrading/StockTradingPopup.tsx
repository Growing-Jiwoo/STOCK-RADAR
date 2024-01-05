import { useEffect, useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import { buyStock, sellStock } from '../../apis/stockTrading';
import { currentPriceState } from '../../recoil/stockInfo/atoms';
import {
  TradingStockInfo,
  StockDetailParams,
  StockInPossession,
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
import {
  QuantityBtn,
  StockInPossessionText,
  StockTradingContainer,
} from './styled';
import { queryClient } from '../../react-query/queryClient';
import { QUERY_KEYS } from '../../utils/constants';

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
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  const stockInPossessionData = queryClient.getQueryData<StockInPossession[]>([
    `${QUERY_KEYS.STOCK_IN_POSSESSION}/${stockName}`,
  ]);

  useEffect(() => {
    if (stockInPossessionData) {
      setTotalQuantity(
        stockInPossessionData.reduce((sum, item) => sum + item.quantity, 0)
      );
    }
  }, [stockInPossessionData]);

  const handleIncrement = () => {
    if (actionType === 'sell' && quantity + 1 > totalQuantity) {
      return;
    }

    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  const handleStockTrading = async () => {
    const stockTradingRequestBody: TradingStockInfo = {
      stock_id: Number(stockDetailId),
      stock_name: stockName as StockName,
      quantity,
    };

    try {
      actionType === 'buy'
        ? await buyStock(stockTradingRequestBody as TradingStockInfo)
        : await sellStock(stockTradingRequestBody as TradingStockInfo);

      await queryClient.refetchQueries([
        `${QUERY_KEYS.STOCK_IN_POSSESSION}/${stockName}`,
      ]);

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
          {actionType === 'buy' ? null : (
            <StockInPossessionText>
              판매할 수 있는 주식 수량 : {totalQuantity}
            </StockInPossessionText>
          )}
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
