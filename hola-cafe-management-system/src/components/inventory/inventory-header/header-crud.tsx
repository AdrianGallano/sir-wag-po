import React from 'react'
import { Ellipsis } from 'lucide-react'

const HeaderCrud = () => {
  return (
    <div className='ml-8 flex flex-row space-x-2'>
        <div className='flex flex-row w-full rounded-lg bg-background md:w-[20px] lg:w-[200px] space-x-2'>
            <button className='border hover:bg-gray-100 hover:border-gray-100 rounded-lg bg-background p-2 h-[40px] w-[25%]'><Ellipsis className="h-full w-full text-muted-foreground" /></button>
            <button className='border hover:bg-gray-900 hover:border-gray-100 rounded-lg bg-gray-800 text-white p-2 h-[40px] w-full text-sm  text-muted-foreground'>Add Products</button>
        </div>
    </div>
  )
}

export default HeaderCrud