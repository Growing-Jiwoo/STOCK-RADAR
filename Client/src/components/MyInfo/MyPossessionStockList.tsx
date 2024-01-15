import { Suspense } from 'react';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';
import Spinner from '../Commons/Spinner';
import {
  StockListContainer,
  StockPossessionTitle,
  StockPossessionContainer,
  StockPossessionContent,
} from './styled';
import { StockName as StockNameType } from '../../types/stock';
import { DownArrowIcon, StockPrice, UpArrowIcon } from '../StockInfo/styled';
import useStockPossessionDetails from '../../hooks/useStockPossessionDetails';

export function MyPossessionStockList(): JSX.Element {
  const {
    stockInPossessionList,
    quantityInPossession,
    stockInPossessionPrice,
    returnPricePercentage,
    stockReturnPricesprices,
    averageStockPrices,
    loading,
  } = useStockPossessionDetails();

  const returnPrices = (idx: number) => {
    if (stockReturnPricesprices && stockInPossessionPrice) {
      const returnPrice =
        stockReturnPricesprices?.[idx] - Number(stockInPossessionPrice?.[idx]);
      return returnPrice ? (+returnPrice.toFixed(2)).toLocaleString() : '';
    }
    return '';
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {stockInPossessionList?.map((stockName: string, idx: number) => (
        <StockListContainer key={idx}>
          <Suspense fallback={<Spinner />}>
            <StockPriceHistoryChart
              possessionStock={stockName as StockNameType}
            />
          </Suspense>

          <StockPossessionContainer>
            <StockPossessionTitle fontSize="15px">
              {stockName} : {quantityInPossession?.[idx]}주 <br />
            </StockPossessionTitle>
            <StockPossessionContent fontSize="12px">
              내 평균 ${averageStockPrices?.[idx]}
            </StockPossessionContent>
            <StockPossessionContent fontSize="12px">
              원금 $
              {Number(stockInPossessionPrice?.[idx]).toLocaleString() || ''}
            </StockPossessionContent>
          </StockPossessionContainer>

          <StockPossessionContainer>
            <StockPossessionTitle fontSize="15px">수익</StockPossessionTitle>
            <StockPossessionContent fontSize="12px">
              ${stockReturnPricesprices?.[idx]?.toLocaleString() || ''}
            </StockPossessionContent>
            <StockPossessionContent fontSize="12px">
              <StockPrice isLower={returnPricePercentage?.[idx] <= 0}>
                ${returnPrices(idx)} /{returnPricePercentage?.[idx]}%
                {returnPricePercentage?.[idx] <= 0 ? (
                  <DownArrowIcon />
                ) : (
                  <UpArrowIcon />
                )}
              </StockPrice>
            </StockPossessionContent>
          </StockPossessionContainer>
        </StockListContainer>
      ))}
    </>
  );
}
