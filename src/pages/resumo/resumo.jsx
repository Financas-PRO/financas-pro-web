import React, { useEffect, useState } from "react";
import Header from "../../components/navbar/header";
import { useSelector } from "react-redux";
import TabelaDemonstrativo from "../../components/tabelaDemonstrativo/TabelaDemonstrativo";
import AnaliseGrafico from "../../components/analise/AnaliseGrafico";
import Title from "../../components/title/title";

const Resumo = props => {

    const acoes = useSelector(state => state.acoesReducer);
    const acaoSelecionada = useSelector(state => state.acaoSelecionadaReducer);

    const [planilha, setPlanilha] = useState([]);

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
                <Title titulo="Resumo" icon="bi-body-text" subTitulo="Antes de enviar sua análise, confira todo o conteúdo abaixo."/>
                <TabelaDemonstrativo planilha={planilha} />
                <AnaliseGrafico data={null}/>
            </div>
        </div>


    )
}

export default Resumo;