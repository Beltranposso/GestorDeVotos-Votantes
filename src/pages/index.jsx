import  Formulario     from '../user/form'
import Validation from '../user/validation'
import Content from '../app/Content'
import React from 'react'
export {Formulario,Validation,Content}



export const validation = React.lazy(() => ('../user/validation'));
export const formulario = React.lazy(() => ('../user/form'));
export const content = React.lazy(() => ('../app/Content'));
