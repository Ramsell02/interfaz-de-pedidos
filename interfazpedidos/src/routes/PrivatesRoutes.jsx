import { Navigate } from 'react-router-dom'

function PrivatesRoutes ({children}) {
    const isAuthenticated = JSON.parse(localStorage.getItem("token"));
    console.log(isAuthenticated);
    if (isAuthenticated) {
        return children
    }else{
        return <Navigate to="/"/>
    }
  
}

export default PrivatesRoutes;