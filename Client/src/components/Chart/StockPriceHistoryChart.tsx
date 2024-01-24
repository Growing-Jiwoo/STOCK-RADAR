import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ECharts from 'echarts-for-react';
import {
  StockDetailParams,
  StockName,
  StockPriceHistory,
} from '../../types/stock';
import { getCurrentTimeStamp } from '../../utils/addMinutesAndFormat';
import {
  currentPriceState,
  maxPriceState,
  minPriceState,
} from '../../recoil/stockInfo/atoms';
import { selectedStockDataState } from '../../recoil/stockInfo/selectors';
import {
  useGetStockDetailInfos,
  useStockPriceHistory,
} from '../../services/stockInfo';
import { prefetchStockInPossessionList } from '../../services/stockTrading';
import { RateOfChange } from '../StockInfo/RateOfChange';
import { TodayLimitPrice } from '../StockInfo/styled';
import { ChartContainer, ChartWrapper } from './styled';
import { ChartDaysButton } from './ChartDaysButton';

interface StockPriceHistoryChartProps {
  possessionStock: StockName | '';
}

export function StockPriceHistoryChart({
  possessionStock,
}: StockPriceHistoryChartProps) {
  const { stockName } = useParams<StockDetailParams>();
  const [prices, setPrices] = useState<number[]>([]);
  const [timeStamp, setTimeStamp] = useState<string[]>([]);
  const [chartDays, setChartDays] = useState(1);
  const queryClient = useQueryClient();
  const setMinPriceState = useSetRecoilState(minPriceState);
  const setMaxPriceState = useSetRecoilState(maxPriceState);
  const minPrice = useMemo<number>(() => Math.min(...prices), [prices]);
  const maxPrice = useMemo<number>(() => Math.max(...prices), [prices]);
  const stockCurrentPrice = useRecoilValue(currentPriceState);
  const selectedStockData = useRecoilValue(
    selectedStockDataState(stockName as StockName)
  );

  let queryKey: string[] = [''];
  let cachedData: StockPriceHistory[] | undefined;

  if (stockName) {
    queryKey = [`stockPriceHis/${stockName}/${chartDays}`];
    cachedData = queryClient.getQueryData<StockPriceHistory[]>(queryKey);
    useGetStockDetailInfos(stockName as StockName, `${chartDays}`);
    prefetchStockInPossessionList(stockName as StockName);
  } else if (possessionStock) {
    queryKey = [`stockPriceHis/${possessionStock}/7`];
    cachedData = queryClient.getQueryData<StockPriceHistory[]>(queryKey);
    useStockPriceHistory(possessionStock as StockName, '7');
    prefetchStockInPossessionList(possessionStock as StockName);
  }

  const handleSetChartDays = (day: number) => {
    setChartDays(day);
  };

  useEffect(() => {
    if (cachedData) {
      const stockPrices = cachedData.map(
        (item: StockPriceHistory) => item.current_price
      );
      const stockTimestamp = cachedData.map(
        (item: StockPriceHistory) => item.timestamp
      );

      const currentTimeStamp = getCurrentTimeStamp();
      const toDatePrices = [...stockPrices, stockCurrentPrice];
      const toDateTimeStamp = [...stockTimestamp, currentTimeStamp];

      setPrices(toDatePrices);
      setTimeStamp(toDateTimeStamp);
    }
  }, [cachedData, stockCurrentPrice]);

  useEffect(() => {
    setMinPriceState(minPrice);
    setMaxPriceState(maxPrice);
  }, [prices]);

  const options = {
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: minPrice - 5,
      max: maxPrice + 5,
    },
    tooltip: stockName
      ? {
          trigger: 'axis',
          formatter: function (params: { value: number; dataIndex: number }[]) {
            const priceValue = params[0].value;
            const timeStampValue = timeStamp[params[0].dataIndex];
            if (priceValue !== null && priceValue !== undefined) {
              return `<div style="font-size: 14px; color: black; text-align: center; font-weight: bold;">
              <span style="font-size: 11px; color: gray; ">${timeStampValue}</span>
              <br />
              $${priceValue}
            </div>`;
            } else {
              return '';
            }
          },
        }
      : {},
    series: [
      {
        data: Array.from({ length: 144 }, (_, index) => prices[index] || null),
        type: 'line',
        symbol: 'none',
        markLine: {
          symbol: 'none',
          data: stockName
            ? [
                {
                  yAxis: minPrice,
                  lineStyle: { color: 'gray' },
                  label: { show: true, formatter: '$' + minPrice },
                },
                {
                  yAxis: maxPrice,
                  lineStyle: { color: 'gray' },
                  label: { show: true, formatter: '$' + maxPrice },
                },
              ]
            : [{ yAxis: '' }, { yAxis: '' }],
        },
      },
    ],
  };

  return (
    <>
      {stockName && selectedStockData && (
        <>
          <p>현재 가격</p>
          <RateOfChange keys={selectedStockData?.name} />
          <TodayLimitPrice>상한가 : {maxPrice}</TodayLimitPrice>
          <TodayLimitPrice>하한가 : {minPrice}</TodayLimitPrice>
        </>
      )}
      <ChartContainer>
        {stockName && (
          <>
            <ChartDaysButton chartDays={handleSetChartDays} />
          </>
        )}

        <ChartWrapper hasStockName={Boolean(stockName)}>
          <ECharts
            option={options}
            opts={{
              renderer: 'svg',
              width: stockName ? 1200 : 150,
              height: stockName ? 500 : 180,
            }}
          />
        </ChartWrapper>
      </ChartContainer>
    </>
  );
}
