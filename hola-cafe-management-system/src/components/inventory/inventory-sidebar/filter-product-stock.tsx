import React from 'react'
//imported dependencies
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const FilterProductStock = () => {
  return (
    <div className='mb-4'>
        <h3 className="text-gray-800 text-xs font-semibold">STOCK ALERT</h3>
        <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="All stock" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
  )
}

export default FilterProductStock