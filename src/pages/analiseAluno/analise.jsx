import React, { useState } from "react";
import "./analise.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function Analise() {
    return (
        <div className="row-page">

            <div className="col col-md-2 col-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-bookmark-fill"
                    titulo="Análise"
                    subTitulo="Gerenciamento Análise do Aluno" />

            </div>

        </div>
    );
}