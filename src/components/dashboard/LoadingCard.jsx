import React, { useState, useEffect } from 'react';

const LoadingCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="h-[90px] bg-white text-white rounded flex flex-col items-center justify-center mb-1">
      {isLoading && (
        <div className="animate-pulse">
          <div className="font-bold bg-gray-200 h-4 w-16 mb-2 rounded"></div>
          <div className="font-semibold bg-gray-200 h-6 w-6 rounded"></div>
        </div>
      ) }
    </div>
  );
};

export default LoadingCard;
