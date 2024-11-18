import React from 'react'
import PlaceHolder from '../../assets/images/hola_logo.jpg'

const PosCards = () => {
  return (
    <>
            {/* Single Item */}
            {Array(6).fill(null).map((_, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-md">
                <img
                  src={PlaceHolder}
                  alt="Product"
                  className="mb-4 rounded-md w-full h-56"
                />
                <div className='flex justify-between'>
                <div className="text-sm mb-2 text-gray-500">#BCD312</div>
                <span className="h-4 w-20 bg-green-500 rounded-md border border-gray-300"></span>
                </div>
                <div className="text-2xl font-semibold mb-1 underline">15 Granula Bar</div>
                <div className="text-sm text-gray-700 mb-1">
                  Expires at <span className="font-semibold underline">December 2 2024</span>
                </div>
                <div className="text-sm text-gray-700 mb-4">
                  Date Shelved <span className="font-semibold underline">January 2 2024</span>
                </div>
                <div className="flex items-center justify-between pl-20 pr-20">
                <button className="px-2 py-1 text-lg font-bold bg-transparent rounded">-</button>
                <div className="px-4 py-1 bg-transparent rounded-md border border-gray-300">
                    <span className="text-lg font-semibold">1</span>
                </div>
                <button className="px-2 py-1 text-lg font-bold bg-transparent rounded">+</button>
                </div>
              </div>
            ))}
    </>
  )
}

export default PosCards