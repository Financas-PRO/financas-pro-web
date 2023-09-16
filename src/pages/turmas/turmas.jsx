// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./turmas.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import Turma from "../../components/turmas/turma";

export default function Turmas() {

    return (

        <div className="row-page">

            <div className="col col-md-2">
                <Header />
            </div>


            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-bezier"
                    titulo="Turmas"
                    subTitulo="Selecione a sua turma" />


                <div className="row mt-5 cardFundoTurma">
                    <Turma turma="Sitema de Informação" />
                    <Turma turma="Sitema de Informação" />
                    <Turma turma="Sitema de Informação" />
                    <Turma turma="Sitema de Informação" />
                </div>
                
            </div>
        </div>

    )

}