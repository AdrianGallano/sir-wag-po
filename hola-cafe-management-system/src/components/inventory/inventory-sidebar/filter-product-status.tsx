import React from 'react'

const FilterProductStatus = () => {
  return (
    <div className="mb-4">
      <h3 className="text-xs font-semibold">PRODUCT STATUS</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>All</span>
          <span className=" px-2 py-1 rounded-full">1708</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Active</span>
          <span className=" px-2 py-1 rounded-full">1232</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Inactive</span>
          <span className=" px-2 py-1 rounded-full">250</span>
        </button>
        <button className="flex items-center border justify-between bg-white hover:bg-gray-100 p-2 rounded text-xs">
          <span>Draft</span>
          <span className=" px-2 py-1 rounded-full">36</span>
        </button>
      </div>
    </div>
  )
}

export default FilterProductStatus