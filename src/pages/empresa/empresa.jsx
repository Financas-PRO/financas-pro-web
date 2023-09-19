import React, { useState } from "react";
import "./empresa.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function Empresa() {

    return (
        <div className="row-page">
            <div className="col col-md-2">
                <Header />
            </div>
            <div className="col col-md-8">
                <Title
                    icon=""
                    titulo="Pais"
                    subTitulo="Gerenciamento de paises" />

                <ButtonSalvar nome="Salvar" />
                <ButtonCancelar link="" nome="Cancelar" />
            </div>
        </div>
    )
}