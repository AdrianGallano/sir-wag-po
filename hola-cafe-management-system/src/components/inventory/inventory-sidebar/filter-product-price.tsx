import React from 'react'

const FilterProductPrice = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-800 text-xs font-semibold">PRICE</h3>
        <div className="space-y-2">
          <input 
            type="text" 
            placeholder="Minimum price" 
            className="w-full text-xs p-2 bg-white border hover:bg-gray-100 text-black rounded"
          />
          <input 
            type="text" 
            placeholder="Maximum price" 
            className="w-full text-xs p-2 bg-white border hover:bg-gray-100 text-black rounded"
          />
        </div>
      </div>
  )
}

export default FilterProductPrice