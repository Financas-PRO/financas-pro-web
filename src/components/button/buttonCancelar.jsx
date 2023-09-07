// Desenvolvedores: João Pontes e Leonardo Mariano

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function ButtonCancelar(props){
    
    return(
        <Link to={`/${props.link}`} className="btn-cancelar">{props.nome}</Link>
    )
}