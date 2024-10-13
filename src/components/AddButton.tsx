import React from 'react';
import { Plus } from 'lucide-react';

interface AddButtonProps {
  onClick: () => void;
  label: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
    >
      <Plus size={20} className="mr-2" />
      <span>{label}</span>
    </button>
  );
};

export default AddButton;