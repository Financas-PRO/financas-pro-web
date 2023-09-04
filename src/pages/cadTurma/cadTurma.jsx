// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState } from "react";
import "./cadTurma.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function CadTurma() {

  const [turmas, setTurmas] = useState({});

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api
        .post("turma", turmas)
        .then(async (res) => {
          if (res.status) {
            toast.success("Cadastro realizado com sucesso");

            setTimeout(() => {
              return navigate("/turma/gerenciar", { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          console.log(error)
          let resposta = error.response.data.error;

          var erros = "";

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index] + "\n";

          });
          toast.error(`Erro ao cadastrar!\n ${erros}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { whiteSpace: "pre-line" },
          });
        });

    } catch (err) {
      console.log(turmas);
    }
  }

  function handleChange(e) {
    const nome = e.target.name;
    const valor = e.target.value.trim();
    setTurmas({ ...turmas, [nome]: valor });

    console.log(turmas);
  }

  return (
    <>
      <div className="row-page">
        <div className="col col-md-2">
          <Header />
        </div>
        <div className="container mt-4 col-md-8">
          <ToastContainer className="toast-top-right" />

          <div className="title">
            <div className="col col-md-1 col-12">
              <i className="bi bi-clipboard2 icon-titulo"></i>
            </div>
            <div className="col col-md-5">
              <h2 className="margin-cadastrar-titulo titulo">Turma</h2>
              <span className="subtitulo">Gerenciamento cadastro de Turma</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="formTurma">
            <div className="conteudoTurma mt-5">
              <div className="row square">
                <div className="col col-md-12 col-12 ">
                  <i className="bi bi-person-add"></i>
                  <label>Turma</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="turma"
                    className="form-control"
                    maxLength="1"
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <label>
                    <i className="bi bi-person icons-cad"></i>
                    Semestre
                  </label>
                  <select
                    onChange={handleChange}
                    name="semestre"
                    className="form-control"
                  >
                    <option value="">Selecione...</option>
                    <option value="1">1° Semestre</option>
                    <option value="2">2° Semestre</option>
                  </select>
                </div>
                <div className="col col-md-6 col-12 mb-5">
                  <i className="bi bi-person-add"></i>
                  <label>Ano</label>
                  <input
                    onChange={handleChange}
                    name="ano"
                    type="text"
                    className="form-control"
                    maxLength="4"
                  />
                </div>
              </div>
            </div>
              <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
                <button className="btn-salvar">Salvar</button>
                <Link to="/turma/gerenciar" className="btn-cancelar">Cancelar</Link>
              </div>
          </form>
        </div>
      </div>


    </>
  );
}
