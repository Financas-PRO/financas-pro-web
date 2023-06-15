import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./gerProfessor.css";
import Navbar from "../../components/navbar/header.jsx";
import User from "../../assets/image/user.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function GerProfessor() {

  
  const [docentes, setDocentes] = useState([]);



  useEffect(() => {

    axios.get(`http://127.0.0.1:8000/api/docente`).then(res => {
      //console.log(res);   
      console.log((res.data.data))
      setDocentes(res.data.data);
    });

  }, [])


  var docenteDetalhe = "";

  docenteDetalhe = docentes.map ( (item, index) => {

    const statusClass = item.ativo === 1 ? "ativo" : "inativo";
    const statusText = item.ativo === 1 ? "Ativo" : "Inativo";

    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.nome}</td>
        <td>{item.titulacao}</td>
        <td>{item.cpf}</td>
        <td>{item.user.email}</td>
        <td>{item.telefone}</td>
        <td>{item.user.username}</td>
        <td >
        <span className={`status ${statusClass}`}>
          {statusText}
        </span>
        </td>
        <td>
          <Link to={`/professor/${item.id}/editar`} className="btn btn-success">Editar</Link>
        </td>
        <td>
          <button type="button" className="btn btn-danger">Deletar</button>
        </td>
      </tr>
    )
  });
  

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card-header">
              <img src={User} className="img" alt="Usuario" />
              <h2>Gerenciamento de Docentes</h2>
            </div>
            <Link to="/professor/cadastrar" className="btn btn-primary">
              ADICIONAR
            </Link>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOME</th>
                    <th>TITULAÇÃO</th>
                    <th>CPF</th>
                    <th>EMAIL</th>
                    <th>TELEFONE</th>
                    <th>USUARIO</th>
                    <th>STATUS</th>
                    <th>EDITAR</th>
                    <th>DELETAR</th>
                  </tr>
                </thead>
                <tbody>
                  {docenteDetalhe}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
