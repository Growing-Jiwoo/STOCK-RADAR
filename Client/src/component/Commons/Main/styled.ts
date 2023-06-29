import styled from 'styled-components';

export const TableStyle = styled.div`
  .table {
    margin: 20px;
  }

  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    font-size: 12px;
  }

  table td,
  table th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  table tr:nth-of-type(even) {
    background-color: #f8f8f8;
  }

  table tr:hover {
    background-color: #f0f0f0;
  }

  table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #45bda9;
    color: #fff;
  }

  table tr {
    cursor: pointer;
  }

  table thead {
    font-size: 16px;
  }
`;
