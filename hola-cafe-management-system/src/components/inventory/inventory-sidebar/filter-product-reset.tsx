import React from 'react'

interface ResetButtonProps {
  onReset: () => void;
}

const FIlterReset: React.FC<ResetButtonProps> = ({onReset}) => {
  return (
    <button onClick={onReset} className="w-full p-2 mt-4 text-white bg-gray-900 rounded hover:bg-black">
        Reset Filters
      </button>
  )
}

export default FIlterReset