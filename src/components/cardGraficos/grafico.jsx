import "./grafico.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Chart from "chart.js/auto"; // Importing the Chart.js library
import { Line } from 'react-chartjs-2';

export default function Grafico(props) {


    return (
        <div className="col col-md-6 col-12 mb-3">
            <div className="card-simuladores">
                <div className="titulo-graficos"><i className="bi bi-bar-chart-line"></i>{props.titulo}</div>
                <div className="card-conteudoGrafico mt-3">
                        <Line data={props.data} />
                </div>
            </div>
        </div>

    );
}