import React from 'react';
import { Shield, UserCog, ClipboardList, Vote } from 'lucide-react';
import {  getRoleColors } from './types.js';



const getRoleIcon = (role) => {
  switch (role) {
    case 'Administrador':
      return Shield;
    case 'Cordinador':
      return UserCog;
    case 'Operador de registro':
      return ClipboardList;
    case 'Votante':
      return Vote;
  }
};

export function RoleIcon({ role, className = '' }) {
  const Icon = getRoleIcon(role);
  const colors = getRoleColors(role);
  
  return (
    <div className={`p-4 rounded-full inline-block ${colors.iconBg} ${colors.iconColor} ${className}`}>
      <Icon size={32} strokeWidth={1.5} />
    </div>
  );
}