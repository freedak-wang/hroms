import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface DataTableProps {
  data: any[];
  columns: { key: string; label: string }[];
  onEdit: (item: any) => void;
  onDelete: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((column) => (
              <th key={column.key} className="py-3 px-6 text-left">{column.label}</th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              {columns.map((column) => (
                <td key={column.key} className="py-3 px-6 text-left whitespace-nowrap">
                  {item[column.key]}
                </td>
              ))}
              <td className="py-3 px-6 text-center">
                <div className="flex item-center justify-center">
                  <button onClick={() => onEdit(item)} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => onDelete(item)} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;