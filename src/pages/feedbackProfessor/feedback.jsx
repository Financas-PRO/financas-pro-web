import React, { useState, useEffect, useRef } from "react";
import "./feedback.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Title from "../../components/title/title";
import TabelaDemonstrativo from "../../components/tabelaDemonstrativo/TabelaDemonstrativo.jsx";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico.jsx";
import { useDispatch, useSelector } from "react-redux";
import api from "../../services/api";
import { setAcaoSelecionada, setAcoes } from "../../redux/action";
import Loading from "../../components/loading/loading";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import tratarErro from "../../util/tratarErro";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setAnalise } from "../../redux/action";
import { CDBModal } from "cdbreact";

export default function Feedback() {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [planilha, setPlanilha] = useState([]);
    const [feedback, setFeedback] = useState({ descricao: null, nota: null });
    const [avaliado, setAvaliado] = useState(false);
    const [modal, setModal] = useState(0);
    const [grupo, setGrupo] = useState({
        id: 1,
        turma: {
            id: 1
        }
    });
    const editorRef = useRef("");

    const acaoSelecionada = useSelector(state => state.acaoSelecionadaReducer);
    const user = useSelector(state => state.userReducer);

    let { id } = useParams();

    const navigate = useNavigate();

    const FeedbackDocente = (props) => {
        return (
            <>
                <div className="row">
                    <h3 className="titulo_modal"><i class="bi bi-bookmark-fill">Avaliação do docente</i></h3>
                </div>

                <div className="row mt-2">
                    <Editor
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue={feedback.descricao ? feedback.descricao : "Escreva aqui sua análise"}
                        disabled={props.readonly}
                        onChange={handleDescricaoChange}
                    />

                </div>

                <div className="row mt-3">
                    <label className="form-label nota_texto">
                        <i className="bi bi-journal-text nota_margin"></i>
                        Nota
                    </label>
                    <input defaultValue={feedback.nota}
                        type="number"
                        disabled={avaliado ? 1 : 0}
                        onChange={handleNotaChange}
                        className="form-control nota"
                        maxLength={10} />
                </div>

                <div className="buttons justify-content-end mb-5 mt-4">
                    {(user.tipo_de_usuario.id === 1 || user.tipo_de_usuario.id === 2) && !avaliado ?
                        (<button className="btn-salvar" onClick={handleSubmit}>Salvar</button>) : void (0)}
                    <button className="btn-cancelar" onClick={() => { setModal(0) }}>Fechar</button>
                </div>
            </>

        )
    }

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
        getTableData();
    }, [acaoSelecionada]);

    useEffect(() => {

        setLoading(true);
        axios.all([
            api.get(`acoes/${id}`),
            api.get(`feedback/${id}`),
            api.get(`analise/${id}`)
        ])
            .then(axios.spread((res1, res2, res3) => {
                dispatch(setAcoes(res1.data.data));
                dispatch(setAcaoSelecionada(res1.data.data[0]));
                setGrupo({
                    id: res1.data.data[0].grupo.id,
                    turma: {
                        id: res1.data.data[0].grupo.turma.id
                    }
                });

                if (res2.data.data.nota) {
                    setAvaliado(true);
                    setFeedback({ descricao: res2.data.data.descricao, nota: res2.data.data.nota });
                }

                dispatch(setAnalise(res3.data.data.descricao));

            }))
            .catch(error => {
                let erros = tratarErro(error.response.data.error);

            })
            .finally(data => {
                setLoading(false);
            });

    }, [id]);

    function handleNotaChange(e) {

        e.preventDefault();

        setFeedback({ ...feedback, nota: parseFloat(e.target.value) });
    }

    function handleDescricaoChange(e) {
        setFeedback({ ...feedback, descricao: editorRef.current.getContent() });

    }

    function handleSubmit(e) {

        e.preventDefault();

        const toast_feedback = toast.loading("Enviando o feedback, aguarde...");

        api.post(`feedback/${id}`, feedback)
            .then(res => {

                toast.update(toast_feedback, {
                    render: "Enviado com sucesso!",
                    type: 'success',
                    isLoading: false,
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored"
                });

                setTimeout(() => {
                    return navigate(`/simuladores/${grupo.turma.id}`);
                }, 1500);

            })
            .catch(error => {

                let erros = tratarErro(error.response.data.error);

                toast.update(toast_feedback, {
                    render: `\n ${erros}`,
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

                                <Title
                                    icon="bi-clipboard-fill"
                                    titulo="Feedback"
                                    subTitulo={user.tipo_de_usuario.id == 3 ?
                                        "Aqui, você terá acesso ao feedback do docente" :
                                        "Dê o feedback ao grupo, de acordo com a sua análise"}
                                />

                                <CDBModal isOpen={modal} toggle={() => { setModal(1) }} centered fade>
                                    <div className="container p-4">
                                        <FeedbackDocente readonly={avaliado ? 1 : 0} />
                                    </div>
                                </CDBModal>

                                <div className="row justify-content-end">
                                    <button onClick={() => { avaliado || user.tipo_de_usuario.id != 3 ? setModal(1) : void (0) }}
                                        className={`col-md-4 col-12 ${avaliado ? 'btn btn-success' : 'btn btn-warning'}`}>
                                        <b>Situação:</b> {avaliado ? 'Avaliado' : "Aguardando professor"}
                                    </button>
                                </div>

                                <TabelaDemonstrativo planilha={planilha} readonly={1} />
                                <AnaliseGrafico readonly={1} />

                            </>
                        )
                }
            </div>

        </div>
    );
}