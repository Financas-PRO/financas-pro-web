// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import api from "../../services/api";
import "./gerTurma.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import tratarErro from "../../util/tratarErro";

export default function GerTurma() {
  const [turmas, setTurmas] = useState({});

  const [busca, setBusca] = useState([]);

  let navigate = useNavigate();

  {
    /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE TURMA QUE ESTÃO ATIVOS */
  }
  useEffect(() => {
    api.get(`turma`).then((res) => {
      setTurmas(res.data.data);
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
      turmas.filter(
        (f) =>
          f.descricao.toLowerCase().includes(buscando) ||
          f.ano.toString().includes(buscando) ||
          f.semestre.toString().includes(buscando)
      )
    );
  };
  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  {
    /*FUNÇÃO INATIVAR TURMA */
  }
  const deletarTurma = async (e, id) => {
    e.preventDefault();

    try {
      const response = await api.delete(`turma/${id}`);

      if (response.status === 200) {
        const updatedTurmas = turmas.map((turma) => {
          if (turma.id === id) {
            // Inverte o status da turma (se estava ativo, torna inativo e vice-versa)
            turma.ativo = turma.ativo === 1 ? 0 : 1;
          }
          return turma;
        });

        setTurmas(updatedTurmas);

        toast.success(
          `Turma ${
            turmas.find((t) => t.id === id).ativo === 1
              ? "ativada"
              : "inativada"
          } com sucesso`
        );

        setTimeout(() => {
          return navigate("/turma/gerenciar", { replace: true });
        }, 1000);
      }
    } catch (error) {
      let erros = tratarErro(error.response.data.error);

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
    }
  };

  {
    /*-----------------------------------------------------------------------------------------------*/
  }

  {
    /*FUNÇÃO DE MAPEAMENTO PARA LISTAR AS INFORMAÇÕES EM SEUS DEVIDOS CAMPO DA TABELA  */
  }
  var turmaDetalhe = "";

  turmaDetalhe = busca.map((item, index) => {
    const statusClass = item.ativo === 1 ? "ativo" : "inativo";
    const statusText = item.ativo === 1 ? "Ativo" : "Inativo";

    return (
      <tr key={index}>
        <td>{item.descricao}</td>
        <td className="text-center">{item.ano}</td>
        <td className="text-center">{item.semestre}</td>
        <td>
          <span className={`status ${statusClass}`}>{statusText}</span>
        </td>
        <td className="text-center">
          <Link
            to={`/importa/${item.id}`}
            className="btn btn-primary"
            style={{ width: "auto", borderRadius: "7px" }}
          >
            <i className="bi bi-arrow-bar-up"></i>
          </Link>
        </td>
        <td className="text-center">
          <Link
            to={`/turma/${item.id}/editar`}
            className="btn btn-warning"
            style={{ width: "auto", borderRadius: "7px" }}
          >
            <i className="bi bi-pencil-square"></i>
          </Link>
        </td>
        <td className="text-center">
          <button
            type="button"
            onClick={(e) => deletarTurma(e, item.id)}
            className="btn btn-danger"
          >
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
      <div className="row-page">
        <Header />

        <div className="container mt-4 col-md-8 col-8 ">
          <ToastContainer className="toast-top-right" />

          <Title
            icon="bi-book-fill"
            titulo="Gerenciamento"
            subTitulo="Gerenciamento das Turma cadastradas"
          />

          <div className="row">
            <div className="col col-md-8 col-12 mt-5">
              <Link to="/turma/cadastrar" className="btn-add">
                <i className="bi bi-person-plus-fill"></i>ADICIONAR
              </Link>
            </div>

            <div className="col col-md-4 col-12 mt-5">
              <input
                type="text"
                className="form-control"
                onChange={Filter}
                placeholder="Buscar Turma.."
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
                        <th>DESCRIÇÃO</th>
                        <th className="text-center">ANO</th>
                        <th className="text-center">SEMESTRE</th>
                        <th>STATUS</th>
                        <th className="text-center">IMPORTAR</th>
                        <th className="text-center">EDITAR</th>
                        <th className="text-center">INATIVAR</th>
                      </tr>
                    </thead>
                    <tbody>{turmaDetalhe}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
