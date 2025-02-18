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
  return (
    <table className={'w-full border-collapse' + className}>{children}</table>
  );
};

const Header: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
      <tr>
        {columns?.map((col) => (
          <th key={col} className="px-6 py-3 text-left">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Body: FC<TableBodyProps> = ({ children }) => {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
};

const Row: FC<TableRowProps> = ({ children, onClick }) => {
  return (
    <tr onClick={onClick} className={'bg-gray-50'}>
      {children}
    </tr>
  );
};

const Cell: FC<TableCellProps> = ({ children }) => {
  return <td className="px-6 py-4">{children}</td>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
