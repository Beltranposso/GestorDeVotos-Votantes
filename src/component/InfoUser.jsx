import React from 'react';
import { User, Percent, Users, Calculator } from 'lucide-react';



export default function InfoContainer({ nombre, apoderado, coeficiente, coeficienteTotal }) {
  return (
    <div className="bg-white rounded-lgp-4 w-full max-w-[200px] sm:max-w-[300px] sm:p-6">
    
      
      <div className="grid gap-1.5 sm:gap-3">
        <div className="flex items-center space-x-1.5 sm:space-x-3 p-1.5 sm:p-2.5 bg-blue-50 rounded-sm sm:rounded text-xs sm:text-sm">
          <User className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-gray-600 font-medium">Nombre:</span>
            <span className="ml-1 sm:ml-2 text-gray-800">{nombre}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-3 p-1.5 sm:p-2.5 bg-blue-50 rounded-sm sm:rounded text-xs sm:text-sm">
          <Users className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-gray-600 font-medium">Apoderado:</span>
            <span className="ml-1 sm:ml-2 text-gray-800">{apoderado}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-3 p-1.5 sm:p-2.5 bg-blue-50 rounded-sm sm:rounded text-xs sm:text-sm">
          <Percent className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-gray-600 font-medium">Coef:</span>
            <span className="ml-1 sm:ml-2 text-gray-800">{coeficiente}</span>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-3 p-1.5 sm:p-2.5 bg-blue-50 rounded-sm sm:rounded text-xs sm:text-sm">
          <Calculator className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-gray-600 font-medium">Coef Total:</span>
            <span className="ml-1 sm:ml-2 text-gray-800">{coeficienteTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}