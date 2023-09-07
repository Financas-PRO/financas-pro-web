import React from "react";
import './cadSimulador.css'
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function CadSimulador() {

    let navigate = useNavigate();


    const alunosDisponiveis = [
        { id: 1, nome: "Leonardo Mariano" },
        { id: 2, nome: "João Pontes" },
        { id: 3, nome: "João Garcia" },
        { id: 4, nome: "Felipe Silveira" },
        { id: 5, nome: "Gabriel Lanza" },
        { id: 6, nome: "Lucas Gere" },
        { id: 7, nome: "Leonardo Mariano" },
        { id: 8, nome: "João Pontes" },
        { id: 9, nome: "João Garcia" },
        { id: 10, nome: "Felipe Silveira" },
        { id: 11, nome: "Gabriel Lanza" },
        { id: 12, nome: "Lucas Gere" },
        // ... outros alunos
    ];

    return (
        <div className="row-page">
            <div className="col col-md-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-bezier2"
                    titulo="Simulador"
                    subTitulo="Gerenciamento cadastro de simuladores" />


                <form className="formSimulador">
                    <div className="conteudoSimulador mt-5">
                        <div className="row square">
                            <div className="col col-12">
                                <label className="mb-2">Titulo da Simulação</label>
                                <input
                                    type="text"
                                    placeholder="Insira aqui o titulo da simulação"
                                    className="form-control"
                                />
                            </div>
                            <div className="col col-12">
                                <label className="mb-2">Participantes: </label>
                                <div className="alunos-checkboxes d-flex">
                                    {alunosDisponiveis.map(aluno => (
                                        <div key={aluno.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`aluno-${aluno.id}`}
                                                value={aluno.id}
                                            />
                                            <label className="form-check-label" htmlFor={`aluno-${aluno.id}`}>
                                                {aluno.nome}
                                            </label>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
                        <ButtonSalvar nome="Salvar" />
                        <ButtonCancelar link="simulador" nome="Cancelar" />
                    </div>
                </form>
            </div>
        </div>

    );
}