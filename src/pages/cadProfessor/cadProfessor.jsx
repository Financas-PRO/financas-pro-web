// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./cadProfessor.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import tratarErro from "../../util/tratarErro";

export default function CadProfessor() {
  const [professor, setProfessor] = useState({});
  const [tipoDeUsuario, setTipoDeUsuario] = useState([]);

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
      // Enviar requisição para a API
      const res = await api.post("docente", professor);
  
      if (res.status) {
        toast.success("Cadastro realizado com sucesso");
  
        setTimeout(() => {
          return navigate("/professor/gerenciar", { replace: true });
        }, 4000);
      }
    } catch (error) {
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
        <div className="container mt-4 col-md-8 col-9">
          <Title
            icon="bi-person-plus-fill"
            titulo="Docentes"
            subTitulo="Gerenciamento cadastro Docente" />

          <form onSubmit={handleSubmit} className="formProfessor">
            <div className="conteudoProfessor mt-5">
              <div className="row square">
                <div className="col col-md-12 col-12">
                  <i className="bi bi-person icons-cad"></i>
                  <label>Nome</label>
                  <input
                    onChange={handleChange}
                    name="nome"
                    type="text"
                    className="form-control"
                    maxLength="50"
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-clipboard icons-cad"></i>
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
                  <i className="bi bi-file-earmark icons-cad"></i>
                  <label>CPF</label>
                  <input
                    type="text"
                    value={professor.cpf}
                    onChange={handleChange}
                    name="cpf"
                    className="form-control"
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
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-bookmark-check icons-cad"></i>
                  <label>Titulação</label>
                  <input
                    onChange={handleChange}
                    name="titulacao"
                    type="text"
                    className="form-control"
                    maxLength="20"
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-telephone-plus icons-cad"></i>
                  <label>Telefone</label>
                  <input
                    type="text"
                    value={professor.telefone}
                    onChange={handleChange}
                    name="telefone"
                    className="form-control"
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-person icons-cad"></i>
                  <label>Usuario</label>
                  <input
                    onChange={handleChange}
                    name="username"
                    type="text"
                    className="form-control"
                    maxLength="30"
                  />
                </div>
                <div className="col col-md-6 col-12">
                  <i className="bi bi-lock-fill icons-cad"></i>
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
                    <i className="bi bi-person icons-cad"></i>
                    Tipo
                  </label>
                  <select

                    onChange={handleChange}
                    name="id_tipoDeUsuario"
                    className="form-control"
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
