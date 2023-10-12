import React from "react";
import './EmpresaCard.css';

export default function EmpresaCard(props) {
    return (
        <div className="col col-md-4 mb-3">
            <div className="card-empresa">
                <img src={props.imgurl} className="img-fluid" />
                <div className="col col-md-5 col-12">
                    <h5 className="empresa">{props.stock}</h5>
                    <p className="nomeEmp">{props.nome}</p>
                </div>
                <div className="footer-empresa">
                    <button className="btn-empresa">
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};