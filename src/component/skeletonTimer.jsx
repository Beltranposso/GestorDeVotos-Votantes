import React from 'react';
import { Timer } from 'lucide-react';

export default function CountdownSkeleton({estado}) {
  return (
    <div className={estado ? "hidden" : "flex flex-col items-center space-y-2 bg-white rounded-lg shadow-lg p-3 sm:p-4 w-[90%] sm:w-auto animate-pulse"}>
   
    

    
    <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-300 rounded" />
  </div>
  );
}