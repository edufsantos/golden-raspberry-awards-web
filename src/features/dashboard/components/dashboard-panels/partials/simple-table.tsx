import type { ReactNode } from "react";

type TableHeader = {
  key: string;
  label: string;
};

type SimpleTableProps<T> = {
  headers: TableHeader[];
  rows: T[];
  getRowKey: (row: T, index: number) => string | number;
  renderRow: (row: T) => ReactNode[];
  emptyMessage?: string;
};

const SimpleTable = <T,>({
  headers,
  rows,
  getRowKey,
  renderRow,
  emptyMessage = "Sem dados",
}: SimpleTableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-muted/50 text-left">
            {headers.map((header) => (
              <th
                key={header.key}
                className="h-10 border-b px-3 text-xs font-medium uppercase tracking-wide text-muted-foreground"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="border-b text-left last:border-b-0">
                {renderRow(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="h-10 px-3 text-foreground">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-4 text-muted-foreground" colSpan={headers.length}>
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export { SimpleTable };
