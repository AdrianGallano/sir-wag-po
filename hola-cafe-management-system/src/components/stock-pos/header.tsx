import React, { useState } from 'react';
import PosFilter from './filter';
import { Input } from '../ui/input';

interface StockPosHeaderProps {
  onFilterChange: (categoryName: string) => void;
  onSearchChange: (searchTerm: string) => void; // Add a prop for search term
}

const PosHeader: React.FC<StockPosHeaderProps> = ({ onFilterChange, onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchChange(value); // Trigger search filtering
  };

  return (
    <div className="mr-[26%]">
      {/* Header */}
      <div className="text-gray-700 text-lg font-semibold mb-4 underline">
        Hola Café's Stock Manager
      </div>



      {/* Search Section */}
      <div className="flex justify-end mb-6">
        <Input
          placeholder="Filter stocks..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm rounded-full"
        />
      </div>
    </div>
  );
};

export default PosHeader;
