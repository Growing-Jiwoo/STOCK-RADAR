import { Colors } from './../../style/common.styled';
import styled from 'styled-components';

interface ChartWrapperProps {
  hasStockName?: boolean;
}

export const ChartContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
`;

export const ChartWrapper = styled.div<ChartWrapperProps>`
  width: 100%;
  height: ${(props) => (props.hasStockName ? '100%' : '33%')};
`;

export const ChartDaysBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  gap: 20px;
  margin-bottom: -40px;
`;

export const SelectDaysButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  font-size: 13px;
  font-family: var(--font-nanumfontB);
  background-color: ${Colors.white};

  &:hover {
    background-color: ${Colors.lightGray};
  }
`;
