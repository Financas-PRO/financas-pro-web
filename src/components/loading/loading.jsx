import React from "react";
import "./loading.css";

const Loading = () => {
    return (
        <div className="align-items-center d-flex col-12 flex-column">
            <span className="loader row mb-2"></span>
            <h5 className="row">Buscando os dados</h5>
        </div>
    )
}

export default Loading;