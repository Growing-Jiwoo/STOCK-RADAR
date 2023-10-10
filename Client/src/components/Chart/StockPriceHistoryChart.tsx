import ECharts from 'echarts-for-react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  stockPricesSelector,
  timeStampsSelector,
} from '../../recoil/stockInfo/selectors';

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
`;

export function StockPriceHistoryChart() {
  const currentPrices = useRecoilValue(stockPricesSelector);
  const timeStamps = useRecoilValue(timeStampsSelector);

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
      formatter: '{c}원',
    },
    series: [
      {
        data: currentPrices,
        type: 'line',
      },
    ],
  };

  return (
    <ChartContainer>
      <ECharts
        option={options}
        opts={{ renderer: 'svg', width: 500, height: 500 }}
      />
    </ChartContainer>
  );
}
