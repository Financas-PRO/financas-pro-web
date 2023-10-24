import React, { useEffect, useState } from "react";
import "./cadSimulador.css";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import Select from "react-select";

export default function CadSimulador02() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [alunosSelecionadosAtual, setAlunosSelecionadosAtual] = useState([]);

  useEffect(() => {
    api.get(`relacaoTurma/${id}`).then((res) => {
      setAlunosSelecionados(res.data.data);
    });
  }, [id]);

  async function handleSubmit(e) {
    const selectedAlunoIds = alunosSelecionadosAtual.map(
      (aluno) => aluno.aluno.id
    );

    e.preventDefault();

    try {
      const requestBody = {
        descricao: descricao,
        alunos: selectedAlunoIds,
      };

      api
        .post(`grupo/${id}`, requestBody)
        .then(async (res) => {
          if (res.status) {
            toast.success("Grupo criado com sucesso");

            setTimeout(() => {
              return navigate(`/empresa/${id}`, { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          console.log(error);
          let resposta = error.response.data.error;

          var erros = "";

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index] + "\n";
          });
          toast.error(`Erro ao criar Grupo!\n ${erros}`, {
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
      console.log(descricao);
    }
  }

  function handleChange(e) {
    const valor = e.target.value;
    setDescricao(valor);
  }

  function handleChangeSelect(selectedOptions) {
    const selectedIds = selectedOptions.map((option) => option.value);

    const novosAlunosSelecionadosAtual = alunosSelecionados.filter((aluno) =>
      selectedIds.includes(aluno.aluno.id)
    );

    setAlunosSelecionadosAtual(novosAlunosSelecionadosAtual);
  }

  return (
    <div className="row-page">
      <div className="col col-md-2 col-2" id="sidebar">
        <Header />
      </div>

      <div className="container mt-4 col-md-8 col-9">
        <Title
          icon="bi-bezier2"
          titulo="Simulador"
          subTitulo="Gerenciamento cadastro de simuladores"
        />

        <form onSubmit={handleSubmit} className="formSimulador">
          <div className="conteudoSimulador mt-5">
            <div className="row square">
              <div className="col col-md-12 col-12">
                <i class="bi bi-bookmark-fill"></i>
                <label className="mb-2">Titulo da Simulação</label>
                <input
                  name="descricao"
                  type="text"
                  placeholder="Insira aqui o titulo da simulação"
                  className="form-control"
                  maxLength={22}
                  onChange={handleChange}
                />
              </div>
              <div className="col col-md-12 col-12 mb-4">
                <i class="bi bi-person-fill"></i>
                <label className="mb-2">Participantes: </label>
                <Select
                  isMulti
                  name="participantes"
                  placeholder="Selecionar Alunos"
                  options={alunosSelecionados
                    .filter(
                      (aluno) =>
                        !alunosSelecionadosAtual.some(
                          (selected) => selected.aluno.id === aluno.aluno.id
                        )
                    )
                    .map((aluno) => ({
                      value: aluno.aluno.id,
                      label: aluno.aluno.nome,
                    }))}
                  onChange={handleChangeSelect}
                  value={alunosSelecionadosAtual.map((aluno) => ({
                    value: aluno.aluno.id,
                    label: aluno.aluno.nome,
                  }))}
                />
              </div>
            </div>
          </div>
          <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
            <ButtonSalvar nome="Salvar" />
            <ButtonCancelar link={`simuladores/${id}`} nome="Cancelar" />
          </div>
        </form>
      </div>
    </div>
  );
}
