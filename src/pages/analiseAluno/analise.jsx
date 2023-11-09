import React, { useState, useEffect } from "react";
import "./analise.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import api from "../../services/api";
import Loading from "../../components/loading/loading";
import { useDispatch } from "react-redux";
import { setAcoes } from "../../redux/action.js";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico.jsx";
import { ToastContainer, toast } from "react-toastify";
import tratarErro from "../../util/tratarErro";

export default function Analise() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

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
            })
            .finally(res => {
                setLoading(false);
            });
    }, [id]);

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

    const dataPizza = [
        ["Pizza", "Popularity"],
        ["Pepperoni", 33],
        ["Hawaiian", 26],
        ["Mushroom", 22],
        ["Sausage", 10],
        ["Anchovies", 9],
    ];


    const dataColumn = [
        ["Element", "Density", { role: "style" }],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.3, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"],
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
                                    subTitulo="Aqui, você pode analisar os resultados e escrever sua análise final"
                                />

                                <AnaliseGrafico data={null} />

                                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                                    <button className="btn-salvar" onClick={handleSubmit}>Próximo</button>
                                    <button className="btn-cancelar" onClick={handleEtapaSubmit}>Voltar para o demonstrativo</button>
                                </div>

                            </>
                        )
                }


            </div>
        </div >
    )
}