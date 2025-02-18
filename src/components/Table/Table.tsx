import './Table.css';

import { FC, ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
  className?: string;
}

interface TableHeaderProps {
  columns: string[];
}

interface TableBodyProps {
  children: ReactNode;
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

interface TableCellProps {
  children: ReactNode;
}

export const Table: FC<TableProps> = ({ children, className }) => {
  return <table className={className}>{children}</table>;
};

const Header: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>{columns?.map((col) => <th key={col}>{col}</th>)}</tr>
    </thead>
  );
};

const Body: FC<TableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Row: FC<TableRowProps> = ({ children, onClick }) => {
  return <tr onClick={onClick}>{children}</tr>;
};

const Cell: FC<TableCellProps> = ({ children }) => {
  return <td>{children}</td>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
