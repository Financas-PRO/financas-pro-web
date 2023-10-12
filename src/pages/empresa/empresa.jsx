import React, { useEffect, useState } from "react";
import "./empresa.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import EmpresaCard from "../../components/empresa/EmpresaCard";
import axios from "axios";

export default function Empresa() {

    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState([]);

    useEffect(() => {

        axios.get(`https://brapi.dev/api/quote/list?search=${busca}&sortBy=close&sortOrder=desc&limit=10`)
            .then(res => {
                setResultados(res.data.stocks);
                console.log(resultados);
            })
            .catch(err => {
                console.log(err);
            })

    }, [busca]);

    function handleChange(e) {
        setBusca(e.target.value.trim());
    }

    return (
        <div className="row-page">

            <div className="col col-md-2 col-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-file-earmark-bar-graph"
                    titulo="Empresas"
                    subTitulo="Selecione suas empresas" />

                <div className="cardFundo mt-5">

                    <input className="form-control mb-4" placeholder="Pesquise a empresa" onChange={handleChange}></input>

                    <div className="row">

                        {
                            resultados.map((empresa) => {
                                return (<EmpresaCard nome={empresa.name} imgurl={empresa.logo} stock={empresa.stock} />);
                            })
                        }

                    </div>
                </div>

                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                    <ButtonSalvar nome="Salvar" />
                    <ButtonCancelar link="professor/gerenciar" nome="Cancelar" />
                </div>

            </div>
        </div>
    )
}