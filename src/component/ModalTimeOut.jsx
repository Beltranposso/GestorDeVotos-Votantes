import React, { useEffect, useState } from 'react';
import { Timer, X } from 'lucide-react';

export default function TimeoutModal({ isOpen }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Mostrar el modal cuando `isOpen` sea `true`

      const timer = setTimeout(() => {
        setIsVisible(false);
        window.location.reload(); // Ocultar el modal después de 3 segundos
      }, 3000);

      return () => clearTimeout(timer); // Limpiar el timer si `isOpen` cambia
    }
  }, [isOpen]);

  const handleClose = () => {

    window.location.reload();
    setIsVisible(false);
    
     // Cerrar el modal manualmente
  };

  // No renderizar el modal si no está visible
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4 animate-in fade-in slide-in-from-bottom-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Timer className="w-6 h-6 text-red-500" />
          <h2 className="text-xl font-semibold text-gray-900">Votacion Finalizada</h2>
        </div>
        <p className="text-gray-600 mb-6">
          La votación ha finalizado....
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
