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
                    <div className="col-md-1 col-12 icon-margin d-flex align-items-center justify-content-center">
                        <i className={`bi ${props.icon} icon-titulo`}></i>
                    </div>
                    <div className="d-flex flex-column col col-md-5 w-response">
                        <h2 className="margin-cadastrar-titulo titulo mb-1">{props.titulo}</h2>
                        <span className="subtitulo">{props.subTitulo}</span>
                    </div>
                </div>
            </div>
        </>
    )
}