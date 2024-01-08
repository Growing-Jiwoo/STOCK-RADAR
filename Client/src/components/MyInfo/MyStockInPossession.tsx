import { useStockDetails } from '../../hooks/useStockDetailInfos';

export function MyStockInPossession() {
  const {
    totalCurrentPrice,
    possessionStockTotalPrice,
    stockPriceDifference,
    percentageDifference,
  } = useStockDetails();
  return (
    <>
      <div>보유중인 주식 (클릭하면 보유중인 주식 리스트)</div>
      <div>
        보유중인 주식 총 구매했던 금액 : ${possessionStockTotalPrice.toFixed(2)}
      </div>
      <div>
        보유중인 주식들의 현재 총 금액 : ${totalCurrentPrice.toFixed(2)}
      </div>
      <div>보유중인 주식 총 현재 금액 : ${stockPriceDifference.toFixed(2)}</div>
      <div>
        보유중인 주식 총 현재 금액 퍼센티지 : {percentageDifference.toFixed(2)}%
      </div>
      <div>주문 내역 히스토리(클릭하면 주문 내역 리스트 보여지게)</div>
    </>
  );
}
