import { StyledTableCell } from './styled';

interface StockTradingTableRowProps {
  variation: number;
  price: number;
  isNegative: boolean;
}

export function StockTradingTableRow({
  variation,
  price,
  isNegative,
}: StockTradingTableRowProps) {
  return (
    <tr>
      <td>
        <StyledTableCell isNegative={isNegative}>
          ${price.toFixed(2)}
        </StyledTableCell>
      </td>
      <td>
        <StyledTableCell isNegative={isNegative}>
          {variation.toFixed(2)}%
        </StyledTableCell>
      </td>
    </tr>
  );
}
