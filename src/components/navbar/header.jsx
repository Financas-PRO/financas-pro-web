import React, { useEffect, useState } from 'react';
import "./header.css";
import menutoledo from "../../assets/image/menu.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../redux/action';

const HeaderCoord = () => {
  return (
    <>
      <NavLink to="/">
        <CDBSidebarMenuItem iconType='bi' icon="bi-house-gear">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink to="/turma/gerenciar">
        <CDBSidebarMenuItem icon="table">Gerenciamento Turma</CDBSidebarMenuItem>
      </NavLink>
      <NavLink to="/professor/gerenciar">
        <CDBSidebarMenuItem icon="table">Gerenciamento Docente</CDBSidebarMenuItem>
      </NavLink>
    </>

  );
}

const HeaderAluno = () => {

  return (
    <>
      <NavLink to="/">
        <CDBSidebarMenuItem icon="bi bi-house-gear">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink to="/turmas">
        <CDBSidebarMenuItem icon="bi bi-person-video3">Turmas</CDBSidebarMenuItem>
      </NavLink>
    </>

  );

}

const HeaderDocente = () => {

  return (
    <>
      <NavLink to="/">
        <CDBSidebarMenuItem icon="bi bi-house-gear">Dashboard</CDBSidebarMenuItem>
      </NavLink>
      <NavLink to="/turmas">
        <CDBSidebarMenuItem icon="bi bi-person-video3">Turmas</CDBSidebarMenuItem>
      </NavLink>
      <NavLink to="/turma/gerenciar">
        <CDBSidebarMenuItem icon="table">Gerenciamento Turma</CDBSidebarMenuItem>
      </NavLink>
    </>

  );

}

const Header = () => {

  const [header, setHeader] = useState();
  const navigate = useNavigate();

  const toggled = useSelector(state => state.toggleReducer);
  const dispatch = useDispatch();

  function handleLogout(e) {
    const logout_toast = toast.loading("Aguarde...");
    api.post("logout")
      .then(async res => {

        if (res.status) {

          toast.update(logout_toast, {
              render: "Redirecionando...",
              type: "success",
              isLoading: false
          });

          setTimeout(() => {
              return navigate(`/login`, { replace: true });
          }, 1500);
      }

      })
      .catch(error => {

        let resposta = error.response.data.error;

        var erros = "";

        if (typeof resposta === 'object') {

          Object.keys(resposta).forEach(function (index) {
            erros += resposta[index] + "\n";
          });

        } else erros = resposta;

        toast.update(logout_toast, {
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
  }

  useEffect(() => {
    switch (localStorage.getItem("papel")) {

      case "Admin":
        setHeader(<HeaderDocente />);
        break;

      case "Docente":
        setHeader(<HeaderDocente />);
        break;

      case "Coordenador":
        setHeader(<HeaderCoord />);
        break;

      case "Aluno":
        setHeader(<HeaderAluno />);
        break;
    }
  }, [])

  return (
    <div className="header">
      <ToastContainer/>

      <CDBSidebar toggled={toggled} textColor="#fff" backgroundColor="#12304A">
        <CDBSidebarHeader  prefix={<i onClick={(e) => { toggled ? dispatch(setToggle(false)) : dispatch(setToggle(true)) }} className="fa fa-bars fa-large"></i>} >
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <img className="aguia-menu" src={menutoledo} alt='aguia' />
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            {header}
          </CDBSidebarMenu>

        </CDBSidebarContent>

        <CDBSidebarFooter>
          <CDBSidebarMenuItem onClick={handleLogout} icon="user-slash">Sair</CDBSidebarMenuItem>
        </CDBSidebarFooter>

      </CDBSidebar>


    </div>
  );
};


export default Header;


