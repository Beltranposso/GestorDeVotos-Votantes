import { Calendar, MapPin, Users } from 'lucide-react';
import {RoleModal} from '../../component/MoadlRol/RoleModal'
import { Link } from "react-router-dom";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


const getStatusColor = (status) => {
  switch (status) {
    case 'Activa':
      return 'bg-blue-500';
      case 'Programada':
        return 'bg-amber-500';
        case 'Finalizada':
          return 'bg-green-500';
          default:
            return 'bg-gray-500';
          }
        };
        
        export default function SurveyCard({ survey, viewMode,id,title,date,Condominio,Estado}) {
          const headerColor = getStatusColor(survey); 
          const isListView = viewMode === 'list';
          const [isModalOpen, setIsModalOpen] = useState(false);
          const Cargo = localStorage.getItem('C');
          const decodedToken = atob(Cargo);

  return (
    <div>

      <button onClick={() => setIsModalOpen(true)} className='w-full text-start'>
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        role={'Votante'}
        estado={Estado}
        Rute={`/c/${id}`}
      />
   
    <Card className={`hover:shadow-lg transition-shadow duration-200 overflow-hidden ${
      isListView ? 'flex flex-col sm:flex-row ' : ''
    }`}>
      <div className={`${headerColor} ${isListView ? 'w-full sm:w-2 sm:h-auto' : 'h-2'}`} />
      <div className={`flex-1 ${isListView ? 'flex flex-col sm:flex-row items-center gap-4 p-4' : ''}`}>
        {!isListView && (
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                <p className="text-sm text-gray-500">{"Asamblea"}</p>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              Estado === 'Activa' ? 'bg-blue-100 text-blue-800' :
              Estado === 'Programada' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {Estado}
              </span>
            </div>
          </CardHeader>
        )}
        {isListView ? (
          <div className="flex-1 min-w-0  ">
            <div className="flex items-center justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-semibold truncate">{title}</h3>
                <p className="text-sm text-gray-500">{"Asamblea"}</p>
              </div>
              <span className={`shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                Estado === 'En curso' ? 'bg-blue-100 text-blue-800' :
                Estado === 'Programada' ? 'bg-amber-100 text-amber-800' :
                'bg-green-100 text-green-800'
              }`}>
                {Estado}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {date} 
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {Condominio}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {survey.attendees}
              </div>
            </div>
          </div>
        ) : (
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {date}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-2" />
                {Condominio}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-2" />
                {survey.attendees}
              </div>
            </div>
          </CardContent>
        )}
      </div>
    </Card>
    </button>


    </div>
  );
}