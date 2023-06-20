import React, { useState, useEffect } from "react";
import "./editarProfessor.css";
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
import { useNavigate, useParams } from "react-router-dom";


export default function EditarProfessor() {
  const [professor, setProfessor] = useState({ nome: "", cpf: "",
   rg: "", titulacao: "", telefone: "",
    user:{email: "", username: "", id_tipoDeUsuario: ""}});

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    api.get(`docente/${id}`).then((res) => {
      //console.log(res);
      console.log(res.data.data);
      setProfessor({nome: res.data.data.nome, cpf: res.data.data.cpf,
      rg: res.data.data.rg, titulacao: res.data.data.titulacao,
       telefone: res.data.data.telefone,
       user:{email: res.data.data.user.email, username: res.data.data.user.username,
         id_tipoDeUsuario: res.data.data.user.id_tipoDeUsuario}});
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      api
        .put(`docente/${id}`, professor)
        .then(async (res) => {
          if (res.status) {
            toast.success("Docente alterado com sucesso !");

            setTimeout(() => {
              return navigate("/professor/gerenciar", { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          let resposta = error.response.data.errors;

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
      console.log(professor);
    }
  }

  const formatCPF = (cpf) => {
    const cleanedCPF = cpf.replace(/\D/g, "");

    let maskedCPF = "";

    if (cleanedCPF.length > 0) {
      maskedCPF += cleanedCPF.slice(0, 3);
    }
    if (cleanedCPF.length > 3) {
      maskedCPF += "." + cleanedCPF.slice(3, 6);
    }
    if (cleanedCPF.length > 6) {
      maskedCPF += "." + cleanedCPF.slice(6, 9);
    }
    if (cleanedCPF.length > 9) {
      maskedCPF += "-" + cleanedCPF.slice(9, 11);
    }

    return maskedCPF;
  };

  const formatTelefone = (telefone) => {
    const cleanedTelefoen = telefone.replace(/\D/g, "");

    let maskedTelefone = "";

    if (cleanedTelefoen.length > 0) {
      maskedTelefone += "(" + cleanedTelefoen.slice(0, 2);
    }
    if (cleanedTelefoen.length > 2) {
      maskedTelefone += ")" + cleanedTelefoen.slice(2, 7);
    }
    if (cleanedTelefoen.length > 7) {
      maskedTelefone += "-" + cleanedTelefoen.slice(7, 11);
    }

    return maskedTelefone;
  };

  function handleChange(e) {
    const { name, value } = e.target;
    const valor =
      name === "cpf"
        ? formatCPF(value)
        : name === "telefone"
        ? formatTelefone(value)
        : value.trim();

    setProfessor({ ...professor, [name]: valor });

    console.log(professor);
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <ToastContainer className="toast-top-right" />

        <div className="imgText">
          <img src={User} className="img" alt="Usuario" />
          <h2>Editar Professor</h2>
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
                  maxLength="80"
                  value={professor.nome}
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
                  value={professor.rg}
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Cpf} alt="CPF" />
                <label>CPF</label>
                <input
                  onChange={handleChange}
                  name="cpf"
                  type="text"
                  className="form-control"
                  value={professor.cpf}
                />
              </div>
              <div className="col col-md-12 col-12">
                <img src={Email} alt="Email" />
                <label>E-mail</label>
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  maxLength="50"
                  className="form-control"
                 value={professor.user.email}
                  
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
                  value={professor.titulacao}
                />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Telefone} alt="Telefone" />
                <label>Telefone</label>
                <input
                  onChange={handleChange}
                  name="telefone"
                  type="text"
                  className="form-control"
                  value={professor.telefone}
                />
              </div>
              <div className="col col-md-6 col-12 ">
                <img src={Nome} alt="Usuario" />
                <label>Usuario</label>
                <input
                  onChange={handleChange}
                  name="username"
                  type="text"
                  className="form-control"
                  maxLength="50"
                  value={professor.user.username}
                />
              </div>
              <div className="col col-md-6 col-12 hide">
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
                  value={professor.user.id_tipoDeUsuario}
                >
                  <option value="">Selecione...</option>
                  <option value="1">Professor</option>
                  <option value="2">Coordenador</option>
                </select>
              </div>
            </div>
            <div className="col col-md-12 col-12 buttonSalvar">
              <button className="btn-salvar mb-3">Alterar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}