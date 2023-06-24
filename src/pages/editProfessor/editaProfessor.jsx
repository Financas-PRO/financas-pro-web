import React, { useState, useEffect } from "react";
import "./editarProfessor.css";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";


export default function EditaProfessor(){

    const [professor, setProfessor] = React.useState({
        nome: "", 
        cpf: "",
        rg: "", 
        titulacao: "", 
        telefone: "",
        user:{
            email: "", 
            username: "",
            id_tipoDeUsuario: ""
        }
    });


    let { id } = useParams();
    let navigate = useNavigate();
    
    useEffect(() => {

        api.get(`docente/${id}`).then((res) => {

          setProfessor({
                nome: res.data.data.nome, 
                cpf: res.data.data.cpf,
                rg: res.data.data.rg, 
                titulacao: res.data.data.titulacao,
                telefone: res.data.data.telefone,
                user:{
                    email: res.data.data.user.email, 
                    username: res.data.data.user.username,
                    id_tipoDeUsuario: res.data.data.user.id_tipoDeUsuario
                }
            });
        });
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
          api
            .put(`docente/${id}`, professor)
            .then(async (res) => {
              if (res.status) {
                toast.success("Docente alterado com sucesso !");
    
                setTimeout(() => {
                  return navigate("/professor/gerenciar", { replace: true });
                }, 4000);
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
          console.log(professor);
        }
    }

    const formatCPF = (cpf) => {
        const cleanedCPF = cpf.replace(/\D/g, "");
    
        let maskedCPF = "";
    
        if (cleanedCPF.length > 0) {
          maskedCPF += cleanedCPF.slice(0, 3);
        }
        if (cleanedCPF.length > 3) {
          maskedCPF += "." + cleanedCPF.slice(3, 6);
        }
        if (cleanedCPF.length > 6) {
          maskedCPF += "." + cleanedCPF.slice(6, 9);
        }
        if (cleanedCPF.length > 9) {
          maskedCPF += "-" + cleanedCPF.slice(9, 11);
        }
    
        return maskedCPF;
    };
    
      const formatTelefone = (telefone) => {
        const cleanedTelefoen = telefone.replace(/\D/g, "");
    
        let maskedTelefone = "";
    
        if (cleanedTelefoen.length > 0) {
          maskedTelefone += "(" + cleanedTelefoen.slice(0, 2);
        }
        if (cleanedTelefoen.length > 2) {
          maskedTelefone += ")" + cleanedTelefoen.slice(2, 7);
        }
        if (cleanedTelefoen.length > 7) {
          maskedTelefone += "-" + cleanedTelefoen.slice(7, 11);
        }
    
        return maskedTelefone;
    };
    
    function handleChange(e) {
        const { name, value } = e.target;
        const valor =
          name === "cpf"
            ? formatCPF(value)
            : name === "telefone"
            ? formatTelefone(value)
            : value;
    
        setProfessor({ ...professor, [name]: valor });
    
        console.log(professor);
      }

    return(
        <>

            <Navbar />

            <div className="container mt-5">
                <ToastContainer className="toast-top-right" />

                <div className="imgText">
                    {/* <img src={User} className="img" alt="Usuario" /> */}
                    <h2>Editar Professor</h2>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="conteudoProfessor mt-3">
                        <div className="row square">

                            <div className="col col-md-12 col-12">
                                <label>Nome</label>
                                <input
                                    onChange={handleChange}
                                    type="text" 
                                    className="form-control"
                                    maxLength="80"
                                    name="nome"
                                    value={professor.nome}

                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>RG</label>
                                <input
                                    onChange={handleChange} 
                                    type="text" 
                                    name="rg"
                                    className="form-control"
                                    maxLength="9"
                                    value={professor.rg}

                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>CPF</label>
                                <input 
                                    onChange={handleChange}
                                    type="text"
                                    name="cpf"
                                    className="form-control" 
                                    value={professor.cpf}
 
                                />
                            </div>
                           
                            
                            <div className="col col-md-6 col-12">
                                <label>Titulação</label>
                                <input
                                    onChange={handleChange} 
                                    type="text" 
                                    name="titulacao" 
                                    className="form-control" 
                                    value={professor.titulacao}
                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>Telefone</label>
                                <input 
                                    type="text"
                                    name="telefone"
                                    className="form-control" 
                                    value={professor.telefone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col col-md-12 col-12">
                               
                                <label>E-mail</label>
                                <input
                                    onChange={handleChange}
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    maxLength="50"
                                    defaultValue={professor.user.email}
                                    
                                />
                            </div>

                            <div className="col col-md-6 col-12">
                            
                                <label>Usuario</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    maxLength="50"
                                    defaultValue={professor.user.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col col-md-6 col-12">
                            
                                <label>Senha</label>
                                <input
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    maxLength="20"
                                />
                            </div>
                            <div className="col col-md-12 col-12">
                                <label>
                                    Tipo
                                </label>
                                <select
                                    onChange={handleChange} 
                                    name="id_tipoDeUsuario"
                                    className="form-control"
                                    
                                    value={professor.user.id_tipoDeUsuario}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="1">Professor</option>
                                    <option value="2">Coordenador</option>
                                </select>
                            </div>


                            <div className="col col-md-12 col-12 buttonSalvar">
                                <button className="btn-salvar mb-3">Alterar</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}