const FilterProductPrice = () => {
  return (
    <div className="mb-4">
      <h3 className="text-gray-800 text-base font-semibold">PRICE</h3>
      <div className="space-y-2 mt-1">
        <input
          type="text"
          placeholder="Minimum price"
          className="w-full text-xs px-2 py-2.5  bg-white border border-gray-400 hover:bg-gray-200 text-black rounded-md"
        />
        <input
          type="text"
          placeholder="Maximum price"
          className="w-full text-xs px-2 py-2.5  bg-white border border-gray-400 hover:bg-gray-200 text-black rounded-md"
        />
      </div>
    </div>
  );
};

export default FilterProductPrice;
