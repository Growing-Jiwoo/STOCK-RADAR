import { useState } from 'react';
import { ChartDaysBtnContainer, SelectDaysButton } from './styled';

interface ChartDays {
  chartDays: (day: number) => void;
}

export function ChartDaysButton({ chartDays }: ChartDays) {
  const [, setDays] = useState(1);

  const handleDaysChange = (day: number) => {
    setDays(day);
    chartDays(day);
  };

  return (
    <ChartDaysBtnContainer>
      <SelectDaysButton
        onClick={() => {
          handleDaysChange(1);
        }}
      >
        1일
      </SelectDaysButton>
      <SelectDaysButton
        onClick={() => {
          handleDaysChange(3);
        }}
      >
        3일
      </SelectDaysButton>
      <SelectDaysButton
        onClick={() => {
          handleDaysChange(7);
        }}
      >
        7일
      </SelectDaysButton>
      <SelectDaysButton
        onClick={() => {
          handleDaysChange(30);
        }}
      >
        30일
      </SelectDaysButton>
    </ChartDaysBtnContainer>
  );
}
