import React, { useEffect, useState } from "react";
import LoadingCard from "./LoadingCard";

export default function Board() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // You can adjust the delay as needed

    return () => clearTimeout(timeout);
  }, []);
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-center justify-center mb-3 gap-5 text-center">
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
        <LoadingCard />
      </div>
    );
  }
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 items-center justify-center mb-3 gap-5 text-center">
        <div className="h-[90px] bg-green-500 text-white rounded flex flex-col items-center justify-center ">
          <div className="font-bold">Products</div>
          <div className="font-semibold">5</div>
        </div>

        <div className="h-[90px] bg-yellow-500 text-white rounded flex flex-col items-center justify-center shadow ">
          <div className="font-bold">Orders</div>
          <div className="font-semibold">3</div>
        </div>

        <div className="h-[90px] bg-blue-500 text-white rounded flex flex-col items-center justify-center shadow ">
          <div className="font-bold">Sales (This Week)</div>
          <div className="font-semibold">1</div>
        </div>

        <div className="h-[90px] bg-rose-500 text-white rounded flex flex-col items-center justify-center shadow ">
          <div className="font-bold">Total Earning</div>
          <div className="font-semibold">12,000 ETB</div>
        </div>
      </div>
    </div>
  );
}
