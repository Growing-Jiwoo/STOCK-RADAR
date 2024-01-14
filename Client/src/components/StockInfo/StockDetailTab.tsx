import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StockDetailParams, StockName } from '../../types/stock';
import CommentInput from '../Comment/CommentInput';
import Comment from '../Comment/Comment';
import StockTradingListTable from '../StockTrading/StockTradingListTable';
import { TabSubContainer, TabButton, TabContainer } from './styled';
import { useGetStockInPossessionList } from '../../services/stockTrading';

export function StockDetailTab() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { stockName } = useParams<StockDetailParams>();

  const { stockInPossessionList } = useGetStockInPossessionList(
    stockName as StockName
  );

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <TabContainer>
      <TabButton onClick={() => handleTabClick(1)} isActive={activeTab === 1}>
        커뮤니티
      </TabButton>
      <TabButton onClick={() => handleTabClick(2)} isActive={activeTab === 2}>
        호가
      </TabButton>
      <TabButton onClick={() => handleTabClick(3)} isActive={activeTab === 3}>
        내 주식
      </TabButton>
      {activeTab === 1 && (
        <TabSubContainer>
          <CommentInput stockName={stockName as StockName} />
          <Comment />
        </TabSubContainer>
      )}
      {activeTab === 2 && (
        <TabSubContainer>
          <StockTradingListTable />
        </TabSubContainer>
      )}
      {activeTab === 3 &&
        (stockInPossessionList?.[0] ? (
          <TabSubContainer>Yes Stock</TabSubContainer>
        ) : (
          <TabSubContainer>No Stock</TabSubContainer>
        ))}
    </TabContainer>
  );
}

// to do list
// 1. 주식 상세 조회 시 보유중인 주식인지 아닌지 확인
// 2. 보유중인 주식 정보를 recoil로 넘기기 (몇주인지, 수익이 얼마나 되는지 [금액 / 퍼센티지], 내가 넣은 원금, 내가 구매한 주식의 평균금액) => useStockPossessionDetails에 있음
// 3. 만약 보유중인 주식이라면 탭을 하나 더 생성해서 해당 정보들을 출력해주기
// 4. Navbar를 투명하게 만들고 Myinfo나 로그아웃 버튼을 좀 다르게 배치하기
