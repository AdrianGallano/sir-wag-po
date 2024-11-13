import React from 'react'
import PosCards from './cards'

const PosMenus = () => {
  return (
    <>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Beverages</h2>
          <div className="grid grid-cols-3 gap-4">
        {/* Cards */}
          <PosCards/>
        </div>
        </div>
    </>
  )
}

export default PosMenus