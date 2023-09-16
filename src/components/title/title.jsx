// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./title.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Title(props) {

    return (
        <>
            <div className="container mt-4 col-md-12">
                <ToastContainer className="toast-top-right" />

                <div className="title">
                    <div className="col col-md-1 col-12">
                        <i className={`bi ${props.icon} icon-titulo`}></i>
                    </div>
                    <div className="col col-md-5">
                        <h2 className="margin-cadastrar-titulo titulo">{props.titulo}</h2>
                        <span className="subtitulo">{props.subTitulo}</span>
                    </div>
                </div>
            </div>
        </>
    )
}