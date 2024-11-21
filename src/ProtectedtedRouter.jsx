import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoter =({
    canActive,
    redirect= '/Validation'
    
}) =>{

    if(!canActive){
        return <Navigate  to={redirect} replace />
        
    }
    return <Outlet/>
    
}
export default ProtectedRoter 