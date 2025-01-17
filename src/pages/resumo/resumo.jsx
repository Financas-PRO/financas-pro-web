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
    
          const demonstrativosData = acaoSelecionada && acaoSelecionada.demonstrativos ? acaoSelecionada.demonstrativos : {};
    
          const historicoData = acaoSelecionada && acaoSelecionada.historico ? acaoSelecionada.historico : [];
          const historicHeaders = ["HISTORICO"];
          const historicoRows = [];
    
          if (acaoSelecionada && acaoSelecionada.historico) {
            historicoData.forEach((historico) => {
              historicHeaders.push(historico.data_acao);
              historicoRows.push([
                historico.preco_abertura,
                historico.preco_mais_alto,
                historico.preco_mais_baixo,
                historico.preco_fechamento,
                historico.preco_fechamento_ajustado,
                historico.id,
              ]);
            });
          }
    
          const dividendosData = acaoSelecionada && acaoSelecionada.dividendos ? acaoSelecionada.dividendos : [];
          const dividendosHeaders = ["DIVIDENDO"];
          const dividendosRows = [];
    
          if (acaoSelecionada && acaoSelecionada.dividendos) {
            dividendosData.forEach((dividendo) => {
              dividendosHeaders.push(dividendo.relacionado);
              dividendosRows.push([
                dividendo.ativo_emitido,
                dividendo.taxa,
                dividendo.rotulo,
              ]);
            });
          }
    
          const data = [
           ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
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
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            [...historicHeaders],
            ["PREÇO ABERTURA", ...historicoRows.map((row) => row[0])],
            ["PREÇO MAIS ALTO", ...historicoRows.map((row) => row[1])],
            ["PREÇO MAIS BAIXO", ...historicoRows.map((row) => row[2])],
            ["PREÇO FECHAMENTO", ...historicoRows.map((row) => row[3])],
            ["PREÇO FECHAMENTO AJUSTADO", ...historicoRows.map((row) => row[4])],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            [...dividendosHeaders],
            ["ATIVO EMITIDO", ...dividendosRows.map((row) => row[0])],
            ["TAXA", ...dividendosRows.map((row) => row[1])],
            ["ROTULO", ...dividendosRows.map((row) => row[2])],
            ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            ...Object.keys(demonstrativosData).map((key) => [
              key.toUpperCase(), demonstrativosData[key],
            ]),
            ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    
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
                <Title titulo="Resumo" icon="bi-body-text" subTitulo="Resumo análise, confira todo o conteúdo abaixo." />
                <TabelaDemonstrativo planilha={planilha} readonly={true}/>
                <AnaliseGrafico data={null} readonly={true}/>

                <form className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4" onSubmit={handleSubmit}>
                    <ButtonCancelar nome="Cancelar" link={`analise/${id}`} />
                    <ButtonSalvar nome="Finalizar" />
                </form>
            </div>
        </div>


    )
}

export default Resumo;