
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
const socket = io("https://serverapivote.co.control360.co/");


/* const URL = 'https://serverapivote.co.control360.co/idCard/'; */
const URL = 'https://serverapivote.co.control360.co/idCard/';
const Formulario = ({IdCard,Notification}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [estado, setestado] = useState(true);
   const [voto, setVoto] = useState('');
   const [valorSeleccionado, setValorSeleccionado] = useState();
   const [votos, setVotos] = useState([]);
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


   const URI3 = 'https://serverapivote.co.control360.co/votes/'; 
/* const URI3 = 'http://localhost:8000/votes/'; */


   
   const navigate =  useNavigate()

   const GetId = async () => {
      const response = await axios.get(URL + IdCard);
      setIdcard(response.data);
  

   };
   const manejarCambio = (preguntaId, id_option, voto) => {
    setVotos((prevVotos) => {
        // Buscar si ya existe un grupo para la pregunta actual
        const preguntaExistente = prevVotos.find((v) => v.preguntaId === preguntaId);

        if (preguntaExistente) {
            // Si la pregunta ya existe, actualizar la opción correspondiente
            return prevVotos.map((v) =>
                v.preguntaId === preguntaId
                    ? {
                        ...v,
                        opciones: v.opciones.map((op) =>
                            op.id_option === id_option
                                ? { ...op, voto, id_card: IdCard }
                                : op
                        )
                    }
                    : v
            );
        } else {
            // Si la pregunta no existe, agregarla con la nueva opción
            return [
                ...prevVotos,
                {
                    preguntaId, // Identificador único de la pregunta
                    opciones: [
                        { id_option, voto, id_card: IdCard } // Agregar la primera opción de la pregunta
                    ]
                }
            ];
        }
    });
};


const Enviarvoto = async () => {
  try {
    // Verificar si hay votos en la lista
    if (votos.length === 0) {
      console.warn("No hay votos para enviar.");
      return;
    }

    console.log("Enviando toda la lista de votos:", votos);

    // Realizar una única petición con toda la lista de votos
    const response = await axios.post(
      URI3,
      { votos: votos }, // Enviar la lista completa
      { withCredentials: true } // Asegurar que las cookies se envíen
    );

    if (response.status === 201 || response.status === 200) {
      console.log("Todos los votos fueron enviados exitosamente.");
      
      // Emitir una señal si es necesario (ajustar según tu lógica)
      socket.emit('señal', response.data);

      // Limpiar el estado después de enviar
      setVotos([]);
      setestado(false);

      // Verificar el estado de votación
      checkVotingStatusFromToken();
    } else {
      console.warn("Hubo un problema al enviar los votos.");
    }
  } catch (error) {
    console.error("Error al enviar la lista de votos:", error.message);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
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
        const response = await axios.post('https://serverapivote.co.control360.co/Check-user-token', {id_card:IdCard}, {
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


      


  console.log("votos",votos);
    
   return (
     
      <div className="flex flex-col h-full justify-between">
         <div>
            <img src={ControlImg} alt="" width={200} height={100} />
         </div>


     <div className='h-auto  flex flex-col mb-3 gap-3 '>
  
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
       onChange={() => manejarCambio(pregunta.id,opcion.id, opcion.opcion)}  
     /> 
  ))
  } 
      
           
           
    
        </div>
      </Form>
    </main>
  </div>
</div>
)):<Notificacion variant={"Success"} ></Notificacion>}
   


    
     </div>

   

   
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




/* {
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
  } */






/*   {false ? <StartAsamble/>: true? Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

    <div className='flex justify-center   mx-5'>
      <div className='flex flex-col w-[550px] h-auto py-10 gap-6 border-2 rounded-2xl p-5  transition-all duration-75'>
        <header className='flex flex-col gap-2'>
          <p className='text-2xl'>{"no hay preguntas"}</p>
        </header>
        <main>
          <Form>
            <div className="flex flex-col gap-4 text-lg max-w-[400px]">
             
           
 
                   <Form.Check
                     className='flex gap-3'
                     inline
                     key={1}
                     value={'s'}
                     label={'y tu quien esres'}
                     name={''} // Agrupar las opciones por cada pregunta
                     type='radio'
         
                   /> 
                   
               
               
        
            </div>
          </Form>
        </main>
      </div>
    </div>
 )):<Notificacion variant={"Success"} ></Notificacion>} */











/*  {idcard.preguntas.length===0 ? <StartAsamble/>: estado? Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

  <div className='flex justify-center   mx-5'>
    <div className='flex flex-col w-[550px] h-auto py-10 gap-6 border-2 rounded-2xl p-5  transition-all duration-75'>
      <header className='flex flex-col gap-2'>
        <p className='text-2xl'>{"no hay preguntas"}</p>
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
  )):<Notificacion variant={"Success"} ></Notificacion>}  */


