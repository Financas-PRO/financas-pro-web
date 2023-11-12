import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './login.css';
import api from "../../services/api";
import "react-toastify/dist/ReactToastify.css";
import toledo from '../../assets/image/toledo.png'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/action";
import tratarErro from "../../util/tratarErro";

export default function Login() {

  const [login, setLogin] = useState({});

  const user = useSelector(state => state.userReducer);

  const dispatch = useDispatch();

  let navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();


      api.post("login", login)
        .then(async (res) => {
          if (res.status) {
            toast.success("Login realizado com sucesso!");
            localStorage.setItem('papel', res.data.scope);
            dispatch(setUser(res.data.user));

            setTimeout(() => {
              return navigate("/", { replace: true });
            }, 1500);
          }
        })
        .catch(function (error) {

          let erros = tratarErro(error.response.data.error);

          toast.error(`Erro ao Logar!\n ${erros}`, {
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


  }

  function handleChange(e) {
    const nome = e.target.name;
    const valor = e.target.value.trim();
    setLogin({ ...login, [nome]: valor });

    console.log(login);
  }



  return (

    <div className="container-fluid">
      <ToastContainer className="toast-top-right" />
      <div className="row">
        <div className="col col-md-8 imagemFundo"></div>
        <div className="col col-md-4 text-end login">

          <img className="aguia" src={toledo} alt="" />
          <h2>Finanças PRO</h2>

          <span>Para ter acesso ao Finanças Pro, informe</span>
          <span>os dados abaixo.</span>
          <form className="mt-4 username" onSubmit={handleSubmit}>
            <input
              type="text"
              id="usuario"
              className="inputControl"
              placeholder="Usuário"
              name="username"
              maxLength={20}
              onChange={handleChange}
            />
            <input
              type="password"
              id="senha"
              className="inputControl mt-4"
              placeholder="Senha"
              name="password"
              maxLength={20}
              onChange={handleChange}
            />

            <button className="btn btn-warning w-100 mt-4">Entrar</button>
          </form>

          <span className="mt-5">Toledo Prudente</span>
          <span>Todos os direitos reservados</span>
        </div>
      </div>
    </div>

  );
}

