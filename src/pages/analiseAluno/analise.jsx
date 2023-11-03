import React, { useState, useRef, useEffect } from "react";
import "./analise.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import Grafico from '../../components/cardGraficos/grafico';
import { Editor } from "@tinymce/tinymce-react";
import api from "../../services/api";
import Loading from "../../components/loading/loading";

export default function Analise() {

    const [texto, setTexto] = useState("");
    const [loading, setLoading] = useState(false);
    const [acao, setAcao] = useState([]);
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
        api.get(`acoes/${id}`).then((res) => {
            setAcao(res.data.data);
            setGrupo({
                id: res.data.data[0].grupo.id,
                turma: {
                    id: res.data.data[0].grupo.turma.id
                }
            });
            // setAcaoSelecionada(res.data.data[0]);
        })
            .finally(res => {
                setLoading(false);
            });
    }, [id]);

    function handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('texto', texto);

        navigate(`/resumo/${grupo.id}`);
    }

    const editorRef = useRef(null);
    const getTexto = () => {
        if (editorRef.current) {
            setTexto(editorRef.current.getContent());
        }
    };

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
                                <Title
                                    icon="bi-bookmark-fill"
                                    titulo="Análise"
                                    subTitulo="Aqui, você pode analisar os resultados e escrever sua análise final"
                                />

                                <div className="row mt-5">
                                    <Grafico grafico="PieChart" data={dataPizza} />
                                    <Grafico grafico="ColumnChart" data={dataColumn} />
                                    <Grafico grafico="BarChart" data={dataColumnBar} />
                                    <Grafico grafico="LineChart" data={dataLine} />
                                </div>

                                <div className="row">
                                    <Editor
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>This is the initial content of the editor.</p>"
                                        onChange={getTexto}

                                    />
                                </div>

                                <form className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4" onSubmit={handleSubmit}>
                                    <ButtonSalvar nome="Salvar" />
                                    <ButtonCancelar nome="Cancelar" link={`demonstrativo/${id}`} />
                                </form>

                            </>
                        )
                }


            </div>
        </div >
    )
}