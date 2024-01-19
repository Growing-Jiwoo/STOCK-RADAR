import { useState } from 'react';
import Modal, { Styles } from 'react-modal';
import { useRecoilValue } from 'recoil';
import { StockPossessionState } from '../../recoil/stockInfo/atoms';
import {
  AgreeButton,
  BtnContainer,
  CloseBtn,
  ClosePopupButton,
  SubMentCenterContainer,
  Title,
} from '../Commons/styled';
import {
  EstimatedPriceContainer,
  EstimatedPriceSubContainer,
  QuantityInput,
  EstimatedPrice,
  WateringPopUpMent,
  DownArrowIcon,
  UpArrowIcon,
} from './styled';

Modal.setAppElement('#root');

const customStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(43, 43, 43, 0.6)',
    zIndex: 1001,
  },
  content: {
    width: '400px',
    height: '380px',
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

export function WateringCalculatorPopUp({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const StockPossessionData = useRecoilValue(StockPossessionState);
  const { averageStockPrice, currentPrice, quantity, returnPercentage } =
    StockPossessionData;
  const [inputQuantity, setInputQuantity] = useState('10');
  const [inputWidth, setInputWidth] = useState(28);

  const purchasePrice = averageStockPrice * quantity;
  const newInvestmentPrice = currentPrice * +inputQuantity;
  const totalQuantity = quantity + +inputQuantity;

  const estimatedAveragePrice = (
    (purchasePrice + newInvestmentPrice) /
    totalQuantity
  ).toFixed(2);

  const estimatedTotalPrice = +estimatedAveragePrice * totalQuantity;

  const estimatedAveragePercentage = (
    ((estimatedTotalPrice - currentPrice * totalQuantity) /
      estimatedTotalPrice) *
    100
  ).toFixed(2);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[0-9.]*$/;
    const inputValue = event.target.value;

    if (regex.test(inputValue)) {
      setInputQuantity(inputValue);
      setInputWidth(Math.max(0, inputValue.length * 12));
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} contentLabel="Popup Modal" style={customStyles}>
        <Title>
          물타기 계산기
          <CloseBtn onClick={closeModal} />
        </Title>
        <SubMentCenterContainer>
          <WateringPopUpMent fontSize={'20px'}>
            ${currentPrice}
            <span>으로</span>
          </WateringPopUpMent>
          <WateringPopUpMent fontSize={'20px'}>
            <QuantityInput
              type="text"
              value={inputQuantity}
              onChange={handleTextChange}
              width={inputWidth}
              autoFocus
            />
            주<span> 더 구매하면</span>
          </WateringPopUpMent>
          <WateringPopUpMent fontSize={'17px'}>
            <span>
              총 ${(currentPrice * (parseFloat(inputQuantity) || 0)).toFixed(2)}
            </span>
          </WateringPopUpMent>

          <EstimatedPriceContainer>
            <EstimatedPriceSubContainer>
              <p>현재 평균</p>
              <EstimatedPrice isLower={+returnPercentage < 0}>
                {returnPercentage}%
                {+returnPercentage <= 0 ? <DownArrowIcon /> : <UpArrowIcon />}
              </EstimatedPrice>
              <p>${averageStockPrice}</p>
            </EstimatedPriceSubContainer>
            <EstimatedPriceSubContainer> {'⮕'} </EstimatedPriceSubContainer>
            <EstimatedPriceSubContainer>
              <p>예상 평균</p>
              <EstimatedPrice isLower={+estimatedAveragePercentage < 0}>
                {estimatedAveragePercentage}%
                {+estimatedAveragePercentage <= 0 ? (
                  <DownArrowIcon />
                ) : (
                  <UpArrowIcon />
                )}
              </EstimatedPrice>
              <p>${estimatedAveragePrice}</p>
            </EstimatedPriceSubContainer>
          </EstimatedPriceContainer>
        </SubMentCenterContainer>
        <BtnContainer>
          <ClosePopupButton width="80px" height="38px" onClick={closeModal}>
            취소
          </ClosePopupButton>
          <AgreeButton width="80px" height="38px">
            구매
          </AgreeButton>
        </BtnContainer>
      </Modal>
    </>
  );
}
