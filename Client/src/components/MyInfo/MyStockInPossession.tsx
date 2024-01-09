import { useState } from 'react';
import { useStockDetails } from '../../hooks/useStockDetailInfos';
import { MyPossessionStockList } from './MyPossessionStockList';

export function MyStockInPossession(): JSX.Element {
  const {
    totalCurrentPrice,
    possessionStockTotalPrice,
    stockPriceDifference,
    percentageDifference,
  } = useStockDetails();

  const [showStockList, setShowStockList] = useState(false);

  const handleClick = () => {
    setShowStockList(!showStockList);
  };

  return (
    <>
      <div onClick={handleClick}>
        {showStockList
          ? '뒤로가기'
          : '보유중인 주식 (클릭하면 보유중인 주식 리스트)'}
      </div>
      {showStockList && <MyPossessionStockList />}

      {!showStockList && (
        <>
          <div>
            보유중인 주식 총 구매했던 금액 : ${possessionStockTotalPrice}
          </div>
          <div>보유중인 주식들의 현재 총 금액 : ${totalCurrentPrice}</div>
          <div>보유중인 주식 총 수익: ${stockPriceDifference}</div>
          <div>
            보유중인 주식 총 현재 금액 퍼센티지 : {percentageDifference}%
          </div>
          <div>주문 내역 히스토리(클릭하면 주문 내역 리스트 보여지게)</div>
        </>
      )}
    </>
  );
}
