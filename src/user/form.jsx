
import Footer from '../footer/footer'
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import ControlImg from '../assets/file.png'
import Sucesfull from '../component/Sucesfull';
import { useFetcher, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const socket = io("https://serverapivote.co.control360.co", { reconnection: false });

const URL = 'https://serverapivote.co.control360.co/idCard/';
const Formulario = ({IdCard,Notification}) => {
   const [isOpen, setIsOpen] = useState(false);
   
   const [voto, setVoto] = useState('');
   const [valorSeleccionado, setValorSeleccionado] = useState();
   const cedula = localStorage.getItem('C.C');
   const valordecoded = atob(cedula)

  console.log(IdCard)

   const [idcard, setIdcard] = useState({
      preguntas: []
   });
   
   const showToast = () => {
      setIsOpen(true);
    };
  
    const hideToast = () => {
      setIsOpen(false);
    };
 console.log(idcard)

   const URI3 = 'https://serverapivote.co.control360.co/votes/';


   
   const navigate =  useNavigate()

   const GetId = async () => {
      const response = await axios.get(URL + IdCard);
      setIdcard(response.data);
  

   };
   console.log(IdCard)
   const manejarCambio = (id, label) => {
      setValorSeleccionado(id);  // Guardar el id seleccionado
      setVoto(label);  // Guardar el label seleccionado
      console.log("ID seleccionado:", id);
      console.log("Label seleccionado:", label);
   };

   

   
/*     const response = async axios.post(URI3, {

      id_voter: valorDecodificado,
      id_pregunta: decodedText,
      id_Option: decodedText, 
      Voto:valorSeleccionado
   });  */
  console.log(cedula)
   const Enviarvoto = async () => {
   
      try {
      const response =   await axios.post(URI3, { id_voter : valordecoded, id_Option :valorSeleccionado, Voto:voto, id_card:IdCard});

       
 
 
         if(response.status === 200){
                   
         socket.emit('señal',"vote user : "+valordecoded);   
         localStorage.removeItem('C.C');
         localStorage.removeItem('confirmationStatus');
         localStorage.removeItem('Start');
         localStorage.setItem('n',btoa("sucesfull"));
         location.reload();
         }
      
        } catch (error) {
          console.error('Error al enviar los datos:', error);
        }
        
      };
      
      useEffect(() => {
         GetId();
      }, []);





   
   
   
    
   return (

      <div className="flex flex-col  h-full justify-between ">
         <div>
            <img src={ControlImg} alt="" width={200} height={100} />
         </div>

    
{Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

   <div className='flex justify-center'>
     <div className='flex flex-col w-[550px] h-[320px] gap-6 border-2 rounded-2xl p-5'>
       <header className='flex flex-col gap-2'>
         <p className='text-2xl'>{pregunta.Pregunta}</p>
       </header>
       <main>
         <Form>
           <div className="flex flex-col gap-4 text-lg">
            {
               pregunta.opciones.map((opcion) =>(

                  <Form.Check
                    className='flex gap-3'
                    inline
                    key={opcion.id}
                    value={opcion.id}
                    label={opcion.opcion}
                    name={`group-${pregunta.id}`} // Agrupar las opciones por cada pregunta
                    type='radio'
                    onChange={() => manejarCambio(opcion.id, opcion.opcion)}  
                  /> 
               ))
               }
       
           </div>
         </Form>
       </main>
     </div>
   </div>
)) }

         



         <div className='flex justify-center h-20  items-center  '>
            <div className='flex justify-end w-1/3 '>


               <button onClick={Enviarvoto} className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                  Enviar
               </button>
            </div>
         </div>
         <footer className=''>
            <Footer></Footer>
         </footer>

      </div>




   )
}


export default Formulario;    