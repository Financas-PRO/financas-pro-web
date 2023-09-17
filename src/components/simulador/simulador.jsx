// Desenvolvedores: João Pontes e Leonardo Mariano

import "./simulador.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


export default function Simulador(props) {

    return (

        <div className="col col-md-3 mb-3">
            <div className="card-simuladores">
                <div className="titulo-simuladores">{props.titulo}</div>
                <div className="card-conteudo mt-3">
                    <span className="etapa">{props.etapa}</span>
                    <span className="nomes">{props.nomes}</span>
                </div>
                <Link className="link">
                    Clique aqui para retornar <i class="bi bi-arrow-right"></i>
                </Link>
            </div>
        </div>
    )
}