
import Footer from '../footer/footer'
import Button from 'react-bootstrap/Button';
import io from 'socket.io-client';
import axios from 'axios';
import { useEffect, useState,useRef } from 'react';
import Form from 'react-bootstrap/Form';
import ControlImg from '../assets/file.png'
import Sucesfull from '../component/Sucesfull';
import { useFetcher, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import StartAsamble from '../component/StartedAsamlea'
import {URI27} from '../services/conexiones'
import Notificacion from '../component/Notifications/Notifications'
import Cronometer from '../component/Cronometer'
import MotalTimeOut from '../component/ModalTimeOut'

import Loading from '../component/loadingpestaña'

 const socket = io("http://localhost:8000/", { reconnection: true },); 


/* const socket = io("https://serverapivote.co.control360.co/"); */


/* const URL = 'https://serverapivote.co.control360.co/idCard/'; */
const URL = 'http://localhost:8000/idCard/';
const Formulario = ({IdCard,Notification}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [estado, setestado] = useState();
  const[loading, setLoading] = useState(false);
  const [voto, setVoto] = useState('');
  const [valorSeleccionado, setValorSeleccionado] = useState();
  const [votos, setVotos] = useState([]);
  const [preguntaId, setPreguntaId] = useState();
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const intervaloRef = useRef(null)
  const [terminado, setTerminado] = useState(false);
  const [estadoSuccess, setEstadoSuccess] = useState(false);
  const [component, setComponent] = useState(<Loading/>);
  const [Nombre, setNombre] = useState('');
  const [Apoderado, setApoderado] = useState('');
  const [Coeficiente, setCoeficiente] = useState('');
  const [CoeficienteTotal, setCoeficienteTotal] = useState('');
  const[señal, setseñal] = useState('');
  const[close, setClose] = useState(false);
console.log("idcard::::::",IdCard);

/*    const cedula = localStorage.getItem('C.C');
   const valordecoded = atob(cedula) */



   const [idcard, setIdcard] = useState({
      preguntas: []
   });
   console.log(idcard)
   
   const showToast = () => {
      setIsOpen(true);
    };
  
    const hideToast = () => {  
      setIsOpen(false);
    };


    const URI3 = 'http://localhost:8000/votes/';  
/*  const URI3 = 'https://serverapivote.co.control360.co/votes/';  */


   
   const navigate =  useNavigate()

   const GetId = async () => {
      const response = await axios.get(URL + IdCard);
      setIdcard(response.data);
      setPreguntaId(response.data.preguntas[0].id);
      console.log("datos traidos del server:::",response.data);
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
                                ? { ...op, voto, id_card: IdCard,preguntaId }
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
                        { id_option, voto, id_card: IdCard,preguntaId } // Agregar la primera opción de la pregunta
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

    
    // Realizar una única petición con toda la lista de votos
    const response = await axios.post(
      URI3,
      { votos: votos }, // Enviar la lista completa
      { withCredentials: true } // Asegurar que las cookies se envíen
    );

    if (response.status === 201 || response.status === 200) {
   
      
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




  useEffect(() => {
    GetId();
    checkVotingStatusFromToken();
  }, []);
 
const relooding = () => {
  location.reload();
}
useEffect(() => {
socket.on('DataQ',(data) => {

  setseñal(data)
 }); 

 GetId();

}, [señal,close]);

 
useEffect(() => {
  const handleSocketEvent = (r) => {
    setClose(r); // Actualiza el estado 'close' cuando el socket reciba la señal
  };

  // Escuchar evento 'CL' del socket
  socket.on('CL', handleSocketEvent);

  // Limpieza para evitar múltiples listeners
  return () => {
    socket.off('CL', handleSocketEvent);
  };
}, []); // Se ejecuta al montar, y solo escucha al socket

useEffect(() => {
  // Este efecto depende de 'close' y se ejecuta solo cuando 'close' cambia
  if (close) {
    GetId();
    relooding();
  }
}, [close]); // A



const checkVotingStatusFromToken = async () => {
  try {
      // Realizar la solicitud POST a la API para verificar el estado de votación
      const response = await axios.post(
          'http://localhost:8000/Check-user-vote',
          { id_question:preguntaId }, // Pasar el ID de la pregunta como parte del cuerpo de la solicitud
          {
              withCredentials: true, // Pasar withCredentials como configuración para incluir cookies
          }
      );
       
      if (response.data.message === 'El usuario no ha votado en esta pregunta.') {
        // Cambiar el estado si el usuario ya votó
     
        setLoading(true); // Cambiar el estado si el usuario no ha votado
        setestado(true);
      } else if (response.data.message === 'El usuario ya votó en esta pregunta.') {
       
        setestado(false)

      }
  } catch (error) {
      console.error('Error al verificar el estado de votación:', error.message);
    
      // Manejo de errores
     // Opcional: establecer un estado por defecto en caso de error
  }
};

      
    

       
      useEffect(() => {
       // URL del servidor

        // Enviar el ID de la pregunta al servidor
        socket.emit('startCronometro', preguntaId);

        // Escuchar actualizaciones del cronómetro
        socket.on('cronometro', (data) => {
            setTiempoRestante(data.tiempoRestante);
            setTerminado(data.terminado);

            // Si el cronómetro ha terminado, desconectar
            if (data.terminado) {
                socket.disconnect();
            }
        });

        // Manejar errores
        socket.on('error', (errorMessage) => {
            console.error('Error del servidor:', errorMessage);
        });

        // Limpiar conexión al desmontar el componente
     
    }, [preguntaId]);

/* const esperadefunciones = async () => {
  await GetId() 
  await checkVotingStatusFromToken()
} */

useEffect(() => {
  const esperadefunciones = async () => {
    await GetId(); // Esto actualiza preguntaId
    await checkVotingStatusFromToken(); // Esto depende de preguntaId
  };

  // Solo ejecuta esperadefunciones si preguntaId está definido
  if (preguntaId) {
    esperadefunciones();
  }
}, [preguntaId]);
   


const decodeToken = async () => {
  try {
      // Hacer una solicitud GET al backend para decodificar el token
      const response = await axios.get("http://localhost:8000/UsersDefinitive/Token/decoded/", {
          withCredentials: true, // Importante para enviar cookies al backend
      });

      // Verificar si la respuesta fue exitosa
      if (response.data.success) {
       
          setNombre(response.data.data.NombreCompleto);
          setApoderado(response.data.data.PoderesDelegados);
          setCoeficiente(response.data.data.RegisterQuorum);
          setCoeficienteTotal(response.data.data.quorum);
      } else {
          console.error("Error:", response.data.message);
          return null;
      }
  } catch (error) {
      console.error("Error al llamar a la API para decodificar el token:", error.message);
      return null;
  }
};
useEffect(() => {

if(!estado){
  setComponent(<Notificacion variant={"Success"} ></Notificacion>)

}else{

}
decodeToken();

},[])










   return (
    <>

    <div className="flex flex-col h-full justify-between">
         
          <MotalTimeOut isOpen={tiempoRestante===0}></MotalTimeOut>
         <div className='flex justify-center sm:justify-between '>
            <img src={ControlImg} alt="" width={200} height={100}  className='hidden sm:flex'/>
            <div className='flex items-center justify-center p-2 '>

           <Cronometer estado={idcard.preguntas.length===0} seconds={tiempoRestante} isLoading={tiempoRestante === null}></Cronometer>
            </div>
         </div>


     <div className='h-auto  flex flex-col mb-3 gap-3 '>
  
     {idcard.preguntas.length===0 ? <StartAsamble nombre={Nombre} apoderado={Apoderado} coeficiente={Coeficiente} coeficienteTotal={CoeficienteTotal}/>:estado? Array.isArray(idcard.preguntas) &&   idcard.preguntas.map((pregunta) => (

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
)):component}
   


    
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
      </> 
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


