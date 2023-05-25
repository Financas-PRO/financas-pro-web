import React from "react";
import '../assets/style/cadProfessor.css';
import User from '../assets/image/user.png';
import Nome from '../assets/image/nome.png';
import Cpf from '../assets/image/cpf.png';
import Email from '../assets/image/email.png';
import Senha from '../assets/image/lock.png';
import Telefone from '../assets/image/telefone.png';
import Titulacao from '../assets/image/titulacao.png';
import Rg from '../assets/image/Rg.png';
import Navbar from '../components/navbar/header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function cadProfessor(){
    return(
        <>
            <Navbar/>

            <div className="container mt-4">
                <div className="imgText">
                    <img src={User} className="img" alt="Usuario" />
                    <h2>Cadastro Professor</h2>
                </div>

                <form>
                    <div className="conteudo mt-5">
                        <div className="row square">
                            <div className="col col-md-12 col-12">
                                <img src={Nome} alt="Nome" />
                                <label>Nome</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Rg} alt="RG" />
                                <label>RG</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Cpf} alt="CPF" />
                                <label>CPF</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-12 col-12 mt-2">
                                <img src={Email} alt="Email" />
                                <label>E-mail</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Titulacao} alt="Titulação" />
                                <label>Titulação</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Telefone} alt="Telefone" />
                                <label>Telefone</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Nome} alt="Usuario" />
                                <label>Usuario</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col col-md-6 col-12 mt-2">
                                <img src={Senha} alt="Senha" />
                                <label>Senha</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="col col-md-12 col-12 buttonSalvar">
                            <button className="btn-salvar mb-3">Salvar</button>
                        </div>
                    </div>
                </form>
            </div> 
        </>  
    )
}