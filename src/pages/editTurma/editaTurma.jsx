// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./editaTurma.css";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditaTurma() {

  const [turmas, setTurmas] = useState({
    ano: "",
    semestre:"",
    id_curso: "",
    turma: ""
  });
    let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {

        api.get(`turma/${id}`).then((res) => {

          setTurmas({
                ano: res.data.data.ano, 
                semestre: res.data.data.semestre,
                id_curso: res.data.data.curso.id,
                turma: res.data.data.turma,
                
                
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
          console.log(error)
          let resposta = error.response.data.error;

          var erros = "";

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index] + "\n";
            
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
      {/*<Navbar />*/}

      <div className="container mt-4">
        <ToastContainer className="toast-top-right" />

        <div className="row">
          <div className="col col-md-1 col-12">
            <i class="bi bi-clipboard2 icon-titulo"></i>
          </div>
          <div className="col col-md-5">
            <h2 className="margin-cadastrar-titulo titulo">Editar</h2>
            <span className="subtitulo">Gerenciamento para Editar Turma</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="conteudoTurma mt-5">
            <div className="row square">
              <div className="col col-md-6 col-12">
                <i className="bi bi-person-add"></i>
                <label>Ano</label>
                <input
                  onChange={handleChange}
                  name="ano"
                  type="text"
                  className="form-control"
                  maxLength= "4"
                  value={turmas.ano}
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
              <div className="col col-md-6 col-12">
                <label>
                  <i className="bi bi-person icons-cad"></i>
                  Curso
                </label>
                <select
                  onChange={handleChange}
                  name="id_curso"
                  className="form-control"
                  value={turmas.id_curso}
                >
                  <option value="">Selecione...</option>
                  <option value="1">Sistema de Informação</option>
                  <option value="2">Administração</option>
                  <option value="3">Ciências Contábeis</option>
                </select>
              </div>
              <div className="col col-md-6 col-12">
                <i className="bi bi-person-add"></i>
                <label>Turma</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="turma"
                  className="form-control"
                  maxLength="1"
                  value={turmas.turma}
                />
              </div>
            </div>
          </div>
          <div className="row button-style mt-5">
            <div className="col col-md-8 col-12 buttons">
              <button className="btn-salvar">Salvar</button>
              <Link to="/turma/gerenciar" className="btn-cancelar">Cancelar</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

