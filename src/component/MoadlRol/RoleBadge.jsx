import React from 'react';
import { getRoleColors } from './types.js';


export function RoleBadge({ role }) {
  const colors = getRoleColors(role);
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ring-1 ring-inset ${colors.background} ${colors.text} ${colors.border} ${colors.ring}`}
    >
      {role}
    </span>
  );
}