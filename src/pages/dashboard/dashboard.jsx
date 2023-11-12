// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useEffect, useState } from "react";
import './dashboard.css';
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import Video from "../../components/videos/Video";
import Grafico from "../../components/cardGraficos/grafico";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Simulador from "../../components/simulador/simulador.jsx";
import api from "../../services/api.jsx";

export default function Dashboard() {

    const [videos, setVideos] = useState([]);

    const user = useSelector(state => state.userReducer);

    const [relacaoProfessor, setRelacaoProfessor] = useState({ corrigidos: 0, pendentes: 0 });

    const [grupos, setGrupos] = useState([]); 

    const RelacaoProfessor = () => {
        return (
            <div className="mt-4 dashboard-relacao row justify-content-center gap-5">

                <Link to="/turmas" className="card-relacao card-pendente py-3 col-md-6 col-12">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-2">
                            <span className=""><i className="bi-hourglass-bottom"></i></span>
                        </div>
                        <div className="col-8">
                            <span>Pendentes</span>
                        </div>
                        <div className="col-2">
                            <span>{relacaoProfessor.pendentes}</span>
                        </div>
                    </div>


                </Link>
                <Link to="/turmas" className="card-relacao card-corrigidos py-3 col-md-6 col-12">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-2">
                            <span className=""><i className="bi bi-check2-circle"></i></span>
                        </div>
                        <div className="col-8 mr-3 ">
                            <span>Corrigidos</span>
                        </div>
                        <div className="col-2">
                            <span>{relacaoProfessor.corrigidos}</span>
                        </div>
                    </div>

                </Link>

            </div>
        );
    }

    const RelacaoAluno = () => {
        return (
            <div className="row mt-5 cardFundo">

                    {
                        grupos.slice(0,3).map(grupo => {

                            let alunos = [];

                            grupo.alunos.forEach(aluno => {
                                alunos.push(aluno.nome);
                            });

                            return (
                                <Simulador
                                    titulo={grupo.descricao}
                                    etapa={grupo.etapa}
                                    nomes={alunos.join(", ")}
                                    rota={grupo.rota}
                                />

                            )
                        })
                    }

                </div>
        );
    };

    useEffect(() => {
        fetch('videos.json')
            .then(async (res) => {
                let dados = await res.json();
                setVideos(dados);
            });
    }, []);

    function getSituacao(){
        console.log("Do nothing.");
    }

    function getGrupos(){
        api.get(`grupo/1`)
            .then(res => {
                if (res.status == 200) {
                    setGrupos(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {

        switch (user.tipo_de_usuario.id){
            case 1:
                getSituacao();
            break;

            case 2:
                getSituacao();
            break;

            case 3:
                getGrupos();
            break;

            default:
        }
    }, [user.tipo_de_usuario.id])

    return (


        <div className="row-page">

            <Header />


            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-house-gear-fill"
                    titulo="Dashboard"
                    subTitulo={user.tipo_de_usuario.id === 1 || user.tipo_de_usuario.id === 2 ? "Situação de correções" : "Últimas atualizações"}
                />

                { user.tipo_de_usuario.id === 1 || user.tipo_de_usuario.id === 2 ? (<RelacaoProfessor/>) : (<RelacaoAluno/>)}

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