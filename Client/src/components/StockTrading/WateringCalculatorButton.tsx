import { useState } from 'react';
import { WateringCalculator } from '../StockInfo/styled';
import { WateringCalculatorPopUp } from './WateringCalculatorPopUp';

export function WateringCalculatorButton(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);

  const openPopup = () => {
    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <WateringCalculatorPopUp
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <WateringCalculator
        onClick={() => {
          openPopup();
        }}
      >
        물타기 계산기
      </WateringCalculator>
    </>
  );
}
