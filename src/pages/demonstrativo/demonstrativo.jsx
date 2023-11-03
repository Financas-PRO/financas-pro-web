import React, { useRef, useEffect, useState } from "react";
import "./demonstrativo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "handsontable/dist/handsontable.full.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import Title from "../../components/title/title";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerRenderer, textRenderer } from "handsontable/renderers";
import ExcelJS from "exceljs"; // npm install exceljs
import { saveAs } from "file-saver"; // npm install file-saver
import { HyperFormula } from 'hyperformula';
import Loading from "../../components/loading/loading";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerAllModules();

export default function Demostrativo() {

  let { id } = useParams();
  let navigate = useNavigate();

  const [acao, setAcao] = useState([]);
  const [acaoSelecionada, setAcaoSelecionada] = useState({});
  const hotTableComponent = useRef([]);
  const [loading, setLoading] = useState(false);
  const [planilha, setPlanilha] = useState([]);

  const [grupo, setGrupo] = useState({
    id: 1,
    turma: {
      id: 1
    }
  });

  const options = {
    licenseKey: 'internal-use-in-handsontable'
  };
  const hfInstance = HyperFormula.buildEmpty(options);

  /*----------------FUNÇÃO PARA LISTAR TODOS DADOS AÇÕES SELECIONADA --------------------------- */
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
      setAcaoSelecionada(res.data.data[0]);
    })
      .finally(res => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    getTableData();
  }, [acaoSelecionada])

  function handleAcaoChange(e) {

    const value = e.target.value;

    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;
      const data_planilha = hotInstance.getSourceData();

      let copia_dados = acao;

      copia_dados.forEach(val => {
        if (val.id == acaoSelecionada.id) {
          val.planilha_grupo = data_planilha;
        }

        if (val.id == value) {
          setAcaoSelecionada(val);
        }
      });

      setAcao(copia_dados);

    }
  }
  /*-----------------------------------------------------------------------------------------------*/


  /*----------------------------------EXPORTA POR EXCEL------------------------------------------*/
  const exportarExcel = () => {

    const toast_excel = toast.loading("Salvando, aguarde...");

    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;
      const data = hotInstance.getData();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Demonstrativo Financeiro");

      // Adicione os dados nas colunas, pulando a primeira linha que contém os cabeçalhos de linha
      data.forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          // Adicione os cabeçalhos de coluna (primeira linha)
          row.forEach((cell, colIndex) => {
            worksheet.getCell(rowIndex + 1, colIndex + 1).value = cell || "";
          });
        } else {
          // Adicione os dados (linhas subsequentes)
          row.forEach((cell, colIndex) => {
            worksheet.getCell(rowIndex, colIndex + 1).value = cell || "";
          });
        }
      });

      // Gere um nome de arquivo com uma data aleatória
      const currentDate = new Date();
      const randomDate = `${currentDate.getFullYear()}${currentDate.getMonth() + 1}${currentDate.getDate()}_${Math.floor(Math.random() * 10000)}`;
      const fileName = `Demonstrativo_${randomDate}.xlsx`;

      // Crie um Blob a partir do arquivo Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Use a biblioteca 'file-saver' para salvar o blob com o nome gerado
        saveAs(blob, fileName);

        toast.update(toast_excel, {
          render: "Arquivo salvo.",
          type: "success",
          isLoading: false,
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      });
    }
  };

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
  /*-----------------------------------------------------------------------------------------------*/

  /*-------------------------------------RETORNO DOS DADOS NA PLANILHA ----------------------------*/

  function getTableData() {

    if (acaoSelecionada.planilha_grupo || acaoSelecionada.planilha_grupo == "null") {
      Array.isArray(acaoSelecionada.planilha_grupo) ?
      setPlanilha(acaoSelecionada.planilha_grupo) : setPlanilha(JSON.parse(acaoSelecionada.planilha_grupo));
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
  // precisei fazer uma verificação ternaria de cada ação, onde se ação tiver propriedade ele retorna o dado se nao retorna vazio
  /*-----------------------------------------------------------------------------------------------*/
  /*-------------------------------------COR NA COLUNA DA PLANILHA---------------------------------*/

  function firstRowRenderer(
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  ) {
    textRenderer.apply(this, arguments);
    td.style.fontWeight = "bold";
    td.setAttribute("style", "color: white !important; background: #12304A;");
  }

  function negativeValueRenderer(
    instance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  ) {
    textRenderer.apply(this, arguments);

    if (!value || value === "") {
      td.style.background = "#EEE";
    } else {
      td.style.background = "";
    }
  }
  //  maps function to a lookup string
  registerRenderer("negativeValueRenderer", negativeValueRenderer);

  /*-----------------------------------------------------------------------------------------------*/



  return (

    <div className="row-page">
      <ToastContainer className="toast-top-right" />

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

                <div className="row mt-2 justify-content-end align-items-center">
                  <div className="col-md-4 col-12">
                    <label className="mb-2 tituloDemonstrativo" style={{ color: 'black' }}>
                      Empresa selecionada
                    </label>
                    <select className="form-select" onChange={handleAcaoChange}>
                      {acao.map(dado => {
                        return (<option value={dado.id}>{dado.nome_curto}</option>);
                      })}
                    </select>
                  </div>

                  <form className="col-md-8 col-12 justify-content-end d-flex text-center align-items-center" onSubmit={handleSubmit}>
                    <ButtonCancelar nome="Voltar" link={`simuladores/${grupo.turma.id}`} />
                    <ButtonSalvar nome="Salvar dados" />
                  </form>
                </div>

                <div className="row mt-4 mb-4 cardFundoDemonstrativo">
                  <div className="row square">
                    <label className="mb-2 tituloDemonstrativo">
                      Informações Gerais
                    </label>
                    <div className="col col-md-4 col-12 ">
                      <label>Nome</label>
                      <input
                        type="text"
                        name="nome"
                        className="form-control"
                        value={acaoSelecionada?.nome_completo || ""}
                        readOnly
                      />
                    </div>
                    <div className="col col-md-4 col-12 ">
                      <label>Capitalização de Mercado</label>
                      <input
                        type="text"
                        name="capitalizacao_mercado"
                        className="form-control"
                        value={acaoSelecionada?.valor_merc || ""}
                        readOnly
                      />
                    </div>

                    <div className="col col-md-4 col-12 ">
                      <label>Ultima atualização</label>
                      <input
                        type="text"
                        name="data_cotacao"
                        className="form-control"
                        value={acaoSelecionada?.data_importacao || ""}
                        readOnly
                      />
                    </div>
                    <div className="col col-md-6 col-12 ">
                      <label>Codigo</label>
                      <input
                        type="text"
                        name="codigo"
                        className="form-control"
                        value={acaoSelecionada?.simbolo || ""}
                        readOnly
                      />
                    </div>
                    <div className="col col-md-6 col-12 ">
                      <label>Lucro</label>
                      <input
                        type="text"
                        name="acao_atual"
                        className="form-control"
                        value={acaoSelecionada?.preco_lucro || ""}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="row justify-content-end mb-2">
                    <button
                      className="btn py-0 col-2 btn-success buttonExcel align-items-center"
                      onClick={exportarExcel}
                    >
                      <i style={{ fontSize: '1.5em', marginRight: "5px" }} className="bi bi-filetype-xlsx"></i>
                      Exportar dados
                    </button>
                  </div>
                </div>

                <HotTable
                  ref={hotTableComponent}
                  data={planilha}
                  width="100%"
                  height="auto"
                  rowHeaderWidth={60}
                  rowHeaders={true}
                  formulas={{
                    engine: hfInstance
                  }}
                  // rowHeaders={[
                  //   "INFORMAÇÕES GERAIS",
                  //   "PREÇO MERCADO REGULAR",
                  //   "ALTA MERCADO REGULAR",
                  //   "BAIXA MERCADO REGULAR",
                  //   "INTERVALO MERCADO REGULAR",
                  //   "VARIAÇÃO MERCARDO REGULAR",
                  //   "VALOR MERCADO",
                  //   "VOLUME MERCADO REGULAR",
                  //   "FECHAMENTO ANTERIOR MERCADO REGULAR",
                  //   "ABERTURA MERCADO REGULAR",
                  //   "PREÇO LUCRO",
                  //   "",
                  //   "HISTORICO",
                  //   "PREÇO ABERTURA",
                  //   "PREÇO MAIS ALTO",
                  //   "PREÇO MAIS BAIXO",
                  //   "PREÇO FECHAMENTO",
                  //   "PREÇO FECHAMENTO AJUSTADO",
                  //   "",
                  //   "",
                  // ]}
                  colHeaders={true}
                  rowHeights={40}
                  colHeights={40}
                  colWidths={180}
                  mergeCells={[
                    { row: 0, col: 0, rowspan: 1, colspan: 14 },
                    { row: 11, col: 0, rowspan: 1, colspan: 14 },
                    { row: 18, col: 0, rowspan: 1, colspan: 14 },
                  ]}
                  className="custom-hot-table htCenter"
                  licenseKey="non-commercial-and-evaluation"
                  cells={function (row, col) {
                    const cellProperties = {};
                    if (row === 0) {
                      cellProperties.renderer = firstRowRenderer;
                    } else if (row === 11) {
                      cellProperties.renderer = firstRowRenderer;
                    } else if (row === 18) {
                      cellProperties.renderer = firstRowRenderer;
                    }
                    else {
                      cellProperties.renderer = "negativeValueRenderer";
                    }
                    return cellProperties;
                  }}
                />

              </>
            )
        }
      </div>
    </div>
  );
}
