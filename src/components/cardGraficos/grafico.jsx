import "./grafico.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Chart } from "react-google-charts";

export default function Grafico(props) {

    const options = {
        //title: "Gráfico de Pizza",
        sliceVisibilityThreshold: 0.2,
    };
    
    return (
        <div className="col col-md-6 col-12 mb-3">
            <div className="card-simuladores">
                <div className="titulo-graficos"><i className="bi bi-bar-chart-line"></i>Gráficos</div>
                <div className="card-conteudoGrafico mt-3">
                    <Chart
                        chartType={props.grafico}
                        data={props.data}
                        options={options}
                        width={"100%"}
                        height={"300px"}
                    />
                </div>

            </div>
        </div>

    );
}