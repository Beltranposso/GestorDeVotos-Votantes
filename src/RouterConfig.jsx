import { useParams } from "react-router-dom";
import { Formulario,Validation,Content,Home } from "./pages";



export  const routes = [
 
    {
        path: '/c/:id',
        component: <Content></Content>,
    },


    {
        path: '/Home',
        component: <Home></Home>,  
    } 
   
]