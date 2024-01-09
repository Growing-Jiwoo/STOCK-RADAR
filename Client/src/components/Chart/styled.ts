import styled from 'styled-components';

interface ChartWrapperProps {
  hasStockName?: boolean;
}

export const ChartContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChartWrapper = styled.div<ChartWrapperProps>`
  width: 100%;
  height: ${(props) => (props.hasStockName ? '100%' : '33%')};
`;
