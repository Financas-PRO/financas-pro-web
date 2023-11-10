import "./simulador.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


export default function Simulador(props) {

    return (

        <Link className="col-md-4 mb-3" to={props.rota}>
            <div className="card-simuladores">
                <div className="titulo-simuladores"><i className="bi bi-diagram-2"></i> {props.titulo}</div>
                <div className="card-conteudo mt-3">
                    <span className="etapa">Etapa: {props.etapa}</span>
                    <span className="nomes"><i className="bi bi-people-fill"></i>{props.nomes}</span>
                </div>
                <div className="footer-card">
                    <span className="link mt-3 mb-2">
                        Clique para retornar <i className="bi bi-arrow-right"></i>
                    </span>
                </div>
            </div>
        </Link>
    )
}