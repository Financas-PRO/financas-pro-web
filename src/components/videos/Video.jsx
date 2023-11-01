import React from "react";
import "./video.css";

const Video = props => {
    return (
        <div className="col col-md-3">
            <div className="card-video">
                <div className="card-img"></div>
                <div className="card-conteudo mt-3">
                    <span className="conteudo-titulo">{props.titulo}</span>
                    <span>{props.descricao}</span>
                </div>
                <div className="button-assita mt-3">
                    <button onClick={props.onClick} className="btn-assitir">CLIQUE AQUI</button>
                </div>
            </div>
        </div>
    )
}

export default Video;