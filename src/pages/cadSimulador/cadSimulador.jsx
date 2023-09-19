import React, { useEffect, useState } from "react";
import './cadSimulador.css'
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import Header from "../../components/navbar/header";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";

export default function CadSimulador() {

    let { id } = useParams();
    let navigate = useNavigate();

    const [descricao, setDescricao] = useState("");
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        api.get(`relacaoTurma/${id}`).then((res) => {
            setAlunos(res.data.data);
        });
    }, [id]);

    async function handleSubmit(e) {

        //const criado para amarzenar alunos selecionados
        const selectedAlunos = alunos.filter((aluno) => aluno.checked);
        //const criado para amarzenar id dos alunos
        const alunoIds = selectedAlunos.map((aluno) => aluno.aluno.id);

        e.preventDefault();
    
        try {
            const requestBody = {
                descricao: descricao,
                alunos: alunoIds
            };
          api
            .post(`grupo/${id}`, requestBody)
            .then(async (res) => {
              if (res.status) {
                toast.success("Grupo criado com sucesso");
    
                setTimeout(() => {
                  return navigate("/simuladores", { replace: true });
                }, 4000);
              }
            })
            .catch(function (error) {
              console.log(error)
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

    // Função checkbox selecionado/não selecionado
    function handleCheckboxChange(alunoId) {
        const updatedAlunos = alunos.map((aluno) => {
            if (aluno.id === alunoId) {
                return { ...aluno, checked: !aluno.checked };
            }
            return aluno;
        });

        setAlunos(updatedAlunos);
        console.log("Alunos selecionado", updatedAlunos)
    }


    return (

        <div className="row-page">
            <div className="col col-md-2">
                <Header />
            </div>

            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-bezier2"
                    titulo="Simulador"
                    subTitulo="Gerenciamento cadastro de simuladores" />


                <form onSubmit={handleSubmit} className="formSimulador">
                    <div className="conteudoSimulador mt-5">
                        <div className="row square">
                            <div className="col col-12">
                                <label className="mb-2">Titulo da Simulação</label>
                                <input
                                    name="descricao"
                                    type="text"
                                    placeholder="Insira aqui o titulo da simulação"
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col col-12">
                                <label className="mb-2">Participantes: </label>

                                <div className="alunos-checkboxes d-flex">
                                    {alunos.map((aluno) => (
                                        <div key={aluno.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                value={aluno.id}
                                                checked={aluno.checked || false}
                                                onChange={() => handleCheckboxChange(aluno.id)}
                                            />
                                            <label className="form-check-label" htmlFor={`item-${aluno.id}`}>
                                                {aluno.aluno.nome}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-md-10 col-12 buttons justify-content-end mb-5 mt-4">
                        <ButtonSalvar nome="Salvar" />
                        <ButtonCancelar link="simulador" nome="Cancelar" />
                    </div>
                </form>
            </div>
        </div>

    );
}