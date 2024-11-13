import React from 'react'
import SearchInput from '../search'
import PosFilter from './filter'

const PosHeader = () => {
  return (
    <>
        {/* Header */}
        <div className="text-gray-700 text-lg font-semibold mb-4 underline">
          You are currently attempting to make changes to your stocks.
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <PosFilter/>
        </div>
        <div className="flex justify-end mb-6">
        {/* Search */}
        <SearchInput/>
        </div>
    </>
  )
}

export default PosHeader