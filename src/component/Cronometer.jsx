import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import CountdownSkeleton  from './skeletonTimer';


export default function CountdownTimer({seconds,isLoading,estado}) {



   if (isLoading) {
    return <CountdownSkeleton  estado={estado}/>;
  } 

  return (

    <div className={estado ? "hidden" : "flex flex-col items-center space-y-2 text-center bg-gray-100 rounded-lg shadow-lg p-3 sm:p-4 w-[90%] sm:w-auto"}>
  

     
      <div  className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600">
        {seconds}
      </div>
      
      <p className="text-xs sm:text-sm text-gray-600">
        {seconds === 1 ? 'segundo' : 'segundos'} restantes
      </p>
    </div>

    
  );
}