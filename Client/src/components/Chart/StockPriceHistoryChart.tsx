import ECharts from 'echarts-for-react';

interface ChartProps {
  priceData: number[];
}

export function StockPriceHistoryChart({ priceData }: ChartProps) {
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
        data: priceData,
        type: 'line',
      },
    ],
  };

  return (
    <>
      <ECharts
        option={options}
        opts={{ renderer: 'svg', width: 500, height: 500 }}
      />
    </>
  );
}
