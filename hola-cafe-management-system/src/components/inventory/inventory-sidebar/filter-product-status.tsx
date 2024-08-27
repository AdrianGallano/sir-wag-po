import React from 'react'

const FilterProductStatus = () => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold">PRODUCT STATUS</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="flex items-center justify-between bg-gray-800 hover:bg-gray-600 p-2 rounded text-sm">
          <span>All</span>
          <span className="bg-green-500 px-2 py-1 rounded-full">1708</span>
        </button>
        <button className="flex items-center justify-between bg-gray-800 hover:bg-gray-600 p-2 rounded text-sm">
          <span>Active</span>
          <span className="bg-green-500 px-2 py-1 rounded-full">1232</span>
        </button>
        <button className="flex items-center justify-between bg-gray-800 hover:bg-gray-600 p-2 rounded text-sm">
          <span>Inactive</span>
          <span className="bg-gray-700 px-2 py-1 rounded-full">250</span>
        </button>
        <button className="flex items-center justify-between bg-gray-800 hover:bg-gray-600 p-2 rounded text-sm">
          <span>Draft</span>
          <span className="bg-gray-700 px-2 py-1 rounded-full">36</span>
        </button>
      </div>
    </div>
  )
}

export default FilterProductStatus