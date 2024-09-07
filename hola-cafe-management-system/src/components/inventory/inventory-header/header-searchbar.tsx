import React from 'react'
import { Grid2X2, Search, List } from 'lucide-react'
import { Input } from "@/components/ui/input"
import SearchInput from '@/components/search'

interface HeaderSearchbarProps {
  onLayoutChange: (layout: 'horizontal' | 'vertical') => void;
}

const HeaderSearchbar: React.FC<HeaderSearchbarProps> = ({onLayoutChange}) => {
  return (
    <div className='flex flex-row space-x-2 h-[40px] items-center w-full'>
      {/* Search input */}
      <div className="relative flex-grow">
        <SearchInput />
      </div>
      {/* Buttons beside the search bar */}
      <div className='flex flex-row border rounded-lg bg-background md:w-[20px] lg:w-[90px]'>
        <button onClick={() => {onLayoutChange('horizontal')}} className='border-transparent hover:border-2 hover:bg-gray-100 rounded-lg bg-background p-2 h-[40px] w-full'><List className="h-full w-full text-muted-foreground" /></button>
        <button onClick={() => {onLayoutChange('vertical')}} className='border-transparent hover:border-2 hover:bg-gray-100 rounded-lg bg-background p-2 h-[40px] w-full'><Grid2X2 className="h-full w-full text-muted-foreground" /></button>
      </div>
    </div>
  )
}

export default HeaderSearchbar