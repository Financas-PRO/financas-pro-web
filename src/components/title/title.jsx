// Desenvolvedores: João Pontes e Leonardo Mariano

import React from "react";
import "./title.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Title(props) {

    return (
        <>
            <div className="container mt-4 col-md-12">
                <div className="title">
                    <div className="icon-margin d-flex align-items-center justify-content-center">
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