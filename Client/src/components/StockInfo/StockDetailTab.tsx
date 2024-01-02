import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { StockDetailParams } from '../../types/stock';
import CommentInput from '../Comment/CommentInput';
import Comment from '../Comment/Comment';
import StockTradingListTable from '../StockTrading/StockTradingListTable';
import {
  CommentContainer,
  ListTableContainer,
  TabButton,
  TabContainer,
} from './styled';

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
      {activeTab === 1 && (
        <CommentContainer>
          <CommentInput stockName={stockName as string} />
          <Comment />
        </CommentContainer>
      )}
      {activeTab === 2 && (
        <ListTableContainer>
          <StockTradingListTable />
        </ListTableContainer>
      )}
    </TabContainer>
  );
}
