import { Suspense } from 'react';
import { StockPriceHistoryChart } from '../Chart/StockPriceHistoryChart';
import Spinner from '../Commons/Spinner';
import { RateOfChange } from '../StockInfo/RateOfChange';
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
            <StockPossessionTitle>
              {stockName} : {quantityInPossession?.[idx]}주 <br />
            </StockPossessionTitle>
            <StockPossessionContent>
              내 평균 ${averageStockPrices?.[idx]}
            </StockPossessionContent>
            <StockPossessionContent>
              원금 $
              {Number(stockInPossessionPrice?.[idx]).toLocaleString() || ''}
            </StockPossessionContent>
          </StockPossessionContainer>

          <StockPossessionContainer>
            <StockPossessionTitle>수익</StockPossessionTitle>
            <StockPossessionContent>
              ${stockReturnPricesprices?.[idx]?.toLocaleString() || ''}
            </StockPossessionContent>
            <StockPossessionContent>
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
