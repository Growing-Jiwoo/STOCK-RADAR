import { useQueryClient } from '@tanstack/react-query';
import ECharts from 'echarts-for-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  currentPriceState,
  maxPriceState,
  minPriceState,
} from '../../recoil/stockInfo/atoms';
import { StockDetailParams, StockPriceHistory } from '../../types/stock';
import { getCurrentTimeStamp } from '../../utils/addMinutesAndFormat';
import { ChartContainer, ChartWrapper } from './styled';

export function StockPriceHistoryChart() {
  const { stockName } = useParams<StockDetailParams>();
  const [prices, setPrices] = useState<number[]>([]);
  const [timeStamp, setTimeStamp] = useState<string[]>([]);
  const queryKey = [`stockPriceHis/${stockName}/30`];
  const queryClient = useQueryClient();
  const setMinPriceState = useSetRecoilState(minPriceState);
  const setMaxPriceState = useSetRecoilState(maxPriceState);
  const cachedData = queryClient.getQueryData<StockPriceHistory[]>(queryKey);
  const stockCurrentPrice = useRecoilValue(currentPriceState);
  const minPrice = useMemo<number>(() => Math.min(...prices), [prices]);
  const maxPrice = useMemo<number>(() => Math.max(...prices), [prices]);

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
    tooltip: {
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
    },
    series: [
      {
        data: Array.from({ length: 144 }, (_, index) => prices[index] || null),
        type: 'line',
        symbol: 'none',
        markLine: {
          symbol: 'none',
          data: [
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
          ],
        },
      },
    ],
  };

  return (
    <ChartContainer>
      <ChartWrapper>
        <ECharts
          option={options}
          opts={{ renderer: 'svg', width: 1200, height: 500 }}
        />
      </ChartWrapper>
    </ChartContainer>
  );
}
