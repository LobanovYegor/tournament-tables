import { FC, HTMLProps, PropsWithChildren } from 'react';

type TableProps = PropsWithChildren<HTMLProps<HTMLTableElement>> & {
  className?: string;
};

type TableHeaderProps = PropsWithChildren<
  HTMLProps<HTMLTableSectionElement>
> & {
  columns: string[];
};

type TableBodyProps = PropsWithChildren<HTMLProps<HTMLTableSectionElement>>;

type TableRowProps = PropsWithChildren<HTMLProps<HTMLTableRowElement>> & {
  onClick?: () => void;
};

type TableCellProps = PropsWithChildren<HTMLProps<HTMLTableCellElement>> & {
  onClick?: () => void;
};

export const Table: FC<TableProps> & {
  Header: FC<TableHeaderProps>;
  Body: FC<TableBodyProps>;
  Row: FC<TableRowProps>;
  Cell: FC<TableCellProps>;
} = ({ children, ...props }) => {
  return (
    <table className="border-collapse" {...props}>
      {children}
    </table>
  );
};

const Header: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
      <tr>
        {columns?.map((col) => (
          <th key={col} className="px-2 py-2 bg-primary-300">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const Body: FC<TableBodyProps> = ({ children, ...props }) => {
  return <tbody {...props}>{children}</tbody>;
};

const Row: FC<TableRowProps> = ({ children, onClick, ...props }) => {
  return (
    <tr onClick={onClick} {...props}>
      {children}
    </tr>
  );
};

const Cell: FC<TableCellProps> = ({ children, ...props }) => {
  return <td {...props}>{children}</td>;
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
