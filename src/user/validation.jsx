import Button from 'react-bootstrap/Button';
import Footer from '../footer/footer';
import imgControl from '../assets/file.png';
import axios from 'axios';
import { useState } from 'react';
import '../App.css';
import { useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import { ArrowLeft } from 'lucide-react';


const Validation = ({id,onclick,msj}) => {
  const URI = 'https://serverapivote.co.control360.co/Usuarios/';
  const URI2 = 'https://serverapivote.co.control360.co/votes/';
  const [usuarios, setUser] = useState([]); 
  const [cedula, setCedula] = useState(); 
  const [mensaje, setMensaje] = useState(''); 
  const [voto, setVoto] = useState([]);
  const [men , setMen] = useState('');
  const navigate = useNavigate();





const Redirect = () => {
  navigate('/Home');
}



  return (
    <div className="flex flex-col h-full justify-between items-center">
  <div className="flex flex-col items-center w-full p-2">
    <div className="flex justify-start w-full pl-4 md:pl-10">
      <button
        onClick={Redirect}
        className="flex items-center gap-2 px-4 py-2 bg-sky-400 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-md active:transform active:scale-95"
      >
        <ArrowLeft size={20} />
        <span>Devolver</span>
      </button>
    </div>

    <div className="flex flex-col w-full max-w-lg h-auto mt-10 gap-5 p-4 md:w-[550px] md:h-[400px] md:mt-20">
      <header className="flex justify-center items-center">
        <img
          className="w-full max-w-xs h-auto md:max-w-full md:h-[85%]"
          src={imgControl}
          alt="Imagen de control"
        />
      </header>

      <main className="flex justify-center">
        <div className="input-container w-full max-w-sm">
          {/* Campo de entrada para la cédula */}
          <input
            placeholder="Cedula"
            className="input-field w-full"
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)} // Actualizar el valor de cédula
          />
          <label htmlFor="input-field" className="input-label">
            Cedula
          </label>
          <span className="input-highlight"></span>
        </div>
      </main>

      <div className="flex justify-end px-4 md:px-20">
        {/* Botón para verificar la cédula */}
        <button
          onClick={() => onclick(cedula)}
          className="w-full max-w-xs px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Ingresa
        </button>
      </div>
    </div>
  </div>
  <p className="text-center text-lg font-bold px-4">{msj}</p>
  <Footer />
</div>

  );
};

export default Validation;
