import React from 'react'

const FilterProductPrice = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-400 text-sm font-semibold">PRICE</h3>
        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Minimum price" 
            className="w-full p-2 bg-gray-800 hover:bg-gray-600 text-white rounded"
          />
          <input 
            type="text" 
            placeholder="Maximum price" 
            className="w-full p-2 bg-gray-800 hover:bg-gray-600 text-white rounded"
          />
        </div>
      </div>
  )
}

export default FilterProductPrice