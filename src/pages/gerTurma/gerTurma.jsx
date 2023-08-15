import React, {useState, useEffect} from "react";
import api from "../../services/api";
import "./gerTurma.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GerTurma (){

    const [turmas, setTurmas] = useState({});

    const [busca, setBusca] = useState([]);

    let navigate = useNavigate();

    {
        /*FUNÇÃO PARA LISTAR TODOS DADOS CADASTRADO DE TURMA QUE ESTÃO ATIVOS */
      }
      useEffect(() => {
        api.get(`turma`).then((res) => {
          //console.log(res);
          console.log(res.data.data);
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
              f.ano.includes(buscando) ||
              f.semestre.includes(buscando) ||
              f.curso.includes(buscando) ||
              f.turma.toLowerCase().includes(buscando)
          )
        );
      };
      {
        /*-----------------------------------------------------------------------------------------------*/
      }

      {
        /*FUNÇÃO INATIVAR TURMA */
      }
        const deletarTurma = (e, id) => {
    
          e.preventDefault();
    
          const NoClick = e.currentTarget;
          NoClick.innerText = "Inativando...";
    
          try {
            api
              .delete(`turma/${id}`)
              .then(async (res) => {
                if (res.status) {
                  toast.success("Turma inativo com sucesso");
                  NoClick.closest("tr").remove();
                  setTimeout(() => {
                    return navigate("/turma/gerenciar", { replace: true });
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
            console.log(turmas);
          }
        }
        {
          /*-----------------------------------------------------------------------------------------------*/
        }

        {
            /*FUNÇÃO DE MAPEAMENTO PARA LISTAR AS INFORMAÇÕES EM SEUS DEVIDOS CAMPO DA TABELA  */
          }
          var turmaDetalhe = "";
        
          turmaDetalhe = busca.map((item, index) => {

            return (
              <tr key={index}>
                <td><strong>{item.id}</strong></td>
                <td>{item.ano}</td>
                <td>{item.semestre}</td>
                <td>{item.id_curso}</td>
                <td>{item.turma}</td>
                <td>
                  <Link to={`/turma/${item.id}/editar`} className="btn btn-warning" >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                </td>
                <td>
                  <button type="button" onClick={(e) => deletarTurma(e, item.id)} className="btn btn-danger">
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
                  <h2>Gerenciamento de Turmas</h2>
                </div>
                <Link to="/turma/cadastrar" className="btn btn-primary">
                  ADICIONAR
                </Link>
              </div>
              <div className="col-md-3 ">
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
                        <th>#</th>
                        <th>ANO</th>
                        <th>SEMESTRE</th>
                        <th>CURSO</th>
                        <th>TURMA</th>
                        <th>EDITAR</th>
                        <th>INATIVAR</th>
                      </tr>
                    </thead>
                    <tbody>{turmaDetalhe}</tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
}