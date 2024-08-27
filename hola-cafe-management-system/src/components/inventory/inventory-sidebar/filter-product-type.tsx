import React from 'react'

const FilterProductType = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-400 text-sm font-semibold">PRODUCT TYPE</h3>
        <div className="flex flex-row space-x-2">
          <button className="w-full p-2 text-white bg-gray-800 rounded hover:bg-gray-600">
            Retail
          </button>
          <button className="w-full p-2 text-white bg-gray-800 rounded hover:bg-gray-600">
            Wholesale
          </button>
        </div>
      </div>
  )
}

export default FilterProductType