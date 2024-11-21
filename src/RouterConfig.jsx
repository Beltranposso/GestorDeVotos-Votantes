import { useParams } from "react-router-dom";
import { Formulario,Validation,Content } from "./pages";



export  const routes = [
 
    {
        path: '/c/:id',
        component: <Content></Content>,
    },
/* 

    {
        path: '',
        component: <Validation></Validation>,  
    } */
   
]