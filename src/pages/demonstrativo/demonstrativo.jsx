import React, { useEffect, useState } from "react";
import "./demonstrativo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "handsontable/dist/handsontable.full.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import Title from "../../components/title/title";


import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import axios from "axios";


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



 
    /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE DOCENTES QUE ESTÃO ATIVOS */
  
  useEffect(() => {
    axios.get(`https://brapi.dev/api/quote/MGLU3?token=8Pusecs13FPwWAARGkHHyi`).then((res) => {
      //console.log(res);
      console.log(res.data.results[0]);
      setAcao(res.data.results[0]);
      

    });
  }, []);
 
    /*-----------------------------------------------------------------------------------------------*/

  

  const acaoData = {
    Empresa: acao.longName,
    Data: acao.regularMarketTime,
    Abreviacao: acao.shortName,
    Preco_de_mercado_regular: acao.regularMarketPrice,
    Variacao_mercado_regular: acao.regularMarketChange,
    Alto_baixo_mercado_regular: acao.regularMarketDayRange,
    Intervalo_mercado_regular: acao.regularMarketDayRange,
    Variacao_mercado_regular_percent: acao.regularMarketChangePercent,
    Valor_mercado: acao.marketCap,
    Volume_mercado_regular: acao.regularMarketVolume,
    Fechamento_anterior: acao.regularMarketPreviousClose,
    Abertura_mercado: acao.regularMarketOpen,
    Lucro: acao.earningsPerShare,
    
  };
 
  const hotTableData = [acaoData];

  


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
                value={acao.longName || ''}
                readOnly
              />
            </div>
            <div className="col col-md-4 col-12 ">
              <label>Capitalização de Mercado</label>
              <input
                type="text"
                name="capitalizacao_mercado"
                className="form-control"
                value={acao.marketCap || ''}
                readOnly
              />
            </div>
            
            <div className="col col-md-4 col-12 ">
              <label>Ultima atualização</label>
              <input
                type="text"
                name="data_cotacao"
                className="form-control"
                value={acao.regularMarketTime || ''}
                readOnly
              />
              </div>
            <div className="col col-md-6 col-12 ">
              <label>Codigo</label>
              <input
                type="text"
                name="codigo"
                className="form-control"
                value={acao.symbol || ''}
                readOnly
              />
            </div>
            <div className="col col-md-6 col-12 ">
              <label>Preço Atual da Ação</label>
              <input
                type="text"
                name="acao_atual"
                className="form-control"
                value={acao.regularMarketPrice || ''}
                readOnly
              />
            </div>
          </div>
        </div>

        <HotTable
          data={hotTableData}
          width="100%"
          height={440}
          rowHeaders={false}
          colHeaders={['Empresa', 'Data', 'Abreviação ', 'Preço de Mercado Regular', 'Variação de Mercado Regular',
            'Alto e baixo no dia mercado regular', 'Intervalo mercado regular', 'Variação mercado regular', 'Valor mercado',
              'Volume de mercado regular', 'Fechamento anterior', 'Abertura do mercado', 'Lucro']}
          rowHeights={40}
          colHeights={40}
          colWidths={100}
          manualColumnResize={true}
          fixedColumnsStart={2}
          className="custom-hot-table"
          licenseKey="non-commercial-and-evaluation"
      
        />
      </div>
    </div>
  );
}