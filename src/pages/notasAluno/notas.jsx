import React, { useEffect, useState } from "react";
import "./notas.css";
import Header from "../../components/navbar/header.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import Simulador from "../../components/simulador/simulador";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function Notas() {

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        
            api.get(`turma`).then((res) => {
                const data = res.data.data;
              
                if (Array.isArray(data)) {
                    setClasses(data);
                } else {
                    console.error('A API não retornou um array:', data);
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar as turmas:', error);
            });
        
    }, []);

    const handleTurmaChange = (e) => {
        const selectedClassId = parseInt(e.target.value);
        const selectedClass = classes.find((cls) => cls.id === selectedClassId);
        setSelectedClass(selectedClass);
    };

    return (
        <div className="row-page">

            <Header />

            <div className="container mt-4 col-md-8">

                <Title
                    icon="bi-journal-text"
                    titulo="Notas"
                    subTitulo="Selecione a turma desejada" />


                <div className="row mt-5">
                    <div className="col col-md-12 col-12">
                        <label className="form-label labelselect"><i class="bi bi-clipboard-plus"></i>Selecione uma turma</label>



                        <div>

                            <select onChange={handleTurmaChange}>
                                <option value="">Selecione uma turma</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.descricao}
                                    </option>
                                ))}
                            </select>

                            {selectedClass && (
                                <div>
                                    <h2>Informações da Turma Selecionada</h2>
                                    <p>Descrição da Turma: {selectedClass.descricao}</p>
                                   
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}