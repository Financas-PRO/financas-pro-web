// Desenvolvedores: João Pontes e Leonardo Mariano

import React, { useState, useEffect } from "react";
import "./importa.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function Importa() {

  const [cardFile, setCardFile] = useState();
  const [alunos, setAlunos] = useState();
  const [busca, setBusca] = useState([]);
  const handleUploadFile = e => setCardFile(e.target.files[0]);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    api.get(`relacaoTurma/${id}`).then((res) => {
      setAlunos(res.data.data);
      setBusca(res.data.data);
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

  // FUNÇÃO PARA LISTAR OS DADOS IMPORTADOS

  var importacao = ""

  importacao = busca.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <strong>{item.id}</strong>
        </td>
        <td>{item.aluno.nome}</td>
        <td>{item.aluno.ra}</td>
        <td>{item.aluno.termo}</td>
        <td>{item.aluno.user.email}</td>
        <td>{item.aluno.curso.curso}</td>
        <td>{item.aluno.id_disciplina}</td>
      </tr>
    )


  });

  return (
    <>

      <div className="row-page">

        <div className="col col-md-2">
          <Header />
        </div>

        <div className="container mt-4 col-md-8 col-12">

          <Title
            icon="bi-clipboard2"
            titulo="Importar Aluno"
            subTitulo="Gerenciamento de importação de Aluno" />

          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <label className="form-label labelImport">Informe o arquivo</label>

              <input
                onChange={handleUploadFile}
                type="file"
                name="arquivo"
                className="form-control mb-3"
                id="formFileLg"
                accept="text/plain"
              />

              <ButtonSalvar nome="importar" />

            </form>

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
                  <tbody>{importacao}</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}