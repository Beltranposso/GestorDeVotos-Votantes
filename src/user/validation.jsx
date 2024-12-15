import Button from 'react-bootstrap/Button';
import Footer from '../footer/footer';
import imgControl from '../assets/file.png';
import axios from 'axios';
import { useState } from 'react';
import '../App.css';
import { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';


const Validation = ({id,onclick}) => {
  const URI = 'https://serverapivote.co.control360.co/Usuarios/';
  const URI2 = 'https://serverapivote.co.control360.co/votes/';
  const [usuarios, setUser] = useState([]); 
  const [cedula, setCedula] = useState(); 
  const [mensaje, setMensaje] = useState(''); 
  const [voto, setVoto] = useState([]);
  const [men , setMen] = useState('');
   




  return (
    <div className="flex flex-col h-full justify-between items-center">
      <div className="flex flex-col w-[550px] h-[400px] mt-20 gap-5 ">
        <header className="flex justify-center items-center pr-5">
          <img className="w-5/6 h-[85%]" src={imgControl} alt="Imagen de control" height={100} />
        </header>
        
        <main className="flex justify-center ">
          <div className="input-container">
            {/* Campo de entrada para la cédula */}
            <input
              placeholder="Cedula"
              className="input-field"
              type="text"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)} // Actualizar el valor de cédula
            />
            <label htmlFor="input-field" className="input-label">Cedula</label>
            <span className="input-highlight"></span>
          </div>
        </main>

        <div className="flex justify-end px-20">
          {/* Botón para verificar la cédula */}
          <button
            onClick={() => onclick(cedula)}
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Ingresa
          </button>
        </div>

        {/* Mostrar mensaje de validación */}
      
      </div>
      
      <Footer />
    </div>
  );
};

export default Validation;
