import { useEffect, useState } from "react";
import api from "../services/api";

import { Outlet, Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/action";

const ProtectedRoute = (props) => {

    const [componente, setComponente] = useState(null); 
    const dispatch = useDispatch();

    async function getUser(){

      await api.get(props.route)
      .then(res => {

        if (res.status == 200){
          dispatch(setUser(res.data));

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