import React, { useEffect, useState } from "react";
import "./empresa.css";
import Header from "../../components/navbar/header.jsx";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Title from "../../components/title/title";
import ButtonSalvar from "../../components/button/buttonSalvar";
import ButtonCancelar from "../../components/button/buttonCancelar";
import EmpresaCard from "../../components/empresa/EmpresaCard";
import axios from "axios";
import api from "../../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import tratarErro from "../../util/tratarErro";

export default function Empresa() {

    let { id } = useParams();
    let navigate = useNavigate();

    const [busca, setBusca] = useState("");
    const [resultados, setResultados] = useState([]);
    const [empresas, setEmpresas] = useState([]);
    const [icone, setIcone] = useState(false)
    const [empresaSelecionada, setEmpresaSelecionada] = useState([]);

    const [grupo, setGrupo] = useState({
        id: 1,
        turma: {
            id: 1
        }
    });

    const [faixa, setFaixa] = useState('');
    const [intervalo, setItervalo] = useState('');

    useEffect(() => {
        api.get(`get_grupo/${id}`).then((res) => {
            setGrupo({
                id: res.data.data.id,
                turma: {
                    id: res.data.data.turma.id
                }
            });
        });
    }, [id]);

    useEffect(() => {

        axios.get(`https://brapi.dev/api/quote/list?search=${busca}&sortBy=close&sortOrder=desc&limit=12`)
            .then(res => {
                setResultados(res.data.stocks);

            })
            .catch(err => {
            })

    }, [busca]);

    async function handleSubmit(e) {
        e.preventDefault();
        const empresa_toast = toast.loading("Buscando os dados, aguarde...")
        try {
            api
                .post(`acoes/${id}`, { empresas: empresaSelecionada, faixa: faixa, intervalo: intervalo })
                .then(async (res) => {
                    if (res.status) {

                        toast.update(empresa_toast, {
                            render: "Dados salvos com sucesso!",
                            type: "success",
                            isLoading: false
                        });

                        setTimeout(() => {
                            return navigate(`/demonstrativo/${id}`, { replace: true });
                        }, 1500);
                    }
                })
                .catch(function (error) {

                    let erros = tratarErro(error.response.data.error);

                    toast.update(empresa_toast, {
                        render: `\n ${erros}`,
                        type: 'error',
                        isLoading: false,
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "colored"
                    });
                });
        } catch (err) {

        }
    }

    function handleChangeFaixa(e) {
        const valor = e.target.value;
        setFaixa(valor);
    }

    function handleChangeIntervalo(e) {
        const valor = e.target.value;
        setItervalo(valor);
    }

    function handleChange(e) {
        setBusca(e.target.value.trim());
    }

    function handleClick(simbolo) {
        setIcone(!icone)
        setEmpresas([...empresas, simbolo]);

        if (empresas.includes(simbolo)) {
            setEmpresas(empresas.filter(empresa => empresa !== simbolo))
        }

        if (empresaSelecionada.includes(simbolo)) {
            setEmpresaSelecionada(empresaSelecionada.filter((item) => item !== simbolo));
        }
        else {
            setEmpresaSelecionada([...empresaSelecionada, simbolo]);
        }

    }


    return (
        <div className="row-page">

            <Header />

            <div className="container mt-4 col-md-8 col-9">
                <ToastContainer />
                <Title
                    icon="bi-file-earmark-bar-graph"
                    titulo="Empresas"
                    subTitulo="Selecione suas empresas" />

                <form onSubmit={handleSubmit} className=" mt-5">
                    <div className="cardFundo">


                        <div className="row">
                            <div className="col col-md-12 col-12">
                                <label><i className="bi bi-search margin-icon"></i>Pesquise a empresa</label>
                                <input className="form-control" placeholder="Digite aqui o ativo da empresa..." onChange={handleChange}></input>
                            </div>
                            <div className="col col-md-6 col-6">
                                <label> <i className="bi bi-calendar-range-fill margin-icon"></i>Informe a Faixa</label>
                                <select className="form-select" value={faixa} onChange={handleChangeFaixa}>
                                    <option selected>Faixa</option>
                                    <option value="1d">Um dia de negociação, incluindo o dia atual</option>
                                    <option value="5d">Cinco dias de negociação, incluindo o dia atual</option>
                                    <option value="1mo">Um mês de negociação, incluindo o dia atual</option>
                                    <option value="3mo">Três meses de negociação, incluindo o dia atual</option>
                                    <option value="6mo">Seis meses de negociação, incluindo o dia atual</option>
                                    <option value="1y">Um ano de negociação, incluindo o dia atual</option>
                                    <option value="2y">Dois anos de negociação, incluindo o dia atual</option>
                                    <option value="5y">Cinco anos de negociação, incluindo o dia atual</option>
                                    <option value="10y">Dez anos de negociação, incluindo o dia atual</option>
                                    <option value="ytd">O ano atual até a data atual</option>
                                    <option value="max">Todos os dados disponíveis</option>
                                </select>
                            </div>
                            <div className="col col-md-6 col-6">
                                <label> <i className="bi bi-calendar-range-fill margin-icon"></i>Informe a Intervalo</label>
                                <select className="form-select" value={intervalo} onChange={handleChangeIntervalo}>
                                    <option selected>Intervalo</option>
                                    <option value="1m">Um minuto</option>
                                    <option value="2m">Dois minutos</option>
                                    <option value="5m">Cinco minutos</option>
                                    <option value="15m">Quinze minutos</option>
                                    <option value="30m">Trinta minutos</option>
                                    <option value="60m">Sessenta minutos</option>
                                    <option value="90m">Noventa minutos</option>
                                    <option value="1h">Uma hora</option>
                                    <option value="1d">Um dia</option>
                                    <option value="5d">Cinco dias</option>
                                    <option value="1wk">Uma semana</option>
                                    <option value="1mo">Um mês</option>
                                    <option value="3mo">Três meses</option>
                                </select>
                            </div>

                            <div className="col col-md-12 col-12">
                                <label><i className="bi bi-bar-chart-fill margin-icon"></i>Empresas Selecionadas</label>
                                <input type="text" disabled
                                    className="form-control mb-4"
                                    placeholder="Selecionados"
                                    value={empresaSelecionada.join(' - ')} />
                            </div>
                        </div>

                        <div className="row">

                            {
                                resultados.map((empresa) => {
                                    return (<EmpresaCard
                                            key={empresa.stock}
                                            ativo={empresas.includes(empresa.stock) ? 1 : 0}
                                            nome={empresa.name}
                                            imgurl={empresa.logo}
                                            stock={empresa.stock}
                                            click={e => { e.preventDefault(); handleClick(empresa.stock) }}
                                            imagem={empresas.includes(empresa.stock) ? <i className="bi bi-check"></i> : <i className="bi bi-plus"></i>}
                                        />);
                                    })
                            }

                        </div>



                    </div>
                    <div className="col col-md-12 col-12 buttons justify-content-end mb-5 mt-4">
                        <ButtonCancelar link={`simuladores/${grupo.turma.id}`} nome="Cancelar" />
                        <ButtonSalvar nome="Salvar" />
                    </div>
                </form>


            </div>
        </div>
    )
}