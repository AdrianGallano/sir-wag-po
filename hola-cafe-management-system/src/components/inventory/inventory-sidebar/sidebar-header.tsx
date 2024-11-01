import { Product } from "@/models/product";

const SidebarHeader = () => {
  // function for counting products
  const onProductCount = () => {
    const products: Product[] = JSON.parse(localStorage.getItem("products") || "[]");
    return products.length;
  };
  return (
    <div className="w-full p-0 bg-white text-black flex flex-row  justify-between items-center mb-4 ">
      <h2 className="text-2xl font-bold text-slate-800">Product</h2>
      <p className="text-sm text-white font-medium  p-1.5 border border-gray-800 rounded-md bg-gray-800">
        {onProductCount()} Total Products
      </p>
    </div>
  );
};

export default SidebarHeader;
