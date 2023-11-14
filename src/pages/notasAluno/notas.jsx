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

        useEffect(() => {
            // Função para carregar as classes da API
            const fetchClasses = async () => {
                try {
                    const response = await fetch('https://financaspro.cloud/api/turma/'); // Substitua pela URL da sua API
                    const data = await response.json();

                    // Verifica se o retorno da API é um array antes de atualizar o estado
                    if (Array.isArray(data)) {
                        setClasses(data);
                    } else {
                        console.error('A API não retornou um array:', data);
                    }
                } catch (error) {
                    console.error('Erro ao carregar as turmas:', error);
                }
            };

            // Chama a função de carregamento
            fetchClasses();
        }, []);

        const handleClassChange = (e) => {
            const selectedClassId = parseInt(e.target.value, 10);
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
                        {/* <select class="form-select" aria-label="Default select example">
                            <option selected>Selecione</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select> */}



                        <div>
                            <h1>Seletor de Turmas</h1>
                            <select onChange={handleClassChange}>
                                <option value="">Selecione uma turma</option>
                                {Array.isArray(classes) &&
                                    classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.descricao}
                                        </option>
                                    ))}
                            </select>

                            {selectedClass && (
                                <div>
                                    <h2>Informações da Turma Selecionada</h2>
                                    <p>Nome da Turma: {selectedClass.descricao}</p>
                                    
                                </div>
                            )}
                        </div>





                    </div>
                </div>
            </div>
        </div>
    );
}