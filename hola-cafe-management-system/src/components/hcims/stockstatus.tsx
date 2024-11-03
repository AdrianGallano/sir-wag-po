import { stat } from "fs";
import React from "react";

interface StockStatusProps {
  quantity: number;
  threshold: number;
}

const StockStatus: React.FC<StockStatusProps> = ({ quantity, threshold }) => {
  const percentage = Math.min((quantity / threshold) * 100);

  //   need a better way to determine the status of the stock
  const getStatus = () => {
    if (quantity === 0)
      return {
        label: "Out of Stock",
        color: "text-rose-500",
        ringColor: "#e11d48",
      };
    if (quantity > 0 && quantity <= threshold * 0.1)
      return {
        label: "Low Stock",
        color: "text-yellow-500",
        ringColor: "#eab308",
      };
    return {
      label: "In Stock",
      color: "text-green-500",
      ringColor: "#22c55e",
    };
  };

  const status = getStatus();
  const radius = 20; // Radius of the circular progress
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center justify-center space-x-3 border border-gray-300 px-4 py-6 w-full rounded-md  ">
      {/* Circular Progress Indicator */}
      <div className="flex justify-center items-center">
        <div className="relative w-32 h-32">
          <div
            className="absolute z-50 inset-0 rounded-full border-8"
            style={{
              borderColor: status.ringColor,
            }}
          ></div>
          <span className="absolute inset-0 flex items-center justify-center text-3xl font-semibold text-gray-700">
            {percentage.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* Stock Status Label */}
      <div>
        <p className={`text-lg font-semibold ${status.color}`}>
          {status.label}
        </p>
        <p className="text-gray-500 text-sm">
          ({quantity} / {threshold})
        </p>
      </div>
    </div>
  );
};

export default StockStatus;
