import { useEffect, useState } from "react";
import api from "../services/api";

import { Outlet, Navigate } from "react-router";

const ProtectedRoute = (props) => {

    const [componente, setComponente] = useState(null); 

    async function getUser(){

      await api.get(props.route)
      .then(res => {

        if (res.status == 200){
          setComponente(<Outlet/>);
        } else setComponente(<Navigate to="/login"></Navigate>);

      }).catch(err => {
        setComponente(<Navigate to="/login"></Navigate>);
        console.log(err);
      });
    }

    useEffect(() => {
      getUser();
    }, []);
  
  
    return componente;
  }

  export default ProtectedRoute;