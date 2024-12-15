import { Filter, Search, SortAsc } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";



export function Filters({
  totalResults,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  typeFilter,
  onTypeChange
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative ">
           
            <Input
              placeholder="Buscar encuestas..."
              className=" pr-4 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 lg:w-auto">
          
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="Activa">En curso</SelectItem>
              <SelectItem value="Programada">Programada</SelectItem>
              <SelectItem value="Finalizada">Completada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm" className="flex-1 sm:flex-none justify-center">
            <SortAsc className="h-4 w-4 mr-2" />
            Ordenar
          </Button>
        </div>
        <p className="text-sm text-gray-500 text-center sm:text-left">
          Mostrando {totalResults} resultados
        </p>
      </div>
    </div>
  );
}