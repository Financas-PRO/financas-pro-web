// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useEffect, useState } from "react";
import './dashboard.css';
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import Video from "../../components/videos/Video";
import api from "../../services/api";

export default function Dashboard() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('videos.json')
        .then(async(res) => {
            let dados = await res.json();
            setVideos(dados);
            console.log(dados);
        })
    }, [])
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
                <div className="row mt-5 align-items-center justify-content-center">
                    {
                        videos.map(video => {
                            return (
                                <Video
                                    titulo={video.titulo}
                                    descricao={video.descricao}
                                    onClick={video.id}
                                    thumbnail={video.thumbnail}
                                />
                            )
                        })
                    }

                </div>
            </div>

        </div>
    );
}