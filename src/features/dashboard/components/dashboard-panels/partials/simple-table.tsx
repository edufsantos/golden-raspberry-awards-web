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
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50 text-left">
            {headers.map((header) => (
              <th key={header.key} className="border-b border-slate-200 px-3 py-2 font-medium text-slate-700">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={getRowKey(row, index)} className="text-left odd:bg-white even:bg-slate-50/30">
                {renderRow(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="border-b border-slate-100 px-3 py-2 text-slate-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-4 text-slate-500" colSpan={headers.length}>
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
