// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";


export default function Simuladores() {

    let { id } = useParams();

    const [grupos, setGrupos] = useState([]);
    const user = useSelector(state => state.userReducer);

    useEffect(() => {
        api.get(`grupo/${id}`)
            .then(res => {
                if (res.status == 200) {
                    setGrupos(res.data.data);
                }
            })
            .catch(err => {
            });
    }, [id])

    return (
        <div className="row-page">

            <Header />

            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-bezier2"
                    titulo="Simuladores"
                    subTitulo="Selecione o simulador desejado" />


                <div className="cadButton">
                    {
                        user.tipo_de_usuario.id === 3 ? 
                            (
                                <Link to={`/simulador/cadastrar/${id}`} className="btn-criarSi">
                                    <i className="bi bi-bookmark-plus-fill"></i>
                                    Criar novo simulador
                                </Link>
                            ): void(0) 
                    }

                </div>


                <div className="row mt-5 cardFundo">

                    {
                        grupos.map(grupo => {

                            let alunos = [];

                            grupo.alunos.forEach(aluno => {
                                alunos.push(aluno.nome);
                            });

                            return (
                                <Simulador
                                    key={grupo.id}
                                    titulo={grupo.descricao}
                                    etapa={grupo.etapa}
                                    nomes={alunos.join(", ")}
                                    rota={grupo.rota}
                                />

                            )
                        })
                    }

                </div>

                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                    <ButtonCancelar link="turmas" nome="Anterior" />
                </div>
            </div>

        </div>

    );
}