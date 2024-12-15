

export const getRoleColors = (role) => {
  switch (role) {
    case 'Administrador':
      return {
        gradient: 'from-blue-500 via-blue-600 to-blue-700',
        background: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        ring: 'ring-blue-500/20',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-600',
        button: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-200 hover:shadow-blue-300'
      };
    case 'Cordinador':
      return {
        gradient: 'from-green-500 via-green-600 to-green-700',
        background: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        ring: 'ring-green-500/20',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        button: 'from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-200 hover:shadow-green-300'
      };
    case 'Operador de registro':
      return {
        gradient: 'from-purple-500 via-purple-600 to-purple-700',
        background: 'bg-purple-50',
        text: 'text-purple-700',
        border: 'border-purple-200',
        ring: 'ring-purple-500/20',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-600',
        button: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-200 hover:shadow-purple-300'
      };
    case 'Votante':
      return {
        gradient: 'from-orange-500 via-orange-600 to-orange-700',
        background: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        ring: 'ring-orange-500/20',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-600',
        button: 'from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-orange-200 hover:shadow-orange-300'
      };
  }
};