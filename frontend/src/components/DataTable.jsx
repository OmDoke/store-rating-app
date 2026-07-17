import { useMemo, useState } from 'react';

const DataTable = ({ columns, data, filters, onFilterChange, filterFields }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === bValue) return 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      const aText = String(aValue ?? '').toLowerCase();
      const bText = String(bValue ?? '').toLowerCase();
      return sortConfig.direction === 'asc'
        ? aText.localeCompare(bText)
        : bText.localeCompare(aText);
    });
    return sorted;
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => {
      if (current.key === key) {
        return { key, direction: current.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div>
      {filterFields?.length > 0 && (
        <div className="mb-4 grid gap-3 md:grid-cols-4">
          {filterFields.map((field) => (
            <input
              key={field.key}
              className="rounded border p-2"
              placeholder={field.placeholder}
              value={filters?.[field.key] ?? ''}
              onChange={(e) => onFilterChange?.(field.key, e.target.value)}
            />
          ))}
        </div>
      )}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="cursor-pointer p-3" onClick={() => column.sortable !== false && handleSort(column.key)}>
                  {column.label}
                  {column.sortable !== false && <span className="ml-1">↕</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => (
              <tr key={row.id ?? rowIndex} className="border-t">
                {columns.map((column) => (
                  <td key={column.key} className="p-3">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
