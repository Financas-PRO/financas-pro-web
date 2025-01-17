import React from "react";
import "./turma.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export default function Turmas(props) {

    return (

        <div className="col col-md-12 col-12 mb-4">
            <div className="card-turma">
                <Link className="titulo-turma row justify-content-center align-items-center" to={`/simuladores/${props.id}`}>
                    <div className="col col-md-10 col-12">
                        <h5 style={{margin: 0}} className="">
                            <i className="bi bi-book mx-3"></i>
                            {props.turma}
                        </h5>
                        <h6 className="mx-3">Docente: {props.docente}</h6>
                    </div>
                    <h6 className="col col-md-2 col-12 d-flex acesso">
                        <div>
                            <h5>Acesse</h5>
                            <i className="animacao bi bi-arrow-right"></i>
                        </div>
                    </h6>
                </Link>
            </div>
        </div>

    )

}