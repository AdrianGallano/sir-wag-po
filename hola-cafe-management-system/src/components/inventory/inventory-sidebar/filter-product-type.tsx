import React from 'react'

const FilterProductType = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-800 text-xs font-semibold">PRODUCT TYPE</h3>
        <div className="flex flex-row space-x-2">
          <button className="w-full text-xs border p-2 text-black bg-white rounded hover:bg-gray-100">
            Retail
          </button>
          <button className="w-full text-xs border p-2 text-black bg-white rounded hover:bg-gray-100">
            Wholesale
          </button>
        </div>
      </div>
  )
}

export default FilterProductType