import { useFetcher, useParams } from "react-router-dom";
import Validation from "../user/validation";
import Layaut from './layautMenu/waitingMenu';
import Form from "../user/form";
import io from 'socket.io-client';
import WaitingMenu from "../component/Wating";
import Sucesfull from "../component/Sucesfull";
import { useEffect, useState } from "react";
import axios from "axios";
import { URI24, URI25, URI26, URI28 } from '../services/conexiones';
import VotacionFinalizada from "../component/votingfinalized";
import Notification from "../component/Notifications/Notifications";
import { use } from "react";
import { set } from "react-hook-form";

/* const socket = io("https://serverapivote.co.control360.co", { reconnection: false }); */

/*  const URI9 = 'https://serverapivote.co.control360.co/api/votacion/estado/'; */
const URI9 = 'https://serverapivote.co.control360.co/api/votacion/estado/';

const Content = () => {
    const {id} = useParams();
    
    const socket = io("https://serverapivote.co.control360.co/");

    const [estado, setEstado] = useState();

    const [Start2, setEstart2] = useState('');
    const [component, setComponent] = useState();
    const [Estatus, setEstatus] = useState('');
    const[Asistencia, setAsistencia] = useState('');
    const[señal, setseñal] = useState('');
    const decodedId = atob(id);

    useEffect(() => {
        const handleStorageChange = () => {
            setEstado(localStorage.getItem('confirmationStatus'));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);






    /*    const getEstado = async () => {
           try {
             const response = await axios.get(`${URI9}${iddecoded}`);
             setEstart2(response.data);
           } catch (error) {
             console.error('Error al obtener el enlace:', error);
           }
          }
   
          useEffect(() => {
           getEstado();
          },[])  */





    const [isOpen, setIsOpen] = useState(localStorage.getItem('n'));

    const showToast = () => {
        setIsOpen(true);
    };

    const hideToast = () => {
        setIsOpen(false);
        localStorage.removeItem('n');
    };


    const checkVotingStatus = async (Cedula) => {
        if (!Cedula) {
            alert("Cédula no proporcionada.");
            return;
        }

        try {
            const response = await axios.post(
                `${URI24}${decodedId}`,
                { Cedula },
                { withCredentials: true }
            );

            const { success, message } = response.data;

            if (success) {

                setEstado(true);
            } else {

            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || "Error en el servidor.");
            } else {
                alert("Error de conexión con el servidor.");
            }
        }
    };

    const checkVotingStatusFromToken = async () => {
        try {
            // Realizar la solicitud POST a la API para verificar el estado de votación
            const response = await axios.post('https://serverapivote.co.control360.co/Check-user-token', { id_card: decodedId }, {
                withCredentials: true,  // Pasar withCredentials como configuración
            });

            if (response.data.message === 'El usuario ya ha votado.' || response.data.message === 'Ya te verificaste en esta Asmablea.') {


                setEstado(true);

            } else {
          
                // Aquí puedes manejar los casos de error como "No registrado" o "Ya ha votado"
            }
        } catch (error) {
         
            // Puedes manejar los errores de la llamada aquí, como si no se encuentra el token
        }
    };


    const getEstatus = async () => {
        try {
            const response = await axios.get(URI28 + decodedId);
            setEstatus(response.data.Estado);
        } catch (error) {
            console.error('Error al obtener el enlace:', error);
        }
    }

    const obtenerAsistencia = async () => {
        try {
            // Mejor manejo de errores y más descriptivo
            const response = await axios.get('https://serverapivote.co.control360.co/UsersDefinitive/A/get-asistencia', {
                withCredentials: true,
            });
    
            // Validación más robusta de la respuesta
            if (response.status === 200 && response.data) {
                const asistencia = response.data.Asistencia;
                setAsistencia(asistencia);  
                // Validación adicional del valor de asistencia
                if (asistencia !== undefined && asistencia !== null) {
            


                    return asistencia;
                } else {
                    console.warn("Asistencia recibida es inválida");
                    return null;
                }
            } else {
                console.error("Error inesperado:", response.status);
                return null;
            }
        } catch (error) {
            // Manejo más detallado de errores
            if (error.response) {
                // El servidor respondió con un status code fuera de 2xx
                console.error("Error de respuesta del servidor:", error.response.data);
                console.error("Status:", error.response.status);
            } else if (error.request) {
                // La solicitud se hizo pero no se recibió respuesta
                console.error("No se recibió respuesta del servidor");
            } else {
                // Algo sucedió al configurar la solicitud
                console.error("Error al configurar la solicitud:", error.message);
            }
            
            return null;
        }
    };
    
    

    
    
    useEffect(() => {
        socket.on('ISO', (Estado) => {
            setEstatus(Estado);

        })
        
        getEstatus();
        checkVotingStatusFromToken()
        
    }, [Estatus]);
    
    
    
    
    
    
        useEffect(() => {
    
            getEstatus();
            checkVotingStatusFromToken()
            obtenerAsistencia();
        });

    
    
    

     useEffect(() => {
        if (Estatus === 'Finalizada') {

            setComponent(<Notification variant="Finalizada" />)
        } else if (Estatus === 'Activa') {
               
            if (Asistencia === 'Ausente') {

                setComponent(<Notification variant="Validitacion" />)
             
            }else if(Asistencia === 'Presente'){
               
                setComponent(<Form IdCard={decodedId} />)
            }
        }
    }, [Estatus, Asistencia]);

 
useEffect(() => {

    socket.on('ASIST',(Asistencia) => {

    setseñal(Asistencia)
})

obtenerAsistencia();
}, [Asistencia]);



    return (
        <div className="h-full">

            <Sucesfull open={isOpen} close={hideToast} />
            {estado ? <Layaut children={component} /> : <Validation onclick={checkVotingStatus} id={id} />  }
           
        </div>
    );
};

export default Content;/* 
<Validation onclick={checkVotingStatus} id={id} /> */

