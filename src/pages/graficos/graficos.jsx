import React from "react";
import "./graficos.css";
import api from "../../services/api";
import Header from "../../components/navbar/header.jsx";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import Grafico from "../../components/cardGraficos/grafico";



export default function Graficos() {

    const dataPizza = [
        ["Pizza", "Popularity"],
        ["Pepperoni", 33],
        ["Hawaiian", 26],
        ["Mushroom", 22],
        ["Sausage", 10],
        ["Anchovies", 9],
    ];


    const dataColumn = [
        ["Element", "Density", { role: "style" }],
        ["Copper", 8.94, "#b87333"],
        ["Silver", 10.49, "silver"],
        ["Gold", 19.3, "gold"],
        ["Platinum", 21.45, "color: #e5e4e2"],
    ];

    const dataColumnBar = [
        [
            "Element",
            "Density",
            { role: "style" },
            {
                sourceColumn: 0,
                role: "annotation",
                type: "string",
                calc: "stringify",
            },
        ],
        ["Copper", 8.94, "#b87333", null],
        ["Silver", 10.49, "silver", null],
        ["Gold", 19.3, "gold", null],
        ["Platinum", 21.45, "color: #e5e4e2", null],
    ];

    const dataLine = [
        ["x", "dogs", "cats"],
        [0, 0, 0],
        [1, 10, 5],
        [2, 23, 15],
        [3, 17, 9],
        [4, 18, 10],
        [5, 9, 5],
        [6, 11, 3],
        [7, 27, 19],
    ];


    return (
        <div className="row-page">

            <div className="col col-md-2 col-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8 col-9">

                <Title
                    icon="bi-bar-chart-fill"
                    titulo="Gráficos"
                    subTitulo="Análise os Gráficos apresentados" />

                <div className="row mt-5">
                    <Grafico grafico="PieChart" data={dataPizza} />
                    <Grafico grafico="ColumnChart" data={dataColumn} />
                    <Grafico grafico="BarChart" data={dataColumnBar} />
                    <Grafico grafico="LineChart" data={dataLine} />
                </div>

                <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                    <ButtonSalvar nome="Salvar" />
                    <ButtonCancelar nome="Cancelar" />
                    {/* link="" = tem que voltar para o demostrativo, arrumar isso depois */}
                </div>
            </div>
        </div>
    )
}