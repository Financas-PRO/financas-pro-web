// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useEffect, useState } from "react";
import './dashboard.css';
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import Video from "../../components/videos/Video";
import Grafico from "../../components/cardGraficos/grafico";

export default function Dashboard() {

    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('videos.json')
        .then(async(res) => {
            let dados = await res.json();
            setVideos(dados);
        })
    }, [])
    const dataPizza = [
        ["Corrigid", "Popularity"],
        ["Corrigido", 33],
        ["Pendente", 26]
    ];

    const dataColumnBar = [
        [
            "Element",
            "Density",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Copper", 8.94, "#b87333", null],
        ["Silver", 10.49, "silver", null],
        ["Gold", 19.3, "gold", null],
        ["Platinum", 21.45, "color: #e5e4e2", null],
    ];

    const dataLine = [
        ["x", "dogs", "cats"],
        [0, 0, 0],
        [1, 10, 5],
        [2, 23, 15],
        [3, 17, 9],
        [4, 18, 10],
        [5, 9, 5],
        [6, 11, 3],
        [7, 27, 19],
    ];
    return (


        <div className="row-page">

            <Header />


            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-house-gear-fill"
                    titulo="Dashboard"
                    subTitulo=""
                />

                <div className="row justify-content-center">
                    <Grafico titulo="Relação de feedbacks" grafico="PieChart" data={dataPizza} />
                </div>


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