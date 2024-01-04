import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetStockDetailInfos } from '../../services/stockInfo';
import { RecentStockListItem, StockDetailParams } from '../../types/stock';
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

  const { stockName } = useParams<StockDetailParams>();

  useGetStockDetailInfos(stockName as string, '30');

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
      최근 본 주식 리스트
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
