import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      <Loader2 className="w-12 h-12 text-gray-700 animate-spin" />
      <h2 className="mt-4 text-xl text-gray-700">Cargando</h2>
    </div>
  );
}