// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import './dashboard.css';
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import Video from "../../components/videos/Video";

export default function Dashboard() {
    return (


        <div className="row-page">

            <Header />


            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-house-gear-fill"
                    titulo="Dashboard"
                    subTitulo=""
                />


                <Title
                    icon="bi-play-btn"
                    titulo="Manuais"
                    subTitulo="Assista os vídeos abaixo"
                />
                <div className="row mt-5">

                    <Video
                        titulo="Cadastros"
                        descricao="Como cadastrar"
                        onClick={void (0)}
                    />

                    <Video
                        titulo="Cadastros"
                        descricao="Como cadastrar"
                        onClick={void (0)}
                    />

                    <Video
                        titulo="Cadastros"
                        descricao="Como cadastrar"
                        onClick={void (0)}
                    />

                    <Video
                        titulo="Cadastros"
                        descricao="Como cadastrar"
                        onClick={void (0)}
                    />

                </div>
            </div>

        </div>
    );
}