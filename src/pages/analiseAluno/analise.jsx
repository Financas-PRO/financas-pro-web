import React, { useState, useEffect } from "react";
import "./analise.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import api from "../../services/api";
import Loading from "../../components/loading/loading";
import { useDispatch, useSelector } from "react-redux";
import { setAcaoSelecionada, setAcoes } from "../../redux/action.js";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico.jsx";
import { ToastContainer, toast } from "react-toastify";
import tratarErro from "../../util/tratarErro";

export default function Analise() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const acao = useSelector((state) => state.acoesReducer);
    const acaoSelecionada = useSelector((state) => state.acaoSelecionadaReducer);

    const [grupo, setGrupo] = useState({
        id: 1,
        turma: {
            id: 1
        }
    });

    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        setLoading(true);
        api.get(`acoes/${id}`)
            .then((res) => {

                dispatch(setAcoes(res.data.data));

                setGrupo({
                    id: res.data.data[0].grupo.id,
                    turma: {
                        id: res.data.data[0].grupo.turma.id
                    }
                });

                dispatch(setAcaoSelecionada(res.data.data[0]));

            })
            .finally(res => {
                setLoading(false);
            });
    }, [id]);

    function handleAcaoChange(e){

        const value = e.target.value;

        let copia_dados = acao;

        copia_dados.forEach(val => {

            if (val.id == value) {
                dispatch(setAcaoSelecionada(val));
            }
        });

    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate(`/resumo/${grupo.id}`);
    }

    function handleEtapaSubmit(e) {
        e.preventDefault();

        const toast_submit = toast.loading("Enviando seu progresso..");

        api.post(`atualizarEtapa/${id}`, { etapa: "Demonstrativo" })
            .then(res => {

                if (res.status) {

                    toast.update(toast_submit, {
                        render: "Progresso salvo! Redirecionando...",
                        type: "success",
                        isLoading: false,
                        theme: "colored",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });

                    setTimeout(() => {
                        return navigate(`/demonstrativo/${id}`);
                    }, 1500);

                }
            })
            .catch(error => {

                let erros = tratarErro(error.response.data.error);

                toast.update(toast_submit, {
                    render: `Erro ao salvar seu progresso.\n ${erros}`,
                    type: 'error',
                    isLoading: false,
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });

            })
    }

    return (
        <div className="row-page">

            <Header />

            <div className="container mt-4 col-md-8 col-9">
                {
                    loading ? (
                        <div className="h-100 w-100 col-12 aling-items-center">
                            <Loading />
                        </div>
                    ) :
                        (
                            <>
                                <ToastContainer />
                                <Title
                                    icon="bi-bookmark-fill"
                                    titulo="Análise"
                                    subTitulo="Análise os resultados e escrever sua análise final"
                                />

                                <div className="row mt-2 align-items-center">
                                    <div className="col-md-12 col-12">
                                        <label className="mb-2   tituloDemonstrativo">
                                            <i className="bi bi-building"></i>
                                            Empresa selecionada
                                        </label>
                                        <select className="form-select" onChange={handleAcaoChange}>
                                            {acao.map(dado => {
                                                return (<option key={dado.id} value={dado.id}>{dado.nome_curto}</option>);
                                            })}
                                        </select>
                                    </div>


                                </div>

                                <AnaliseGrafico />

                                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                                    <button className="btn-cancelar" onClick={handleEtapaSubmit}>Anterior</button>
                                    <button className="btn-salvar" onClick={handleSubmit}>Salvar</button>
                                </div>

                            </>
                        )
                }


            </div>
        </div >
    )
}