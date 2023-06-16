import React, { useState } from "react";
import "./cadProfessor.css";
import User from "../../assets/image/user.png";
import Nome from "../../assets/image/nome.png";
import Cpf from "../../assets/image/cpf.png";
import Email from "../../assets/image/email.png";
import Senha from "../../assets/image/lock.png";
import Telefone from "../../assets/image/telefone.png";
import Titulacao from "../../assets/image/titulacao.png";
import Rg from "../../assets/image/Rg.png";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

export default function CadProfessor() {
  const [professor, setProfessor] = useState({});

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api
        .post("docente", professor)
        .then(async (res) => {
          if (res.status) {
            toast.success("Cadastro realizado com sucesso!");

            setTimeout (() => {
              return navigate("/professor/gerenciar", { replace: true });
            }, 4000)
            
          }
        })
        .catch(function (error) {
          let resposta = error.response.data.errors;

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
      console.log(professor);
    }
  }

  function handleChange(e) {
    const nome = e.target.name;
    const valor = e.target.value.trim();
    setProfessor({ ...professor, [nome]: valor });

    console.log(professor);
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <ToastContainer className="toast-top-right" />

        <div className="imgText">
          <img src={User} className="img" alt="Usuario" />
          <h2>Cadastro Professor</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="conteudoProfessor mt-5">
            <div className="row square">
              <div className="col col-md-12 col-12">
                <img src={Nome} alt="Nome" />
                <label>Nome</label>
                <input
                  onChange={handleChange}
                  name="nome"
                  type="text"
                  className="form-control"
                  maxLength="150"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Rg} alt="RG" />
                <label>RG</label>
                <input
                  onChange={handleChange}
                  name="rg"
                  type="text"
                  className="form-control"
                  maxLength="9"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Cpf} alt="CPF" />
                <label>CPF</label>
                <InputMask mask="999.999.999-99" 
                  onChange={handleChange}
                  name="cpf"
                  className="form-control"
                />
              </div>
              <div className="col col-md-12 col-12">
                <img src={Email} alt="Email" />
                <label>E-mail</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  className="form-control"
                  maxLength="50"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Titulacao} alt="Titulação" />
                <label>Titulação</label>
                <input
                  onChange={handleChange}
                  name="titulacao"
                  type="text"
                  className="form-control"
                  maxLength="50"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Telefone} alt="Telefone" />
                <label>Telefone</label>
                <InputMask mask="(99)99999-9999" 
                  onChange={handleChange}
                  name="telefone"
                  className="form-control"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Nome} alt="Usuario" />
                <label>Usuario</label>
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="form-control"
                  maxLength="50"
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Senha} alt="Senha" />
                <label>Senha</label>
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  className="form-control"
                  maxLength="20"
                />
              </div>
              <div className="col col-md-12 col-12">
                <label>
                  <img src={Nome} alt="Nome" />
                  Tipo
                </label>
                <select
                  onChange={handleChange}
                  name="id_tipoDeUsuario"
                  className="form-control"
                >
                  <option value="">Selecione...</option>
                  <option value="1">Professor</option>
                  <option value="2">Coordenador</option>
                </select>
              </div>
            </div>
            <div className="col col-md-12 col-12 buttonSalvar">
              <button className="btn-salvar mb-3">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
