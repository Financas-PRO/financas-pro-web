import React, { useRef, useEffect, useState } from "react";
import "./demonstrativo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "handsontable/dist/handsontable.full.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import Title from "../../components/title/title";

import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";


import ExcelJS from "exceljs"; // npm install exceljs
import { saveAs } from "file-saver"; // npm install file-saver

registerAllModules();

// -------------------- TESTE-----------------------------
// const data = new Array(200) // number of rows
//   .fill()
//   .map((_, row) =>
//     new Array(13) // number of columns
//       .fill()
//       .map((_, column) => `${row}, ${column}`)
//   );
// -------------------- TESTE-----------------------------

export default function Demostrativo() {
  const [acao, setAcao] = useState([]);
  const hotTableComponent = useRef([]);

  /*-----------------------------------------------------------------------------------------------*/
  const exportarExcel = () => {
    if (hotTableComponent.current) {
      const hotInstance = hotTableComponent.current.hotInstance;
      const data = hotInstance.getData();
      const columnHeaders = hotInstance.getColHeader();
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Demonstrativo Financeiro");

      // Adicione os nomes das colunas à primeira linha
      worksheet.addRow(columnHeaders);
      // Adicione os dados à planilha
      data.forEach((row) => {
        worksheet.addRow(row);
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
    api
      .get(`acoes/1`)
      .then((res) => {
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
  // const acaoData = {
  //   Empresa: acao.longName,
  //   Data: acao.regularMarketTime,
  //   Abreviacao: acao.shortName,
  //   MediaDosUltimos200Dias: formatarMoeda(acao.twoHundredDayAverage),
  //   MudancaNaMediaDe200Dias: acao.twoHundredDayAverageChange,
  //   MudancaPercentualNaMediaDe200Dias: acao.twoHundredDayAverageChangePercent,
  //   CapitalizacaoDeMercado: formatarMoeda(acao.marketCap),
  //   MudancaNoMercadoRegular: acao.regularMarketChange,
  //   MudancaPercentualNoMercadoRegular: acao.regularMarketChangePercent,
  //   PrecoDoMercadoRegular: formatarMoeda(acao.regularMarketPrice),
  //   AltaNoDiaDeNegociacaoRegular: formatarMoeda(acao.regularMarketDayHigh),
  //   FaixaNoDiaDeNegociacaoRegular: acao.regularMarketDayRange,
  //   BaixaNoDiaDeNegociacaoRegular: formatarMoeda(acao.regularMarketDayLow),
  //   VolumeNoMercadoRegular: formatarMoeda(acao.regularMarketVolume),
  //   FechamentoAnteriorNoMercadoRegular: formatarMoeda(acao.regularMarketPreviousClose),
  //   AberturaNoMercadoRegular: formatarMoeda(acao.regularMarketOpen),
  //   VolumeMedioDiarioNosUltimos3Meses: formatarMoeda(acao.averageDailyVolume3Month),
  //   VolumeMedioDiarioNosUltimos10Dias: formatarMoeda(acao.averageDailyVolume10Day),
  //   MudancaNaBaixaDe52Semanas: formatarMoeda(acao.fiftyTwoWeekLowChange),
  //   MudancaPercentualNaBaixaDe52Semanas: acao.fiftyTwoWeekLowChangePercent,
  //   FaixaDe52Semanas: acao.fiftyTwoWeekRange,
  //   MudancaNaAltaDe52Semanas: formatarMoeda(acao.fiftyTwoWeekHighChange),
  //   MudancaPercentualNaAltaDe52Semanas: acao.fiftyTwoWeekHighChangePercent,
  //   BaixaDe52Semanas: formatarMoeda(acao.fiftyTwoWeekLow),
  //   AltaDe52Semanas: formatarMoeda(acao.fiftyTwoWeekHigh),
  //   RelacaoPrecoLucro: formatarMoeda(acao.priceEarnings),
  //   LucroPorAcao: formatarMoeda(acao.earningsPerShare),
  //   AtualizadoEm: acao.updatedAt,
  // };

  // const hotTableData = [acaoData];

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

        {/* <HotTable
          // ref={hotTableComponent}
          // data={}
          width="100%"
          height={400}
          rowHeaders={false}
          colHeaders={[
            "Empresa",
            "Data",
            "Abreviação",
            "Média dos Últimos 200 Dias",
            "Mudança na Média de 200 Dias",
            "Mudança Percentual na Média de 200 Dias",
            "Capitalização de Mercado",
            "Mudança no Mercado Regular",
            "Mudança Percentual no Mercado Regular",
            "Preço do Mercado Regular",
            "Alta no Dia de Negociação Regular",
            "Faixa no Dia de Negociação Regular",
            "Baixa no Dia de Negociação Regular",
            "Volume no Mercado Regular",
            "Fechamento Anterior no Mercado Regular",
            "Abertura no Mercado Regular",
            "Volume Médio Diário nos Últimos 3 Meses",
            "Volume Médio Diário nos Últimos 10 Dias",
            " Mudança na Baixa de 52 Semanas",
            "Mudança Percentual na Baixa de 52 Semanas",
            " Faixa de 52 Semanas",
            " Mudança na Alta de 52 Semanas",
            "Mudança Percentual na Alta de 52 Semanas",
            "Baixa de 52 Semanas",
            "Alta de 52 Semanas",
            "Relação Preço/Lucro",
            "Lucro por Ação",
            " Atualizado em",
          ]}
          rowHeights={40}
          colHeights={40}
          colWidths={150}
          manualColumnResize={true}
          fixedColumnsStart={2}
          className="custom-hot-table htCenter"
          licenseKey="non-commercial-and-evaluation"
        /> */}
      </div>
    </div>
  );
}
