import { useState, useMemo } from 'react';



export function useFilteredSurveys(initialSurveys) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const filteredSurveys = useMemo(() => {
    return initialSurveys.filter(survey => {
      const matchesSearch = survey.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          survey.Condominio.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
      const matchesType = typeFilter === 'all' || survey.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [initialSurveys, searchQuery, statusFilter, typeFilter]);

  return {
    filteredSurveys,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter
  };
}