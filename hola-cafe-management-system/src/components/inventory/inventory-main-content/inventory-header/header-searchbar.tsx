import React from 'react'
import { Grid2X2, Search, List } from 'lucide-react'
import { Input } from "@/components/ui/input"

const HeaderSearchbar = () => {
  return (
    <div className='flex flex-row space-x-2 h-[40px] items-center'>      
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[800px]"/>
      </div>
      <div className='flex flex-row w-full border rounded-lg bg-background md:w-[20px] lg:w-[90px]'>
        <button className='border-transparent hover:border-2 hover:bg-gray-100 rounded-lg bg-background p-2 h-[40px] w-full'><List className="h-full w-full text-muted-foreground" /></button>
        <button className='border-transparent hover:border-2 hover:bg-gray-100 rounded-lg bg-background p-2 h-[40px] w-full'><Grid2X2 className="h-full w-full text-muted-foreground" /></button>
      </div>
    </div>
  )
}

export default HeaderSearchbar