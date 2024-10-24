const FilterProductType = () => {
  return (
    <div className="mb-4">
      <h3 className="text-gray-800 text-base font-semibold">PRODUCT TYPE</h3>
      <div className="flex flex-row space-x-2 mt-1">
        <button className="w-full text-xs border border-gray-400 p-2 text-black bg-white rounded-md hover:bg-gray-200 font-medium">
          Retail
        </button>
        <button className="w-full text-xs border border-gray-400 p-2 text-black bg-white rounded-md hover:bg-gray-200 font-medium">
          Wholesale
        </button>
      </div>
    </div>
  );
};

export default FilterProductType;
