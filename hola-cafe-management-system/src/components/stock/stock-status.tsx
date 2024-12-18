import { useStock } from "@/context/stockContext";
import { useEffect, useState } from "react";

const StockStatus = () => {
  const { stock } = useStock();

  const totalStock = stock.length;
  const recentStock = stock[0]?.name || "No stocks";
  const soonestExpiration = stock.reduce((earliest, current) => {
    if (!earliest || new Date(current.expiration_date) < new Date(earliest)) {
      return current.expiration_date;
    }
    return earliest;
  }, "");

  const stockCounts = stock.reduce(
    (acc, item) => {
      const quantity = Number(item.quantity);
      if (quantity === 0) {
        acc.outOfStock++;
      } else if (quantity <= 20) {
        acc.lowStock++;
      } else {
        acc.inStock++;
      }
      return acc;
    },
    { inStock: 0, lowStock: 0, outOfStock: 0 }
  );

  const total = totalStock || 1;
  const inStockPercentage = (stockCounts.inStock / total) * 100;
  const lowStockPercentage = (stockCounts.lowStock / total) * 100;
  const outOfStockPercentage = (stockCounts.outOfStock / total) * 100;

  const formatDate = (dateString: string) => {
    if (!dateString) return "No expiration date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="w-full  flex-col justify-start px-2.5">
        <div className="sm:block hidden">
          <p className="text-sm text-nowrap tracking-wide font-normal">
            Total Stock:
            <span className="font-semibold"> {totalStock}</span>
          </p>
          <p className="text-sm text-nowrap tracking-wide font-normal">
            Most Recent Stock:
            <span className="font-semibold"> {recentStock}</span>
          </p>
          <p className="text-sm text-nowrap tracking-wide font-normal">
            Soonest Expiration Date:
            <span className="font-semibold">
              {" "}
              {formatDate(soonestExpiration)}
            </span>
          </p>
        </div>

        {stock.length != 0 && (
          <div className="relative ">
            <div className="mb-2 flex h-2 overflow-hidden rounded-full w-1/2 text-xs gap-1">
              <div
                className="bg-green-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${inStockPercentage}%` }}
              ></div>
              <div
                className="bg-yellow-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${lowStockPercentage}%` }}
              ></div>
              <div
                className="bg-red-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${outOfStockPercentage}%` }}
              ></div>
            </div>
            <div className="mb-2 flex items-center gap-3 text-xs">
              <div className="text-gray-600 flex items-center">
                <span className="flex w-3 h-3 me-1.5 bg-green-500 rounded-full"></span>
                <p className="text-[12px] text-nowrap tracking-wide font-normal">
                  In Stock: <span className="">{stockCounts.inStock}</span>
                </p>
              </div>
              <div className="text-gray-600 flex items-center">
                <span className="flex w-3 h-3 me-1.5 bg-yellow-500 rounded-full"></span>{" "}
                <p className="text-[12px] text-nowrap tracking-wide font-normal">
                  Low Stock: <span className="">{stockCounts.lowStock}</span>
                </p>
              </div>
              <div className="text-gray-600 flex items-center">
                <span className="flex w-3 h-3 me-1.5 bg-red-500 rounded-full"></span>{" "}
                <p className="text-[12px] text-nowrap tracking-wide font-normal">
                  Out of Stock:{" "}
                  <span className="">{stockCounts.outOfStock}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StockStatus;
