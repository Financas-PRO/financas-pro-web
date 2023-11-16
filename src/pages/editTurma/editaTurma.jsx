// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./editaTurma.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function EditaTurma() {

  const [turmas, setTurmas] = useState({
    ano: "",
    semestre: "",
    id_curso: "",
    descricao: ""
  });
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {

    api.get(`turma/${id}`).then((res) => {
      setTurmas({
        descricao: res.data.data.descricao,
        semestre: res.data.data.semestre,
        ano: res.data.data.ano,
      });
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api
        .put(`turma/${id}`, turmas)
        .then(async (res) => {
          if (res.status) {
            toast.success("Cadastro alterado com sucesso");

            setTimeout(() => {
              return navigate("/turma/gerenciar", { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          let resposta = error.response.data.error;

          var erros = "";

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index];

          });
          toast.error(`Erro ao alterar!\n ${erros}`, {
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
    }
  }

  function handleChange(e) {
    const nome = e.target.name;
    const valor = e.target.value.trim();
    setTurmas({ ...turmas, [nome]: valor });
  }

  return (
    <>
      <div className="row-page">
        <Header />

        <div className="container mt-4 col-md-8">

          <Title
            icon="bi-clipboard2"
            titulo="Editar"
            subTitulo="Gerenciamento para Editar Turma" />

          <form onSubmit={handleSubmit} className="formTurma">
            <div className="conteudoTurma mt-5">
              <div className="row square">
                <div className="col col-md-12 col-12 ">
                  <i className="bi bi-person-add"></i>
                  <label>Turma</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="descricao"
                    className="form-control"
                    defaultValue={turmas.descricao}
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
                    value={turmas.semestre}
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
                    value={turmas.ano}
                  />
                </div>
              </div>
            </div>
            <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
              <ButtonCancelar link="turma/gerenciar" nome="Cancelar" />
              <ButtonSalvar nome="Salvar" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

