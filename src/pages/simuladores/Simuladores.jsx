// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./Simuladores.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";


export default function Simuladores() {

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
                    <button className="btn-criarSi">
                    <i class="bi bi-bookmark-plus-fill"></i>
                        Criar nova simulação
                    </button>
                </div>


                <div className="row mt-5 cardFundo">
                    <div className="col col-md-3">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-simuladores">
                            <div className="titulo-simuladores">Aula XX - IBM</div>
                            <div className="card-conteudo mt-3">
                                <span className="etapa">Etapa: Gráficos</span>
                                <span className="nomes">João, Pedro, Lara</span>
                            </div>
                            <Link className="link">
                                Clique aqui para retornar
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                    <ButtonSalvar nome="Salvar" />
                    <ButtonCancelar link="dashboard" nome="Cancelar" />
                </div>
            </div>

        </div>

    );
}