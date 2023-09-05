// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./importa.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";


export default function Importa() {

  const [cardFile, setCardFile] = useState();
  const [alunos, setAlunos] = useState();
  const handleUploadFile = e => setCardFile(e.target.files[0]);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    api.get(`relacaoTurma/${id}`).then((res) => {
      //console.log(res);
      console.log(res.data.data);
      setAlunos(res.data.data);
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("card", cardFile);

    console.log(cardFile);

    try {
      api
        .post(`importarAlunos/${id}`, { txt: cardFile }, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`
          }
        })
        .then(async (res) => {
          if (res.status) {
            toast.success("Alunos importados com sucesso! Recarregando a página...");

            setTimeout(() => {
              return navigate(0);
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log(error)
          let resposta = error.response.data.error;

          var erros = "";

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index];
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
      console.log(err);
    }
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
              <h2 className="margin-cadastrar-titulo titulo">Importar Aluno</h2>
              <span className="subtitulo">Gerenciamento de importação de Aluno</span>
            </div>
          </div>

          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <label className="form-label labelImport">Informe o arquivo</label>

              <input
                onChange={handleUploadFile}
                type="file"
                name="arquivo"
                className="form-control"
                id="formFileLg"
                accept="text/plain"
              />

              <button className="btn-salvar mt-3">enviar</button>
            </form>

          </div>
        </div>

        <div className="container col-md-8">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>NOME</th>
                    <th>R.A.</th>
                    <th>TERMO</th>
                    <th>E-MAIL</th>
                    <th>CURSO</th>
                    <th>DISCIPLINA</th>
                  </tr>
                </thead>
                {/* <tbody>{alunoDetalhe}</tbody> */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}