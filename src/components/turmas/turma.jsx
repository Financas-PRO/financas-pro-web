import React, { useState } from "react";
import "./turma.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";

export default function Turmas(props) {

    return (

        <div className="col col-md-12 mb-4">
            <div className="card-turma">
                <div className="titulo-turma">{props.turma}</div>
                <Link className="link" to={`/simuladores/${props.id}`}>
                    Clique para ir na turma
                </Link>
            </div>
        </div>

    )

}