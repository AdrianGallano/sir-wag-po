import React from 'react'

const FilterProductStock = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-400 text-sm font-semibold">STOCK ALERT</h3>
        <select className="w-full p-2 bg-gray-800 hover:bg-gray-600 text-white rounded">
          <option>All stock</option>
        </select>
      </div>
  )
}

export default FilterProductStock