import { useState } from "react";

export default function LoadingChart() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="h-[100px] bg-white text-white rounded flex flex-col items-center justify-around w-full mb-1">
      {isLoading && (
        <div className="">
          <div className="animate-pulse flex gap-2">
            <div className="font-bold bg-gray-200 h-[80px] w-10 mb-2 rounded"></div>
            <div className="font-semibold bg-gray-200 h-[80px] w-10 rounded"></div>
            <div className="font-semibold bg-gray-200 h-[80px] w-10 rounded"></div>
            <div className="font-semibold bg-gray-200 h-[80px] w-10 rounded"></div>
          </div>
          <div className="animate-pulse flex gap-2">
            <div className="font-bold bg-gray-200 h-[10px] w-[90%] mx-auto mb-2 rounded"></div>
          </div>
        </div>
      )}
    </div>
  );
}
