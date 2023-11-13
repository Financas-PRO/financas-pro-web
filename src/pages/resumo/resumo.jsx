import React, { useEffect, useState } from "react";
import Header from "../../components/navbar/header";
import { useSelector } from "react-redux";
import TabelaDemonstrativo from "../../components/tabelaDemonstrativo/TabelaDemonstrativo";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import tratarErro from "../../util/tratarErro";

const Resumo = props => {

    const acaoSelecionada = useSelector(state => state.acaoSelecionadaReducer);
    const analise = useSelector(state => state.analiseReducer);

    const [planilha, setPlanilha] = useState([]);

    const navigate = useNavigate();

    let { id } = useParams();

    function handleSubmit(e) {
        e.preventDefault();

        const toast_submit = toast.loading("Enviando seu progresso..");
        api.post(`analise/${id}`, {
            descricao: analise
        })
        .then(res => {

            if (res.status) {

                toast.update(toast_submit, {
                    render: "Análise finalizada! Redirecionando...",
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
                    return navigate(`/turmas`);
                }, 2500);

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

    return (

        <div className="row-page">
            <Header />

            <div className="container mt-4 col-md-8 col-9">
                <ToastContainer />
                <Title titulo="Resumo" icon="bi-body-text" subTitulo="Antes de enviar sua análise, confira todo o conteúdo abaixo." />
                <TabelaDemonstrativo planilha={planilha} readonly={true}/>
                <AnaliseGrafico data={null} readonly={true}/>

                <form className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4" onSubmit={handleSubmit}>
                    <ButtonSalvar nome="Finalizar" />
                    <ButtonCancelar nome="Voltar" link={`analise/${id}`} />
                </form>
            </div>
        </div>


    )
}

export default Resumo;