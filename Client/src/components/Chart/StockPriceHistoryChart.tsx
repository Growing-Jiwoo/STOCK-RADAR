import { useQueryClient } from '@tanstack/react-query';
import ECharts from 'echarts-for-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StockDetailParams, StockPriceHistory } from '../../types/stock';
import { ChartContainer, ChartWrapper } from './styled';

export function StockPriceHistoryChart() {
  const { stockNumber } = useParams<StockDetailParams>();
  const [prices, setPrices] = useState<number[]>([]);
  const [timeStamp, setTimeStamp] = useState<string[]>([]);
  const queryKey = [`stockPriceHis/${Number(stockNumber)}/30`]; // days값은 테스트를 위한 임의의 값
  const queryClient = useQueryClient();
  const minData: number = Math.min(...prices);
  const maxData: number = Math.max(...prices);
  const cachedData = queryClient.getQueryData<StockPriceHistory[]>(queryKey);

  useEffect(() => {
    if (cachedData) {
      const stockPrices: number[] = cachedData.map(
        (item: StockPriceHistory) => item.current_price
      );
      const stockTimestamp: string[] = cachedData.map(
        (item: StockPriceHistory) => item.timestamp
      );
      setPrices(stockPrices);
      setTimeStamp(stockTimestamp);
    }
  }, [cachedData]);

  const options = {
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      type: 'value',
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
              yAxis: minData,
              lineStyle: { color: 'gray' },
              label: { show: true, formatter: '$' + minData },
            },
            {
              yAxis: maxData,
              lineStyle: { color: 'gray' },
              label: { show: true, formatter: '$' + maxData },
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
