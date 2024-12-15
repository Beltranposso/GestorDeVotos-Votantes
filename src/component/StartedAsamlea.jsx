
import React from 'react';
import { Users, Gavel } from 'lucide-react';
const StartedAsamlea = () => {
    return (
        <div className="min-h-screen  bg-white flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-xl w-full">
          <div className="flex flex-col items-center space-y-6">
            <div className="flex items-center space-x-4">
              <Users className="w-12 h-12 text-blue-600" />
              <Gavel className="w-12 h-12 text-blue-600" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 tracking-wide">
              La asamblea ha comenzado
            </h1>
            
            <div className="w-24 h-1 bg-blue-500 rounded-full mt-4"></div>
            
            <p className="text-gray-600 text-center text-lg">
              Bienvenidos a todos los participantes
            </p>
          </div>
        </div> 
      </div>
    );
};

export default StartedAsamlea;

