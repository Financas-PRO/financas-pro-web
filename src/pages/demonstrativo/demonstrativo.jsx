import React, { useEffect, useState } from "react";
import "./demonstrativo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "handsontable/dist/handsontable.full.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import Title from "../../components/title/title";

import Loading from "../../components/loading/loading";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import { useParams, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { setAcoes, setAcaoSelecionada } from "../../redux/action";
import TabelaDemonstrativo from "../../components/tabelaDemonstrativo/TabelaDemonstrativo";
import { ToastContainer, toast } from "react-toastify";

export default function Demostrativo() {

  let { id } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const acao = useSelector((state) => state.acoesReducer);
  const acaoSelecionada = useSelector((state) => state.acaoSelecionadaReducer);


  const [loading, setLoading] = useState(false);
  const [planilha, setPlanilha] = useState([]);
  const [grupo, setGrupo] = useState({
    id: 1,
    turma: {
      id: 1
    }
  });

  useEffect(() => {
    setLoading(true);
    api.get(`acoes/${id}`).then((res) => {

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

  useEffect(() => {
    getTableData();
  }, [acaoSelecionada])

  async function handleSubmit(e) {

    e.preventDefault();

    const toast_submit = toast.loading("Salvando, aguarde...")

    api.put(`grupo/${grupo.id}`, {
      etapa: "Análise",
      acoes: acao
    })
      .then(async (res) => {

        if (res.status) {

          toast.update(toast_submit, {
            render: "Dados salvos com sucesso! Redirecionando...",
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
            return navigate(`/analise/${grupo.id}`, { replace: true });
          }, 1500);

        }

      })
      .catch(function (error) {

        let resposta = error.response.data.error;

        var erros = "";

        if (typeof resposta === 'object') {

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index] + "\n";
          });

        } else erros = resposta;

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

      });
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
                  icon="bi-bezier2"
                  titulo="Demonstrativo Financeiro"
                  subTitulo="Demonstrativo financeiro da empresa"
                />

                <form className="col-12 justify-content-end d-flex text-center align-items-center mt-5" onSubmit={handleSubmit}>
                  <ButtonCancelar nome="Cancelar" link={`simuladores/${grupo.turma.id}`} />
                  <ButtonSalvar nome="Salvar" />
                </form>

                <ToastContainer/>

                <TabelaDemonstrativo planilha={planilha} />

              </>
            )
        }
      </div>
    </div>
  );
}
