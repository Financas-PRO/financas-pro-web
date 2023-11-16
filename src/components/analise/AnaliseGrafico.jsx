import React, { useRef, useEffect, useState } from "react";
import Grafico from "../cardGraficos/grafico";
import { useDispatch, useSelector } from "react-redux";
import { setAnalise } from "../../redux/action";
import { Editor } from "@tinymce/tinymce-react";

const AnaliseGrafico = props => {

    const editorRef = useRef(null);

    const dispatch = useDispatch();

    const analise = useSelector((state) => state.analiseReducer);

    const init = {
        labels:  [1],
        datasets: [
            {
                label: "Histórico", // Setting up the label for the dataset
                backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
                data: [1], // Setting up the data for the dataset
            },
            {
                label: "Preço Abertura", // Setting up the label for the dataset
                backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
                data: [1], // Setting up the data for the dataset
            },
            {
                label: "Preço Mais Alto", // Setting up the label for the dataset
                backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
                data: [1], // Setting up the data for the dataset
            },
            {
                label: "Preço Mais Baixo", // Setting up the label for the dataset
                backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
                data: [1], // Setting up the data for the dataset
            },
            {
                label: "Preço Fechamento", // Setting up the label for the dataset
                backgroundColor: "rgb(255, 99, 132)", // Setting up the background color for the dataset
                borderColor: "rgb(255, 99, 132)", // Setting up the border color for the dataset
                data: [1], // Setting up the data for the dataset
            },
        ],
    };
    const [data, setData] = useState(init);
    const [dataDividendo, setDataDividendo] = useState(init);


    const setTexto = () => {
        if (editorRef.current) {
            dispatch(setAnalise(editorRef.current.getContent()));
        }
    };

    const acaoSelecionada = useSelector(state => state.acaoSelecionadaReducer);

    function trocarGraficos(){

            const dados = {
                labels:  acaoSelecionada.historico.slice(0,10).map(item => { return new Date(item.data_acao).toLocaleDateString()  }),
                datasets: [
                    {
                        label: "Preço Abertura", // Setting up the label for the dataset
                        backgroundColor: "rgba(59, 61, 217, 1)", // Setting up the background color for the dataset
                        borderColor: "rgba(59, 61, 217, 1)", // Setting up the border color for the dataset
                        data: acaoSelecionada.historico.slice(0,10).map(item => { return item.preco_abertura }), // Setting up the data for the dataset
                    },
                    {
                        label: "Preço Mais Alto", // Setting up the label for the dataset
                        backgroundColor: "rgba(80, 217, 59, 1);", // Setting up the background color for the dataset
                        borderColor: "rgba(80, 217, 59, 1);", // Setting up the border color for the dataset
                        data: acaoSelecionada.historico.slice(0,10).map(item => { return item.preco_mais_alto }), // Setting up the data for the dataset
                    },
                    {
                        label: "Preço Mais Baixo", // Setting up the label for the dataset
                        backgroundColor: "rgba(217, 217, 59, 1)", // Setting up the background color for the dataset
                        borderColor: "rgba(217, 217, 59, 1)", // Setting up the border color for the dataset
                        data: acaoSelecionada.historico.slice(0,10).map(item => { return item.preco_mais_baixo }), // Setting up the data for the dataset
                    },
                    {
                        label: "Preço Fechamento", // Setting up the label for the dataset
                        backgroundColor: "rgba(130, 211, 255, 1)", // Setting up the background color for the dataset
                        borderColor: "rgba(130, 211, 255, 1)", // Setting up the border color for the dataset
                        data: acaoSelecionada.historico.slice(0,10).map(item => { return item.preco_fechamento }), // Setting up the data for the dataset
                    },
                ],
            };
    
            setData(dados);

            const dividendos = {
                labels:  acaoSelecionada.dividendos.slice(0,10).map(item => { return item.relacionado }),
                datasets: [
                    {
                        label: "Taxa", // Setting up the label for the dataset
                        backgroundColor: "rgba(59, 61, 217, 1)", // Setting up the background color for the dataset
                        borderColor: "rgba(59, 61, 217, 1)", // Setting up the border color for the dataset
                        data: acaoSelecionada.dividendos.slice(0,10).map(item => { return item.taxa }), // Setting up the data for the dataset
                    }
                ],
            };

            setDataDividendo(dividendos);
    }

    useEffect(() => {
        trocarGraficos();
    }, [acaoSelecionada])

    return (
        <>
            <div className="row mt-3">
                 <Grafico titulo="Histórico de ações" grafico="LineChart" data={data} />
                 <Grafico titulo="Histórico de dividendos" grafico="LineChart" data={dataDividendo} />
            </div>

            <div className="row">
                <Editor
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={analise ? analise : "Escreva aqui sua análise"}
                    onChange={setTexto}
                    disabled={props.readonly ? 1 : 0}
                />
            </div>
        </>
    )
}

export default AnaliseGrafico;