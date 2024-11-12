interface StockStatusProps {
  totalStock: number;
  recentStock: string;
  expirationDate: string;
  stockLevel: number;
}

const StockStatus = ({
  totalStock,
  recentStock,
  expirationDate,
  stockLevel,
}: StockStatusProps) => {
  return (
    <>
      <div className="w-full flex flex-col justify-start px-2.5">
        <p className="text-sm text-nowrap tracking-wide font-normal">
          Total Stock:
          <span className="font-semibold"> {totalStock}</span>
        </p>
        <p className="text-sm text-nowrap tracking-wide font-normal">
          Most Recent Stock:
          <span className="font-semibold"> Granula Bar</span>
        </p>
        <p className="text-sm text-nowrap tracking-wide font-normal">
          Soonest Expiration Date:
          <span className="font-semibold"> December 2, 2024</span>
        </p>

        <div className="relative mt-1.5">
          <div className="mb-2 flex h-2 overflow-hidden rounded-full w-1/2 text-xs gap-1">
            <div className="bg-green-500 transition-all duration-500 ease-out w-[50%] rounded-full"></div>
            <div className="bg-yellow-500 transition-all duration-500 ease-out w-[30%]  rounded-full"></div>
            <div className="bg-red-500 transition-all duration-500 ease-out w-[20%]  rounded-full"></div>
          </div>
          <div className="mb-2 flex items-center gap-3 text-xs">
            <div className="text-gray-600 flex items-center">
              <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
              <p className="text-[12px] text-nowrap tracking-wide font-normal">
                In Stock: <span className="">16</span>
              </p>
            </div>
            <div className="text-gray-600 flex items-center">
              <span className="flex w-3 h-3 me-1.5 bg-yellow-500 rounded-full"></span>{" "}
              <p className="text-[12px] text-nowrap tracking-wide font-normal">
                Low Stock: <span className="">16</span>
              </p>
            </div>
            <div className="text-gray-600 flex items-center">
              <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>{" "}
              <p className="text-[12px] text-nowrap tracking-wide font-normal">
                Out of Stock: <span className="">16</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockStatus;
