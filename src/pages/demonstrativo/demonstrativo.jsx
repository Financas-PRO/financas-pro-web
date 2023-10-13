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

registerAllModules();

export default function Demostrativo() {
  const [acao, setAcao] = useState([]);
  const hotTableComponent = useRef([]);

  /*-----------------------------------------------------------------------------------------------*/
  const exportarExcel = () => {
    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;
      const data = hotInstance.getData();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Demonstrativo Financeiro");
      const rowHeaders = hotInstance.getRowHeader();

      // Adicione os títulos à primeira coluna
      rowHeaders.forEach((title, index) => {
        worksheet.getCell(index + 1, 1).value = title;
      });

      // Adicione os dados nas colunas restantes
      data.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          worksheet.getCell(rowIndex + 1, colIndex + 2).value = cell || "";
        });
      });

      // Gere um nome de arquivo com uma data aleatória
      const currentDate = new Date();
      const randomDate = `${currentDate.getFullYear()}${
        currentDate.getMonth() + 1
      }${currentDate.getDate()}_${Math.floor(Math.random() * 10000)}`;
      const fileName = `Demonstrativo_${randomDate}.xlsx`;

      // Crie um Blob a partir do arquivo Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        // Use a biblioteca 'file-saver' para salvar o blob com o nome gerado
        saveAs(blob, fileName);
      });
    }
  };

  /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE DOCENTES QUE ESTÃO ATIVOS */
  useEffect(() => {
    api.get(`acoes/1`).then((res) => {
      //console.log(res);
      console.log(res.data.data);
      setAcao(res.data.data);
    });
  }, []);
  /*-----------------------------------------------------------------------------------------------*/

  const formatarMoeda = (valor) => {
    if (valor) {
      const options = {
        style: "currency",
        currency: "BRL",
      };
      return new Intl.NumberFormat("pt-BR", options).format(valor);
    }
    return "";
  };
  /*-----------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------*/

  const acaoSelecionada = acao[0]; // Assumindo que você está pegando apenas o primeiro item da resposta da API

  const historicoData = {}; // crei uma variavel vazia para armazena os dados do historico

  if (acaoSelecionada && acaoSelecionada.historico) {
    // nesta parte verifico se não ha objeto indefinido ou nulo
    acaoSelecionada.historico.forEach((historicoItem) => {
      // faço uma repitação para percorrer o array
      const dataAcao = new Date(historicoItem.data_acao).toLocaleDateString(); // entao aqui para cada data sera inserido abaixo os elementos abaixo
      historicoData[dataAcao] = {
        "Preço Abertura": formatarMoeda(historicoItem.preco_abertura),
        "Preço Mais Alto": formatarMoeda(historicoItem.preco_mais_alto),
        "Preço Mais Baixo": formatarMoeda(historicoItem.preco_mais_baixo),
        "Preço Fechamento": formatarMoeda(historicoItem.preco_fechamento),
        "Preço Fechamento Ajustado": formatarMoeda(
          historicoItem.preco_fechamento_ajustado
        ),
      };
    });
  }

  // precisei fazer uma verificação ternaria de cada ação, onde se ação tiver propriedade ele retorna o dado se nao retorna vazio
  const hotTableData = [
    ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.preco_merc_regular) || ""
        : "",
    ],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.alto_merc_regular) || ""
        : "",
    ],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.baixo_merc_regular) || ""
        : "",
    ],
    [acaoSelecionada ? acaoSelecionada.intervalo_merc_regular || "" : ""],
    [acaoSelecionada ? acaoSelecionada.variacao_merc_regular || "" : ""],
    [acaoSelecionada ? formatarMoeda(acaoSelecionada.valor_merc) || "" : ""],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.volume_merc_regular) || ""
        : "",
    ],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.fecha_ant_merc_regular) || ""
        : "",
    ],
    [
      acaoSelecionada
        ? formatarMoeda(acaoSelecionada.abertura_merc_regular) || ""
        : "",
    ],
    [acaoSelecionada ? formatarMoeda(acaoSelecionada.preco_lucro) || "" : ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    [...Object.keys(historicoData)], // Adicione as datas na primeira linha
    [...Object.values(historicoData).map((item) => item["Preço Abertura"])],
    [...Object.values(historicoData).map((item) => item["Preço Mais Alto"])],
    [...Object.values(historicoData).map((item) => item["Preço Mais Baixo"])],
    [...Object.values(historicoData).map((item) => item["Preço Fechamento"])],
    [
      ...Object.values(historicoData).map(
        (item) => item["Preço Fechamento Ajustado"]
      ),
    ],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ];
  /*-----------------------------------------------------------------------------------------------*/
  /*-----------------------------------------------------------------------------------------------*/

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
    td.style.color = "white";
    td.style.background = "#12304A";
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
      <div className="col col-md-2 col-2" id="sidebar">
        <Header />
      </div>

      <div className="container mt-4 col-md-8 col-9">
        <Title
          icon="bi-bezier2"
          titulo="Demonstrativo Financeiro"
          subTitulo="Demonstrativo financeiro da empresa"
        />

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
                value={acao[0]?.nome_completo || ""}
                readOnly
              />
            </div>
            <div className="col col-md-4 col-12 ">
              <label>Capitalização de Mercado</label>
              <input
                type="text"
                name="capitalizacao_mercado"
                className="form-control"
                value={formatarMoeda(acao[0]?.valor_merc) || ""}
                readOnly
              />
            </div>

            <div className="col col-md-4 col-12 ">
              <label>Ultima atualização</label>
              <input
                type="text"
                name="data_cotacao"
                className="form-control"
                value={acao[0]?.data_importacao || ""}
                readOnly
              />
            </div>
            <div className="col col-md-6 col-12 ">
              <label>Codigo</label>
              <input
                type="text"
                name="codigo"
                className="form-control"
                value={acao[0]?.simbolo || ""}
                readOnly
              />
            </div>
            <div className="col col-md-6 col-12 ">
              <label>Lucro</label>
              <input
                type="text"
                name="acao_atual"
                className="form-control"
                value={formatarMoeda(acao[0]?.preco_lucro) || ""}
                readOnly
              />
            </div>
          </div>
          <div className="float-right mb-2">
            <button
              className="btn btn-success buttonExcel"
              onClick={exportarExcel}
            >
              Excel
            </button>
          </div>
        </div>

        <HotTable
          ref={hotTableComponent}
          data={hotTableData}
          width="100%"
          height="auto"
          rowHeaderWidth={250}
          rowHeaders={[
            "INFORMAÇÕES GERAIS",
            "PREÇO MERCADO REGULAR",
            "ALTA MERCADO REGULAR",
            "BAIXA MERCADO REGULAR",
            "INTERVALO MERCADO REGULAR",
            "VARIAÇÃO MERCARDO REGULAR",
            "VALOR MERCADO",
            "VOLUME MERCADO REGULAR",
            "FECHAMENTO ANTERIOR MERCADO REGULAR",
            "ABERTURA MERCADO REGULAR",
            "PREÇO LUCRO",
            "",
            "HISTORICO",
            "PREÇO ABERTURA",
            "PREÇO MAIS ALTO",
            "PREÇO MAIS BAIXO",
            "PREÇO FECHAMENTO",
            "PREÇO FECHAMENTO AJUSTADO",
            "",
            "",
          ]}
          colHeaders={false}
          rowHeights={40}
          colHeights={40}
          colWidths={150}
          mergeCells={[
            { row: 0, col: 0, rowspan: 1, colspan: 14 },
            { row: 11, col: 0, rowspan: 1, colspan: 14 },
          ]}
          className="custom-hot-table htCenter"
          licenseKey="non-commercial-and-evaluation"
          cells={function (row, col) {
            const cellProperties = {};
            if (row === 0) {
              cellProperties.renderer = firstRowRenderer;
            } else if (row === 11) {
              cellProperties.renderer = firstRowRenderer;
            } else {
              cellProperties.renderer = "negativeValueRenderer";
            }
            return cellProperties;
          }}
        />
      </div>
    </div>
  );
}
