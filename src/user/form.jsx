
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
import StartAsamble from '../component/StartedAsamlea'
import {URI27} from '../services/conexiones'
import Notificacion from '../component/Notifications/Notifications'
import { set } from 'react-hook-form';
/* const socket = io("https://serverapivote.co.control360.co", { reconnection: false }); */
const socket = io("http://localhost:8000/");


/* const URL = 'https://serverapivote.co.control360.co/idCard/'; */
const URL = 'http://localhost:8000/idCard/';
const Formulario = ({IdCard,Notification}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [estado, setestado] = useState(false);
   const [voto, setVoto] = useState('');
   const [valorSeleccionado, setValorSeleccionado] = useState();
/*    const cedula = localStorage.getItem('C.C');
   const valordecoded = atob(cedula) */



   const [idcard, setIdcard] = useState({
      preguntas: []
   });
   
   const showToast = () => {
      setIsOpen(true);
    };
  
    const hideToast = () => {
      setIsOpen(false);
    };


/*    const URI3 = 'https://serverapivote.co.control360.co/votes/'; */
const URI3 = 'http://localhost:8000/votes/';


   
   const navigate =  useNavigate()

   const GetId = async () => {
      const response = await axios.get(URL + IdCard);
      setIdcard(response.data);
  

   };

   const manejarCambio = (id, label) => {
      setValorSeleccionado(id);  // Guardar el id seleccionado
      setVoto(label);  // Guardar el label seleccionado
      console.log("ID seleccionado:", id);
      console.log("Label seleccionado:", label);
   };

   


   const Enviarvoto = async () => {
    try {
        // Configuración de axios para incluir las credenciales (cookies)
        const response = await axios.post(
            URI3,
            {
                id_Option: valorSeleccionado, // Asegúrate de que estos campos coincidan con los esperados en el backend
                Voto: voto,
                id_card: IdCard,
            },
            {
                withCredentials: true, // Esto asegura que las cookies se envíen con la solicitud
            }
        );

        if (response.status === 201) {
            // Emitir la señal al socket con el valor recibido del backend
            socket.emit('señal', response.data.voto.id_voter);

            console.log("Voto enviado exitosamente:", response.data.voto);

            // Cambiar el estado según lo necesites
            setestado(false);

            // Verificar estado de votación con base en el token
            checkVotingStatusFromToken();
        } else {
            console.warn(
                `La solicitud no retornó el estado esperado. Código de respuesta: ${response.status}`
            );
        }
    } catch (error) {
        if (error.response) {
            // Si el backend retorna un error, lo manejamos aquí
            console.error(
                "Error al enviar el voto. Respuesta del servidor:",
                error.response.data
            );
        } else if (error.request) {
            // Si no hubo respuesta del servidor
            console.error("No se recibió respuesta del servidor:", error.request);
        } else {
            // Error al configurar la solicitud
            console.error("Error al configurar la solicitud:", error.message);
        }
    }
};


const depuracion = () => {
    socket.emit('señal', "vote user : "+IdCard);
    console.log("Voto enviado exitosamente:" , IdCard);
}




  const checkVotingStatusFromToken = async () => {
    try {
        // Realizar la solicitud POST a la API para verificar el estado de votación
        const response = await axios.post('http://localhost:8000/Check-user-token', {id_card:IdCard}, {
            withCredentials: true,  // Pasar withCredentials como configuración
        });

        if (response.data.success) {
            console.log('El usuario está registrado y no ha votado aún');
          
            setestado(true);
           
        } else {
            console.log(response.data);
          setestado(false);
        }
    } catch (error) {
        console.log('Error al verificar el estado de votación:', error.message);
        // Puedes manejar los errores de la llamada aquí, como si no se encuentra el token
    }
};
  
      
      useEffect(() => {
         GetId();
         checkVotingStatusFromToken();
      }, [estado]);


      


   
   
   console.log("preguntasssss",idcard.preguntas)
    
   return (
     
      <div className="flex flex-col h-full justify-between">
         <div>
            <img src={ControlImg} alt="" width={200} height={100} />
         </div>


         {idcard.preguntas.length===0 ? <StartAsamble/>: estado? Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

   <div className='flex justify-center   mx-5'>
     <div className='flex flex-col w-[550px] h-auto py-10 gap-6 border-2 rounded-2xl p-5  transition-all duration-75'>
       <header className='flex flex-col gap-2'>
         <p className='text-2xl'>{pregunta.Pregunta}</p>
       </header>
       <main>
         <Form>
           <div className="flex flex-col gap-4 text-lg max-w-[400px]">
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
)):<Notificacion variant={"Success"} ></Notificacion>}
   
            <div className={' flex justify-center w-full '}>

{(idcard.preguntas && idcard.preguntas.length > 0 && estado) && (
  <button
    onClick={Enviarvoto}
    className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none mx-5 focus:ring focus:ring-blue-300 focus:ring-opacity-80 w-[500px]"
  >
    Enviar
  </button>
)}
            </div>
         



         <div className='flex justify-center h-20  items-center  '>
         </div>
         <footer className=''>
            <Footer></Footer>
         </footer>

      </div>




)
}


export default Formulario;    


{/* {Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

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
)) } */}


























