import { useParams } from "react-router-dom";
import Validation from "../user/validation";
import Layaut from './layautMenu/waitingMenu';
import Form from "../user/form";
import io from 'socket.io-client';
import WaitingMenu from "../component/Wating";
import Sucesfull from "../component/Sucesfull";
import { useEffect, useState } from "react";
import axios from "axios";
import VotacionFinalizada from "../component/votingfinalized";
const socket = io("https://serverapivote.co.control360.co", { reconnection: false });

 const URI9 = 'https://serverapivote.co.control360.co/api/votacion/estado/';
const Content = () => {
    const { id } = useParams();
    const iddecoded = atob(id);
    
    const [estado, setEstado] = useState(() => localStorage.getItem('confirmationStatus'));
 
    const [Start2, setEstart2] = useState('');
    const [component, setComponent] = useState();
 
    const decodedid = atob(id);
    

    
    useEffect(() => {
        const handleStorageChange = () => {
            setEstado(localStorage.getItem('confirmationStatus'));
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);
    
   
    
    
    useEffect(() => {
        socket.on('I', (Estado) => {

            setEstart2(Estado);
            console.log(Estado);
        });

      
        return () => {
            socket.off('I');   
        }

    }, [Start2]); 

    const getEstado = async () => {
        try {
          const response = await axios.get(`${URI9}${iddecoded}`);
          setEstart2(response.data);
        } catch (error) {
          console.error('Error al obtener el enlace:', error);
        }
       }

       useEffect(() => {
        getEstado();
       },[]) 


useEffect(() => {
   if(Start2 === 'notestate'){
    setComponent(<WaitingMenu />)   
   }else if(Start2 === 'Activa'){
   setComponent(<Form IdCard={decodedid} />)
   }else if (Start2 === 'Finalizada'){
    setComponent(<VotacionFinalizada />)
   }else{
    console.log('error')
   }
}, [Start2]);
console.log("estado",Start2)


    const [isOpen, setIsOpen] = useState(localStorage.getItem('n'));

    const showToast = () => {
        setIsOpen(true);
    };

    const hideToast = () => {
        setIsOpen(false);
        localStorage.removeItem('n');
    };
 


 
    return (
        <div className="h-full">

            <Sucesfull open={isOpen} close={hideToast} />
            {estado ? <Layaut children={component}  /> : <Validation id={decodedid} />}
        </div>
    );
};

export default Content;
