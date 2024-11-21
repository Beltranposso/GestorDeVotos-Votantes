

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { routes } from './RouterConfig';
import Proted from './ProtectedtedRouter';
import './App.css'


function App() {
const estado = localStorage.getItem('token')

 
  return (


        
          <Routes>
            <Route   element={<Proted canActive={true} redirectpath='/'/>}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            
            </Route>
         
          </Routes>
       
           
   
  )
}

export default App
