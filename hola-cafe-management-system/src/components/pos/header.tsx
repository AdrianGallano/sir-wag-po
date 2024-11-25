import React from 'react';
import SearchInput from '../search';
import PosFilter from './filter';

interface PosHeaderProps {
  onFilterChange: (categoryName: string) => void;
}

const PosHeader: React.FC<PosHeaderProps> = ({ onFilterChange }) => {
  return (
    <>
    <div className='mr-[26%]'>

      {/* Header */}
      <div className="text-gray-700 text-lg font-semibold mb-4 underline">
        You are currently attempting to make changes to your stocks.
        {/* Hola Cafe Point Of Sale */}
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <PosFilter onFilter={onFilterChange} />
      </div>

      <div className="flex justify-end mb-6">
        {/* Search */}
        <SearchInput />
      </div>
    </div>
    </>
  );
};

export default PosHeader;
