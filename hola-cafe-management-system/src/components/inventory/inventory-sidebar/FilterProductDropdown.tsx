import React from "react";
import { products } from "../models/products";
// Imported dependencies
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Prop
interface FilterProps {
  onFilterChange: (filter: { category?: string; stockStatus?: string }) => void;
}

const FilterProductDropdown: React.FC<FilterProps> = ({ onFilterChange }) => {

  // // Function to get unique categories of products 
  // const getCategories = () => {
  //   const categories = products.map(product => product.category);
  //   return [...new Set(categories)];
  // };
  // const uniqueCategories = getCategories();

  // // Function to get unique stock statuses
  // const getStock = () => {
  //   const stocks = products.map(product => product.stock_status);
  //   return [...new Set(stocks)];
  // };
  // const uniqueStocks = getStock();

  // Function to change category
  const handleCategoryChange = (value: string) => {
    onFilterChange({ category: value === 'all' ? '' : value, stockStatus: '' }); // Ensure the stock status is reset
    console.log("Category selected:", value);
  };
  
  // Function to change stock status
  const handleStockChange = (value: string) => {
    onFilterChange({ category: '', stockStatus: value === 'all' ? '' : value }); // Ensure the category is reset
    console.log("Stock status selected:", value);
  };

  return (
    <div>
      {/* Sort */}
      {/* <div className="mb-4">
        <h3 className="text-gray-800 text-xs font-semibold">SORT BY</h3>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Alphabetical: A-Z" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Alphabetical: A - Z</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}

      {/* Stock */}
      <div className='mb-4'>
        <h3 className="text-gray-800 text-xs font-semibold">STOCK ALERT</h3>
        <Select onValueChange={handleStockChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Stocks Status</SelectLabel>
              <SelectItem value="all">All stock</SelectItem> {/* Default value */}
              {/* {uniqueStocks.map((stock, index) => (
                <SelectItem key={index} value={stock}>
                  {stock}
                </SelectItem>
              ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className='mb-4'>
        <h3 className="text-gray-800 text-xs font-semibold">CATEGORY</h3>
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All product" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='text-xs'>
              <SelectLabel>Categories</SelectLabel>
              <SelectItem value="all">All product</SelectItem> {/* Default value */}
              {/* {uniqueCategories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))} */}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterProductDropdown;
