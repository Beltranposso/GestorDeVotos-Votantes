import { Grid, List } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ViewToggle({ viewMode, onViewChange }) {
  return (
    <div className="flex justify-between">
      <h2 className='text-xl'>Asambleas Disponibles</h2>
      <Tabs defaultValue={viewMode} className="w-[100px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid" onClick={() => onViewChange('grid')}>
            <Grid className="h-4 w-4" />
          </TabsTrigger>
          <TabsTrigger value="list" onClick={() => onViewChange('list')}>
            <List className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

    </div>
  );
}