import React, {useState} from "react";
import "./cadTurma.css";
import User from "../../assets/image/user.png";
import Nome from "../../assets/image/nome.png";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function cadTurma() {

  const [turmas, setTurmas] = useState({});

  async function handleSubmit(e) {

    e.preventDefault();

    
    try {

        api.post('turma', turmas).then(async (res) => {

                
          toast.success("Cadastro realizado com sucesso !")

            }).catch(function (error) {

              let resposta = error.response.data.errors;

                    var erros = "";

                    Object.keys(resposta).forEach(function(index){

                        erros += resposta[index]

                    });
                    toast.error(`Erro ao cadastrar!\n ${erros}`,
                    {position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",})
                
                
            });


    } catch (err) {

        console.log(turmas);
    }

}
  
  function handleChange(e) {
    const nome = e.target.name;
    const valor = (e.target.value).trim();
    setTurmas({ ...turmas, [nome]: valor });
    
    console.log(turmas);  
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">

      <ToastContainer
         
         className="toast-top-right"
       />

        <div className="imgText">
          <img src={User} className="img" alt="Usuario" />
          <h2>Cadastro Turma</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="conteudoTurma mt-5">
            <div className="row square">
              <div className="col col-md-6 col-12">
                <img src={Nome} alt="Nome" />
                <label>Ano</label>
                <input onChange={handleChange} name="ano" type="text" className="form-control" />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Nome} alt="Nome" />
                <label>Semestre</label>
                <input onChange={handleChange} name="semestre" type="text" className="form-control" />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Nome} alt="Nome" />
                <label>Curso</label>
                <input onChange={handleChange} name="curso" type="text" className="form-control" />
              </div>
              <div className="col col-md-6 col-12">
                <img src={Nome} alt="Nome" />
                <label>Turma</label>
                <input onChange={handleChange} type="text" name="turma" className="form-control" />
              </div>
            </div>
            <div className="col col-md-12 col-12 buttonSalvar">
              <button className="btn-salvar mb-3">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
