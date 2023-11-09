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
import { useSelector } from "react-redux";
import tratarErro from "../../util/tratarErro";

export default function CadSimulador() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [descricao, setDescricao] = useState("");
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [alunosSelecionadosAtual, setAlunosSelecionadosAtual] = useState([]);
  const [usuarioFixo, setUsuarioFixo] = useState(null);
  // precisei usar o redux para retornar as informações do usuario logado
  const user = useSelector(state => state.userReducer);

  console.log("tela cadSimulador:",user);

  useEffect(() => {
    api.get(`relacaoTurma/${id}`).then((res) => {
      setAlunosSelecionados(res.data.data);
      if (user) {
        const IdUsuarioLogado = user.id;
        // aqui esta fazendo uma verificação dos id do usuario de todos os alunos que estao na lista do select
        // se meu id do usuario logado for identico ao id do usuario do aluno na list ele vai returnar true
        const VerificarIdUsuario = res.data.data.filter((elemento) => {
          const aluno = elemento.aluno;
          if (aluno && aluno.user && aluno.user.id === IdUsuarioLogado) {
            return true;
          }
          return false;
        });
        setAlunosSelecionadosAtual(VerificarIdUsuario);
        //aqui vai definir o usuário fixo com base no usuário logado que esta returnando do meu user redux
        const usuarioFixoEncontrado = VerificarIdUsuario.find(
          (elemento) => elemento.aluno.user && elemento.aluno.user.id === IdUsuarioLogado
        );
        setUsuarioFixo(usuarioFixoEncontrado);
      }
    });
  }, [id, user]);


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
            toast.success("Grupo criado com sucesso!");

            setTimeout(() => {
              return navigate(`/empresa/${res.data.data.id}`, { replace: true });
            }, 4000);
          }
        })
        .catch(function (error) {
          
          let erros = tratarErro(error.response.data.error);

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
    // aqui esta fazendo uma verificação se usuario logado esta fixo no meu select se nao estiver
    // ela faz outra verificação para deixa como selecionado e nao permiter remover
    const usuarioFixoSelecionado = novosAlunosSelecionadosAtual.some(
      (aluno) => aluno.aluno.id === usuarioFixo.aluno.id
    );
    if (!usuarioFixoSelecionado) {
      novosAlunosSelecionadosAtual.push(usuarioFixo);
    }
  
    setAlunosSelecionadosAtual(novosAlunosSelecionadosAtual);
  }
  


  return (
    <div className="row-page">
        <Header />
      <div className="container mt-4 col-md-8 col-9">
        <ToastContainer/>
        <Title
          icon="bi-bezier2"
          titulo="Simulador"
          subTitulo="Gerenciamento cadastro de simuladores"
        />

        <form onSubmit={handleSubmit} className="formSimulador">
          <div className="conteudoSimulador mt-5">
            <div className="row square">
              <div className="col col-md-12 col-12">
                <i className="bi bi-bookmark-fill"></i>
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
                <i className="bi bi-person-fill"></i>
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
