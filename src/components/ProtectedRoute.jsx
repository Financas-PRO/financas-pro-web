import { useEffect, useState } from "react";
import api from "../services/api";

import { Outlet, Navigate } from "react-router";

const ProtectedRoute = () => {

    const [autenticado, setAutenticado] = useState(); // initially undefined
  
    useEffect(() => {
      api.get(
        'https://localhost:444/api/cursos',
        { withCredentials: true },
      )
        .then(function (res){

            if (res.status == 201){
                setAutenticado(true);
            }

          return autenticado;
        });
    }, []);
  
  
    if (autenticado === undefined) return null; // or loading indicator, etc...
  
    return autenticado ? <Outlet /> : <Navigate to="/login" replace/>;
  }

  export default ProtectedRoute;