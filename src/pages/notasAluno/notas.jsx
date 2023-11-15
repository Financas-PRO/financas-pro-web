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
    const [alunos, setAlunos] = useState([]);

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

        api.get(`notas/${selectedClassId}`).then((res) => {
            setAlunos(res.data.data);
            console.log(alunos)

        })

    };

    var alunos_nota = ""

    alunos_nota = alunos.map((item, index) => {
        return (
            <tr key={index}>
                <td>
                    <strong>{item.id}</strong>
                </td>
                <td>{item.nome}</td>
                <td>{item.ra}</td>
                <td>{item.curso}</td>
                <td>{item.nota}</td>
            </tr>
        )

    });




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
                        <select className="form-control" onChange={handleTurmaChange}>
                            <option value="">Selecione uma turma</option>
                            {classes.map((cls) => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.descricao}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>NOME</th>
                                    <th>R.A.</th>
                                    <th>CURSO</th>
                                    <th>NOTA</th>
                                </tr>
                            </thead>
                            <tbody>{alunos_nota}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}