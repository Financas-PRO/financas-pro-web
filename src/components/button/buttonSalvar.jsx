// Desenvolvedores: João Pontes e Leonardo Mariano

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

export default function ButtonSalvar(props){

    return(
        <button className="btn-salvar">{props.nome}</button>
    )
}