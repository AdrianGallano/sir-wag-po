import React from 'react'

const FilterProductSorting = () => {
  return (
      <div className='mb-4'>
        <h3 className="text-gray-400 text-sm font-semibold">SORT BY</h3>
          <select className="w-full p-2 bg-gray-800 hover:bg-gray-600 text-white rounded">
            <option>Alphabetical: A-Z</option>
          </select>
      </div>
  )
}

export default FilterProductSorting