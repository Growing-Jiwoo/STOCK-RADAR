import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RecentStockListItem } from '../../types/stock';
import storage from '../../utils/localStorage';
import { RateOfChange } from './RateOfChange';
import {
  Container,
  DeleteBtn,
  DeleteButton,
  RecentListContainer,
  StockContainer,
  StockNameContainer,
} from './styled';

export function RecentStockList() {
  const [recentStockItem, setRecentStockItem] = useState<RecentStockListItem>(
    () => {
      const storedViews = storage.get('views') as string;
      return storedViews ? JSON.parse(storedViews) : {};
    }
  );

  const keys = Object.keys(recentStockItem);
  const navigate = useNavigate();
  const handleKeyClick = (key: string) => {
    navigate(recentStockItem[key]);
  };

  const handleRemoveClick = (key: string) => {
    const updatedRecentStockItem = { ...recentStockItem };
    delete updatedRecentStockItem[key];

    setRecentStockItem(updatedRecentStockItem);
    storage.set('views', JSON.stringify(updatedRecentStockItem));
  };

  return (
    <Container>
      <h4>최근 본 주식 리스트</h4>
      <RecentListContainer>
        {keys.map((key, index) => (
          <StockContainer key={key}>
            <StockNameContainer>
              <span onClick={() => handleKeyClick(key)}>{key} </span>
              <DeleteButton onClick={() => handleRemoveClick(key)}>
                <DeleteBtn />
              </DeleteButton>
            </StockNameContainer>
            <RateOfChange keys={keys[index]} />
          </StockContainer>
        ))}
      </RecentListContainer>
    </Container>
  );
}
