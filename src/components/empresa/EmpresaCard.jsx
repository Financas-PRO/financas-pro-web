import React from "react";

const EmpresaCard = (props) => {
    return (
        <div className="col-md-6 col-12 row mb-3 align-items-center justify-content-center py-3 rounded bg-light    ">
            <div className="col-2">
                <img src={props.imgurl} className="img-fluid"/>
            </div>

            <div className="col-5 flex-wrap">
                <div className="fw-bold mb-1">{props.stock}</div>
                <div className="">{props.nome}</div>
            </div>

            <button className="btn btn-primary col-1 p-2 rounded">
                +
            </button>
        </div>
    );
};

export default EmpresaCard;