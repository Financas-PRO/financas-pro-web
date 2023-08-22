// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import './dashboard.css';
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
import vesti1 from '../../assets/image/carrosel/vesti1.png';
import vesti2 from '../../assets/image/carrosel/vesti2.png';
import vesti3 from '../../assets/image/carrosel/vesti3.png';
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard(){
    return(
        
        <div className="row-page">

            <div className="col col-md-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8">
                <div className="title">
                    <div className="col col-md-1 col-12">
                        <i class="bi bi-house-gear-fill icon-titulo"></i>
                    </div>
                    <div className="col col-md-5">
                        <h2 className="margin-cadastrar-titulo titulo">Dashboard</h2>
                        <span className="subtitulo">Seja bem vindo a Dashboard do Finanças PRO!</span>
                    </div>
                </div>

                <div id="carouselExampleSlidesOnly" className="carousel slide mt-5" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={vesti2} alt="" className="d-block w-100" />
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col col-md-3">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>

                    <div className="col col-md-3 mt-5">
                        <div className="card-video">
                            <div className="teste"></div>
                            <div className="card-conteudo mt-3">
                                <span className="conteudo-titulo">Assita o video</span>
                                <span>Como verificar métricas do sistema</span>
                            </div>
                            <div className="button-assita mt-3">
                                <button className="btn-assitir">ASSITA</button>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    );
}