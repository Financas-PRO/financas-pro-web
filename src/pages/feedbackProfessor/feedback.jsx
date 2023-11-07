import React, { useState, useEffect, useReducer, useRef } from "react";
import "./feedback.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import TabelaDemonstrativo from "../../components/tabelaDemonstrativo/TabelaDemonstrativo.jsx";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico.jsx";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { setAcoes } from "../../redux/action";
import Loading from "../../components/loading/loading";
import { Editor } from "@tinymce/tinymce-react";

export default function Feedback() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [planilha, setPlanilha] = useState([]);

    const editorRef = useRef(null);
    const [feedback, setFeedback] = useState("");

    const [grupo, setGrupo] = useState({
        id: 1,
        turma: {
            id: 1
        }
    });

    const navigate = useNavigate();
    let { id } = useParams();

    const acaoSelecionada = useReducer(state => state.acaoSelecionada);

    function getTableData() {

        if (acaoSelecionada.planilha_grupo && acaoSelecionada.planilha_grupo != "null") {
            setPlanilha(acaoSelecionada.planilha_grupo)
        } else {

            const historicoData = {}; // crei uma variavel vazia para armazena os dados do historico

            const demonstrativosData = acaoSelecionada && acaoSelecionada.demonstrativos ? acaoSelecionada.demonstrativos : {};

            if (acaoSelecionada && acaoSelecionada.historico) {
                // nesta parte verifico se não ha objeto indefinido ou nulo
                acaoSelecionada.historico.forEach((historicoItem) => {
                    // faço uma repitação para percorrer o array
                    const dataAcao = new Date(historicoItem.data_acao).toLocaleDateString(); // entao aqui para cada data sera inserido abaixo os elementos abaixo
                    historicoData[dataAcao] = {
                        "Preço Abertura": historicoItem.preco_abertura,
                        "Preço Mais Alto": historicoItem.preco_mais_alto,
                        "Preço Mais Baixo": historicoItem.preco_mais_baixo,
                        "Preço Fechamento": historicoItem.preco_fechamento,
                        "Preço Fechamento Ajustado": historicoItem.preco_fechamento_ajustado
                    };
                });
            }

            const data = [
                ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["PREÇO MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.preco_merc_regular || "" : ""],
                ["ALTA MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.alto_merc_regular || "" : ""],
                ["BAIXA MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.baixo_merc_regular || "" : ""],
                ["INTERVALO MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.intervalo_merc_regular || "" : ""],
                ["VARIAÇÃO MERCARDO REGULAR", acaoSelecionada ? acaoSelecionada.variacao_merc_regular || "" : ""],
                ["VALOR MERCADO", acaoSelecionada ? acaoSelecionada.valor_merc || "" : ""],
                ["VOLUME MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.volume_merc_regular || "" : ""],
                ["FECHAMENTO ANTERIOR MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.fecha_ant_merc_regular || "" : ""],
                ["ABERTURA MERCADO REGULAR", acaoSelecionada ? acaoSelecionada.abertura_merc_regular || "" : ""],
                ["PREÇO LUCRO", acaoSelecionada ? acaoSelecionada.preco_lucro || "" : ""],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ["HISTORICO", ...Object.keys(historicoData)], // Adicione as datas na primeira linha
                ["PREÇO ABERTURA", ...Object.values(historicoData).map((item) => item["Preço Abertura"])],
                ["PREÇO MAIS ALTO", ...Object.values(historicoData).map((item) => item["Preço Mais Alto"])],
                ["PREÇO MAIS BAIXO", ...Object.values(historicoData).map((item) => item["Preço Mais Baixo"])],
                ["PREÇO FECHAMENTO", ...Object.values(historicoData).map((item) => item["Preço Fechamento"])],
                ["PREÇO FECHAMENTO AJUSTADO", ...Object.values(historicoData).map((item) => item["Preço Fechamento Ajustado"])],
                ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                ...Object.keys(demonstrativosData).map((key) => [
                    key.toUpperCase(), demonstrativosData[key],
                ]),
                ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],

            ];

            setPlanilha(data);
        }

    }

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

    useEffect(() => {
        getTableData();
    }, [acaoSelecionada])

    function setFeedbackTexto(){
        if (editorRef.current) {
            setFeedback(editorRef.current.getContent());
        }
        console.log(analise);
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

                                <Title
                                    icon="bi-clipboard-fill"
                                    titulo="Feedback"
                                    subTitulo="Dê o feedback ao grupo, de acordo com a sua análise abaixo"
                                />

                                <TabelaDemonstrativo planilha={planilha} readonly={1} />
                                <AnaliseGrafico readonly={1} />

                                <div className="row mt-5">

                                    <div className="col-12">
                                        <h3>Escreva aqui seu feedback</h3>
                                    </div>

                                    <div className="col-12" id="feedback">
                                        <Editor
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            initialValue={feedback ? feedback : "Escreva aqui sua análise"}
                                            onChange={setFeedbackTexto}
                                        />
                                    </div>

                                </div>

                            </>


                        )
                }
            </div>





        </div>
    );
}