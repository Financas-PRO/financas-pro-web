import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./gerProfessor.css";
import Navbar from "../../components/navbar/header.jsx";
import User from "../../assets/image/user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function GerProfessor() {
  
  const [docentes, setDocentes] = useState([]);

  const [busca, setBusca] = useState([]);

  let navigate = useNavigate();

  {
    /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE DOCENTES QUE ESTÃO ATIVOS */
  }
  useEffect(() => {
    api.get(`docente`).then((res) => {
      //console.log(res);
      console.log(res.data.data);
      setDocentes(res.data.data);
      setBusca(res.data.data);
    });
  }, []);
  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  {
    /*FILTRO DE PESQUISA PELO INPUT */
  }
  const Filter = (e) => {
    const buscando = e.target.value.toLowerCase();

    setBusca(
      docentes.filter(
        (f) =>
          f.nome.toLowerCase().includes(buscando) ||
          f.cpf.includes(buscando) ||
          f.titulacao.toLowerCase().includes(buscando)
      )
    );
  };
  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  {
    /*FUNÇÃO INATIVAR DOCENTE */
  }
    const deletarDocente = (e, id) => {

      e.preventDefault();

      const NoClick = e.currentTarget;
      NoClick.innerText = "Inativando...";

      try {
        api
          .delete(`docente/${id}`)
          .then(async (res) => {
            if (res.status) {
              toast.success("Docente inativo com sucesso !");
              NoClick.closest("tr").remove();
              setTimeout(() => {
                return navigate("/professor/gerenciar", { replace: true });
              }, 1000);
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
        console.log(docentes);
      }
    }
    {
      /*-----------------------------------------------------------------------------------------------*/
    }

  {
    /*FUNÇÃO DE MAPEAMENTO PARA LISTAR AS INFORMAÇÕES EM SEUS DEVIDOS CAMPO DA TABELA  */
  }
  var docenteDetalhe = "";

  docenteDetalhe = busca.map((item, index) => {
    const statusClass = item.ativo === 1 ? "ativo" : "inativo";
    const statusText = item.ativo === 1 ? "Ativo" : "Inativo";

    return (
      <tr key={index}>
        <td><strong>{item.id}</strong></td>
        <td>{item.nome}</td>
        <td>{item.titulacao}</td>
        <td>{item.cpf}</td>
        <td>{item.user.email}</td>
        <td>{item.telefone}</td>
        <td>{item.user.username}</td>
        <td>
          <span className={`status ${statusClass}`}>{statusText}</span>
        </td>
        <td>
          <Link to={`/professor/${item.id}/editar`} className="btn btn-warning" >
            <i className="bi bi-pencil-square"></i>
          </Link>
        </td>
        <td>
          <button type="button" onClick={(e) => deletarDocente(e, item.id)} className="btn btn-danger">
            <i className="bi bi-power"></i>
          </button>
        </td>
      </tr>
    );
  });

  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  return (
    <>
      <Navbar />

      <div className="container-fluid">

      <ToastContainer className="toast-top-right" />

        <div className="row justify-content-end">
          <div className="col-md-12">
            <div className="card-header">
              <img src={User} className="img" alt="Usuario" />
              <h2>Gerenciamento de Docentes</h2>
            </div>
            <Link to="/professor/cadastrar" className="btn btn-primary">
              ADICIONAR
            </Link>
          </div>
          <div className="col-md-3 ">
            <input
              type="text"
              className="form-control"
              onChange={Filter}
              placeholder="Buscar Docente.."
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card-body">
              <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NOME</th>
                    <th>TITULAÇÃO</th>
                    <th>CPF</th>
                    <th>EMAIL</th>
                    <th>TELEFONE</th>
                    <th>USUARIO</th>
                    <th>STATUS</th>
                    <th>EDITAR</th>
                    <th>INATIVAR</th>
                  </tr>
                </thead>
                <tbody>{docenteDetalhe}</tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
