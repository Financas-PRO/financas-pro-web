import React from "react";
import "./video.css";

const Video = props => {
    return (
        
            <button className="card-video rounded-3" onClick={props.onClick}>
                <div className="card-img" style={{backgroundImage: `url("https://img.youtube.com/vi/${props.codigo}/maxresdefault.jpg")`}}></div>
                <div className="card-conteudo mt-3">
                    <span className="conteudo-titulo">{props.titulo}</span>
                    <div className="button-assita mt-3">
                        <span className="btn-assistir">CLIQUE PARA ASSISTIR</span>
                    </div>
                </div>
            </button>
        
    )
}

export default Video;