import React, {useState} from "react";
import "./cadTurma.css";
import User from "../../assets/image/user.png";
import Nome from "../../assets/image/nome.png";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default function cadTurma() {

  const [turma, setTurma] = useState({});
  
  function handleChange(e) {
    const nome = e.target.name;
    const valor = (e.target.value).trim();
    setTurma({ ...turma, [nome]: valor });
    
    console.log(turma);  
  }

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="imgText">
          <img src={User} className="img" alt="Usuario" />
          <h2>Cadastro Turma</h2>
        </div>

        <form>
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
                <label>
                 <img src={Nome} alt="Nome" />
                  Curso
                </label>
                  <select onChange={handleChange} name="curso"  className="form-control">
                    <option value="">Selecione...</option>
                    <option value="1">Sistema de Informação</option>
                    <option value="2">Administração</option>
                    <option value="3">Contabil</option>
                    <option value="4">Gestão Financeira</option>
                  </select>
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
