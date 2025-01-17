// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./editarProfessor.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import tratarErro from "../../util/tratarErro";

export default function EditaProfessor() {
  const [professor, setProfessor] = useState({
    nome: "",
    cpf: "",
    rg: "",
    titulacao: "",
    telefone: "",

    email: "",
    username: "",
    id_tipoDeUsuario: "",
  });
  const [tipoDeUsuario, setTipoDeUsuario] = useState([]);

  let { id } = useParams();
  let navigate = useNavigate();

  {
    /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE TIPO DE USUARIO QUE ESTÃO ATIVOS */
  }
  useEffect(() => {
    api.get(`tipoDeUsuario`).then((res) => {
      let tipos = res.data.data.filter(item => { return item.id != 3});
      setTipoDeUsuario(tipos);
    });
  }, []);
  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  useEffect(() => {
    api.get(`docente/${id}`).then((res) => {
      setProfessor({
        nome: res.data.data.nome,
        cpf: res.data.data.cpf,
        rg: res.data.data.rg,
        titulacao: res.data.data.titulacao,
        telefone: res.data.data.telefone,
        matricula: res.data.data.matricula,

        email: res.data.data.user.email,
        username: res.data.data.user.username,
        id_tipoDeUsuario: res.data.data.user.tipo_de_usuario.id,
      });
    });
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validaCPF(professor.cpf)) {
      toast.error("CPF inválido", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      api
        .put(`docente/${id}`, professor)
        .then(async (res) => {
          if (res.status) {
            toast.success("Docente alterado com sucesso");

            setTimeout(() => {
              return navigate("/professor/gerenciar", { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          let erros = tratarErro(error.response.data.error);

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
          : value;

    setProfessor({ ...professor, [name]: valor });

  }

  function validaCPF(cpf) {
    var Soma = 0;
    var Resto;
  
    var strCPF = String(cpf).replace(/[^\d]/g, '');
  
    if (strCPF.length !== 11) return false;
  
    if ([
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
    ].indexOf(strCPF) !== -1) return false;
  
    for (var i = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  
    Resto = (Soma * 10) % 11;
  
    if (Resto == 10 || Resto == 11) Resto = 0;
  
    if (Resto !== parseInt(strCPF.substring(9, 10))) return false;
  
    Soma = 0;
  
    for (var i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  
    Resto = (Soma * 10) % 11;
  
    if (Resto == 10 || Resto == 11) Resto = 0;
  
    if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
  
    return true;
  }

  return (
    <>
      <div className="row-page">
        <Header />
        <div className="container mt-4 col-md-8">

          <Title
            icon="bi-person-plus-fill"
            titulo="Editar"
            subTitulo="Gerenciamento para Editar Docente" />


          <form onSubmit={handleSubmit} className="formProfessor">
            <div className="conteudoProfessor mt-3">
              <div className="row square">
                <div className="col col-md-12 col-12">
                  <i className="bi bi-person icons"></i>
                  <label>Nome</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    maxLength="50"
                    name="nome"
                    value={professor.nome}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-clipboard icons"></i>
                  <label>RG</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="rg"
                    className="form-control"
                    maxLength="9"
                    value={professor.rg}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-file-earmark icons"></i>
                  <label>CPF</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="cpf"
                    className="form-control"
                    value={professor.cpf}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-bookmark-check icons"></i>
                  <label>Titulação</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="titulacao"
                    className="form-control"
                    maxLength="20"
                    value={professor.titulacao}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-telephone-plus icons"></i>
                  <label>Telefone</label>
                  <input
                    onChange={handleChange}
                    type="text"
                    name="telefone"
                    className="form-control"
                    maxLength="20"
                    value={professor.telefone}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-envelope icons"></i>
                  <label>E-mail</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    className="form-control"
                    maxLength="50"
                    value={professor.email}
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-pen"></i>
                  <label>Matricula</label>
                  <input
                    onChange={handleChange}
                    name="matricula"
                    type="text"
                    className="form-control"
                    maxLength="50"
                    value={professor.matricula}
                  />
                </div>
                <div className="col col-md-12 col-12">
                  <label>
                    <i className="bi bi-person icons-cad"></i>
                    Tipo
                  </label>
                  <select
                    onChange={handleChange}
                    name="id_tipoDeUsuario"
                    className="form-control"
                    value={professor.id_tipoDeUsuario}
                  >
                    <option value="">Selecione...</option>
                    {tipoDeUsuario.map(item => (
                      <option key={item.id} value={item.id}>
                        {item.papel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
              <ButtonSalvar nome="Salvar" />
              <ButtonCancelar link="professor/gerenciar" nome="Cancelar" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
