import  Formulario     from '../user/form'
import Validation from '../user/validation'
import Content from '../app/Content'
import React from 'react'
import Home from  '../app/HomeUser/Home'
export {Formulario,Validation,Content,Home}



export const validation = React.lazy(() => ('../user/validation'));
export const formulario = React.lazy(() => ('../user/form'));
export const content = React.lazy(() => ('../app/Content'));
export const home = React.lazy(() => ('../app/HomeUser/Home')); 
