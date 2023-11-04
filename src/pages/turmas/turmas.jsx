// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./turmas.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
// import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import Turma from "../../components/turmas/turma";
import { useEffect } from "react";

export default function Turmas() {

    const [turmas, setTurmas] = useState([]);

    useEffect(() => {
        api.get(`turma`)
            .then((res) => {
                //console.log(res);
                console.log(res.data.data);
                setTurmas(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (

        <div className="row-page">

            <Header />


            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-person-video3"
                    titulo="Turmas"
                    subTitulo="Selecione a sua turma"
                />

                <div className="row mt-5 cardFundoTurma">
                    {
                        turmas.map((turma) => {
                            return (<Turma turma={turma.descricao} id={turma.id} />);
                        })
                    }

                </div>

            </div>
        </div>

    );

}