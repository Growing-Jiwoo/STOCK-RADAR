import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StockDetailParams, StockName } from '../../types/stock';
import CommentInput from '../Comment/CommentInput';
import Comment from '../Comment/Comment';
import StockTradingListTable from '../StockTrading/StockTradingListTable';
import { TabSubContainer, TabButton, TabContainer } from './styled';
import { MyStockDetailInfos } from './MyStockDetailInfos';

export function StockDetailTab() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { stockName } = useParams<StockDetailParams>();

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
      {activeTab === 3 && (
        <TabSubContainer>
          <MyStockDetailInfos></MyStockDetailInfos>
        </TabSubContainer>
      )}
    </TabContainer>
  );
}
