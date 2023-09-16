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

    const[simulador, setSimulador] = useState([]);
    

    useEffect(() => {
        console.log(setSimulador);
        api.get(`relacaoTurma/${id}`).then((res) => {
            setSimulador(res.data.data);
        });
    },[]);

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          api
            .post(`grupo/${id}`, simulador)
            .then(async (res) => {
              if (res.status) {
                toast.success("Cadastro realizado com sucesso");
    
                setTimeout(() => {
                  return navigate("/simulador", { replace: true });
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
          console.log(simulador);
        }
      }

    function handleChange(e) {
        const nome = e.target.name;
        const valor = e.target.value.trim();
        setSimulador({ ...simulador, [nome]: valor });
    
        console.log(simulador);
    }


    

//   importacao = simulador.map((item, index) => {
//     return (
//       <tr key={index}>
//         <td>
//           <strong>{item.id}</strong>
//         </td>
//         <td>{item.aluno.nome}</td>
//         <td>{item.aluno.ra}</td>
//         <td>{item.aluno.termo}</td>
//         <td>{item.aluno.user.email}</td>
//         <td>{item.aluno.curso.curso}</td>
//         <td>{item.aluno.id_disciplina}</td>
//       </tr>
//     )


//   });


    // const alunosDisponiveis = [
    //     { id: 1, nome: "Leonardo Mariano" },
    //     { id: 2, nome: "João Pontes" },
    //     { id: 3, nome: "João Garcia" },
    //     { id: 4, nome: "Felipe Silveira" },
    //     { id: 5, nome: "Gabriel Lanza" },
    //     { id: 6, nome: "Lucas Gere" },
    //     { id: 7, nome: "Leonardo Mariano" },
    //     { id: 8, nome: "João Pontes" },
    //     { id: 9, nome: "João Garcia" },
    //     { id: 10, nome: "Felipe Silveira" },
    //     { id: 11, nome: "Gabriel Lanza" },
    //     { id: 12, nome: "Lucas Gere" },
    //     // ... outros alunos
    // ];

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
                                    type="text"
                                    placeholder="Insira aqui o titulo da simulação"
                                    className="form-control"
                                />
                            </div>
                            <div className="col col-12">
                                <label className="mb-2">Participantes: </label>
                                <div>
                                    <label ></label>
                                </div>
                                <div className="alunos-checkboxes d-flex">
                                    {simulador.map(item => (
                                        <div key={item.id} className="form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                // id={`simulador-${item.id}`}
                                                value={simulador.id}
                                                onChange={handleChange}
                                                
                                            />
                                            <label className="form-check-label" htmlFor={`item-${item.id}`}>
                                                {item.aluno.nome}
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