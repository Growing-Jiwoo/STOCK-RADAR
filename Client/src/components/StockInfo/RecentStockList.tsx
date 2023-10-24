import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import storage from '../../utils/localStorage';

export function RecentStockList() {
  const [recentStockItem, setRecentStockItem] = useState(
    JSON.parse(storage.get('views') as string)
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
    <div>
      최근 본 주식 리스트
      {keys.map((key) => (
        <div key={key}>
          <span onClick={() => handleKeyClick(key)}>{key}</span>
          <button onClick={() => handleRemoveClick(key)}>x</button>
        </div>
      ))}
    </div>
  );
}
