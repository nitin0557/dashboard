import React from "react";

type Column<T> = {
  header: string;
  accessor?: keyof T;            // field name
  render?: (row: T) => React.ReactNode;   // custom renderer
  className?: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
};

export function Table<T>({ data, columns, keyField }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow border">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            {columns.map((col) => (
              <th className="p-3" key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={String(row[keyField])}
              className="border-b hover:bg-gray-50"
            >
              {columns.map((col) => (
                <td key={col.header} className={`p-3 ${col.className || ""}`}>
                  {col.render
                    ? col.render(row)
                    : (row[col.accessor as keyof typeof row] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td className="p-4 text-center text-gray-500" colSpan={columns.length}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
