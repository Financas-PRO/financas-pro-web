import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerRenderer, textRenderer } from "handsontable/renderers";
import ExcelJS from "exceljs"; // npm install exceljs
import { saveAs } from "file-saver"; // npm install file-saver
import { HyperFormula } from 'hyperformula';
import { setAcaoSelecionada, setAcoes } from "../../redux/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

registerAllModules();

const TabelaDemonstrativo = props => {

    const dispatch = useDispatch();

    const acao = useSelector((state) => state.acoesReducer);
    const acaoSelecionada = useSelector((state) => state.acaoSelecionadaReducer);

    const hotTableComponent = useRef([]);

    const options = {
        licenseKey: 'internal-use-in-handsontable'
    };

    const hfInstance = HyperFormula.buildEmpty(options);

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
                    dispatch(setAcaoSelecionada(val));
                }
            });

            dispatch(setAcoes(copia_dados));
        }
    }

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
    //  maps function to a lookup string
    registerRenderer("negativeValueRenderer", negativeValueRenderer);

    return (
        <>
        <ToastContainer/>
            <div className="row mt-2 align-items-center">
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
                data={props.planilha}
                width="100%"
                height="auto"
                rowHeaderWidth={60}
                rowHeaders={true}
                formulas={{
                    engine: hfInstance
                }}
                readOnly={props.readonly ? 1 : 0}
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

export default TabelaDemonstrativo;