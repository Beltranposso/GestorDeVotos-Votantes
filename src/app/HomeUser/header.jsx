import { Calendar, Plus } from 'lucide-react';

import { Button } from "@/components/ui/button"

export function Header({onclick}) {
  return (
    <header className="bg-white border-b  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900"> Asambleas</h1>
          <div className="flex items-center gap-2 sm:gap-4">
          {/*   <Button variant="outline" className="flex-1 sm:flex-none justify-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Calendario</span>
            </Button> */} 
           
          </div>
        </div>
      </div>
    </header>
  );
}