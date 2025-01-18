import React,{useEffect, useState} from 'react';
import { X } from 'lucide-react';
import { RoleIcon } from './InconRole';
import { RoleBadge } from './RoleBadge';
import {  getRoleColors } from './types.js';
import { Link } from 'react-router-dom';
import {URI23} from '../../services/conexiones';
import axios from 'axios';






export function RoleModal({ isOpen, onClose, role, Rute,estado }) {
  if (!isOpen) return null;

  const colors = getRoleColors(role);
  const [message, setMessage] = useState('');
  const [estate,setestate] = useState(false)
  const [Asistencia, setAsistencia] = useState('');


  const Getpermiso = async () => {
    try {
        const response = await axios.get(URI23, {
            withCredentials: true, // Necesario para enviar cookies al backend          
        });

     

        setAsistencia(response.data.data);
    } catch (error) {
        console.error("Error al obtener el valor de la columna:", 
                      error.response?.data?.message || error.message);

             
    }
};



useEffect(() => {

if(role ==="Operador de registro"){

if(Asistencia === 'Presente'){

setMessage('Ya puedes entrar');
setestate(true);
}else if(Asistencia === '' ){
  setMessage('');
}else if(Asistencia === 'Ausente'){
  setMessage('Espere a que el coordinador o administrador le den permisos de Asistencia');
}



}else{
  setMessage('');
}

  
}, [Asistencia]);

const setdeletemenssage = () =>{
  
  setMessage('')


  }





  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden animate-slideIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative top pattern */}
        <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${colors.gradient}`} />
        
        <button
          onClick= {()=>{onClose(),setdeletemenssage()}}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-full"
        >
          <X size={20} />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-6">
            <RoleIcon role={role} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Bienvenido al Sistema
            </h2>
            <p className="text-gray-600">
              Verificación de Credenciales
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-gray-600 text-sm uppercase tracking-wide font-medium mb-3">
              Estado de Registro
            </p>
            <div className="flex items-center justify-between">
              <p className="text-gray-700 font-medium">
                Rol Asignado:
              </p>
              <RoleBadge role={role} />
            </div> 
          </div>
            <div className='w-full flex justify-center items-center'>
            {estado==="Programada"? (
  <span
    className="w-full text-center bg-gray-400 text-white py-3 px-4 rounded-lg font-medium cursor-not-allowed"
  >
    {'La asamblea aun no ha comenzado'}
  </span>
) : (
  <Link
    to={Rute}
    onClick={Getpermiso}
    className={`w-full text-center bg-gradient-to-r ${colors.button} text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
  >
    {'Verificar'}
  </Link>
)}

          </div>
          

          <p className='text-center text-sm text-red-600'>{message}</p>
        </div>
      </div>
    </div>
  );
}