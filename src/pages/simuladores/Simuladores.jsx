// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./simuladores.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";


export default function Simuladores(){

    return(
        <div className="row-page">
            <div className="col col-md-2">
                <Header />
            </div>
            <div className="container mt-4 col-md-8">
                <ToastContainer className="toast-top-right" />

                <div className="title">
                    <div className="col col-md-1 col-12">
                        {/* <i class="bi bi-person-plus-fill icon-titulo"></i> */}
                    </div>
                    <div className="col col-md-5">
                        <h2 className="margin-cadastrar-titulo titulo">Simuladores</h2>
                        <span className="subtitulo">Gerenciamento seus simuladores</span>
                    </div>
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
                    <button className="btn-salvar">Salvar</button>
                    <Link to="/dashboard" className="btn-cancelar">Cancelar</Link>
                </div>
            </div>
            
        </div>

    );
}