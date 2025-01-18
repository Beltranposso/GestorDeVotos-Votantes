import React, { useState,useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { URI } from '../../services/conexiones';

import {Header} from './header';
import { Filters } from './Filter';
import {ViewToggle} from './Viewtogel';
import SurveyCard from  './Surveycards'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import {useFilteredSurveys}from './hook'
import Cookies from 'js-cookie';
 import '/src/App.css';
import { Cookie } from 'lucide-react';
/* import '../Animations.css'; */


const Home = () => {
  const [viewMode, setViewMode] = useState('grid');

  const [Asamblea, setAsamblea] = useState([
  
  ]);

  const nav = useNavigate();


  
 /*  const getCard = async () => {
    const response = await axios.get(URI);
    setCards(response.data);
  };  */
  const getAsamblea = async () => {
    try {
      const response = await axios.get(URI);
      setAsamblea(response.data); // Asignamos los datos de la respuesta al estado
    } catch (error) {
      console.error("Error al obtener la asamblea:", error);
    }
  };

  useEffect(() => {
   getAsamblea();
     
  }, []);

  
/*   const token = Cookies.get('auth_token');
  const decoded = jwtDecode(token);
  const Cedula= decoded.Cedula
   console.log(Cedula) 
  
  const FiltradoAsamblea = Asamblea.filter(Asamble => Asamble.UserId  === Cedula );
 */

   
   
   const {
     filteredSurveys,
     searchQuery,
     setSearchQuery,
     statusFilter,
     setStatusFilter,
     typeFilter,
     setTypeFilter
    } = useFilteredSurveys(Asamblea);
    



    
    return (
      <div className=" w-full bg-gray-50 min-h-screen border-1">
      <Header  />
      
      <main className="max-w-7xl mx-auto px-4 h-full sm:px-6  lg:px-8 py-8">
        <div className="space-y-6 ">
          <div className="flex flex-col gap-6">
            <Filters 
              totalResults={filteredSurveys.length}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
        
            />
            
            <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
          </div>

          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 " 
              : "space-y-4"
          }>
            {filteredSurveys.map((survey,index) => (
              <SurveyCard 
                key={index}
                id={btoa(survey.id)} 
                title={survey.Title}            
                survey={survey.Estado}
                Condominio={survey.Condominio}
                date={survey.horaInicio}
                viewMode={viewMode}
                Estado={survey.Estado}
              />
            ))}
          </div>
        </div>
      </main>
    </div>


   
    
  );
};

export default Home;

{/*  {FiltradoAsamblea.map((asamblea, index) => (
  <Card_Home key={index}  id={asamblea.id} titulo={asamblea.Title} hora={asamblea.createdAt} color={asamblea.Color} />

  
  <div className="flex w-full   flex-col bg-[#f3f3f3] justify-center ">
    <div className=" w-full h-[100px] flex justify-between items-center px-10">
      <div>
        <input className='input_text_buscar' type="text" placeholder="Buscar" />
        <span className="filter-icon">A-Z</span>
      </div>
      <Link
className="flex justify-center items-center h-full bg-gray-50 hover:bg-gray-200 transition-all duration-300 ease-in-out w-32 active:scale-95 mr-14 rounded"
to="/Creacion"
>
Crear +
</Link>
    </div>
    <div className='h-full max-h-full flex flex-col items-center gap-10 px-20 overflow-y-auto '>
      <h2 className='fs-3'>Encuestas en curso</h2>
      <div className='h-full w-[90%] grid  grid-rows-auto grid-cols-3 gap-3'>

{  FiltradoAsamblea.map((assembly, index) => (
  <Card_Home
  key={index}
  id={assembly.id}
  name={assembly.Title}
  date={assembly.FechaInicio}
  location={assembly.Condominio}
 
  onClick={''} 
 />)) }
      </div>
    </div>


  </div>
    ))}  */}