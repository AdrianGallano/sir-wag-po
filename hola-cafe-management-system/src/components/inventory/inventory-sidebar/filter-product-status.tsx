import { Product } from "@/models/product";

const FilterProductStatus = () => {
  // function on counting products
  const onProductCount = () => {
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    return products.length;
  };

  return (
    <div className="mb-4">
      <h3 className="text-base text-gray-800 font-semibold">PRODUCT STATUS</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button className="flex items-center border border-gray-400 justify-between bg-white hover:bg-gray-200 p-2 rounded-md text-xs font-medium">
          <span>All</span>
          <span className=" px-2 py-1 rounded-full  ">{onProductCount()}</span>
        </button>
        <button className="flex items-center border border-gray-400 justify-between bg-white hover:bg-gray-200 p-2 rounded-md text-xs font-medium">
          <span>Active</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
        <button className="flex items-center border border-gray-400 justify-between bg-white hover:bg-gray-200 p-2 rounded-md text-xs font-medium">
          <span>Inactive</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
        <button className="flex items-center border border-gray-400 justify-between bg-white hover:bg-gray-200 p-2 rounded-md text-xs font-medium">
          <span>Draft</span>
          <span className=" px-2 py-1 rounded-full">{onProductCount()}</span>
        </button>
      </div>
    </div>
  );
};

export default FilterProductStatus;
