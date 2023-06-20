import React from "react";
import Navbar from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";


export default function EditaProfessor(){

    //validação de CPF
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
    
      //validação telefone
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
            : value.trim();
    
        setProfessor({ ...professor, [name]: valor });
    
    }
    
    return(
        <>

            <Navbar />

            <div className="container mt-5">

                <div className="imgText">
                    {/* <img src={User} className="img" alt="Usuario" /> */}
                    <h2>Editar Professor</h2>
                </div>

                <form>
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
                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>CPF</label>
                                <input 
                                    onChange={handleChange}
                                    type="text"
                                    name="cpf"
                                    className="form-control" 
                                />
                            </div>
                            <div className="col col-md-12 col-12">
                                <label>E-mail</label>
                                <input
                                    onChange={handleChange} 
                                    type="text"
                                    name="email" 
                                    className="form-control"
                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>Titulação</label>
                                <input
                                    onChange={handleChange} 
                                    type="text" 
                                    name="titulacao" 
                                    className="form-control" 
                                />
                            </div>
                            <div className="col col-md-6 col-12">
                                <label>Telefone</label>
                                <input 
                                    type="text"
                                    name="telefone"
                                    className="form-control" 
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
                                >
                                    <option value="">Selecione...</option>
                                    <option value="1">Professor</option>
                                    <option value="2">Coordenador</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}