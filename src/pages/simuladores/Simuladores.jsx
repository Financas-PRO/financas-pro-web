// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./Simuladores.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import Simulador from "../../components/simulador/simulador";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Simuladores() {

    let { id } = useParams();

    return (
        <div className="row-page">

            <div className="col col-md-2">
                <Header />
            </div>


            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-bezier2"
                    titulo="Simuladores"
                    subTitulo="Gerenciamento dos simuladores" />


                <div className="cadButton">
                    <Link to={`/simulador02/cadastrar/${id}`} className="btn-criarSi">
                    <i class="bi bi-bookmark-plus-fill"></i>
                        Criar nova simulação
                    </Link>
                </div>


                <div className="row mt-5 cardFundo">

                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                    <Simulador
                        titulo="Aula XX - IBM"
                        etapa="Etapa: Gráficos"
                        nomes="João, Pedro, Lara"
                    />
                </div>

                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                    <ButtonSalvar nome="Salvar" />
                    <ButtonCancelar link="dashboard" nome="Cancelar" />
                </div>
            </div>

        </div>

    );
}