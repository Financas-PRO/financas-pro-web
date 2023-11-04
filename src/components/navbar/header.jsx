import React, { useEffect, useState } from 'react';
import "./header.css";
import menutoledo from "../../assets/image/menu.png";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

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

  useEffect(() => {
    switch(localStorage.getItem("papel")){

      case "Admin":
        setHeader(<HeaderDocente/>);
      break;

      case "Docente":
        setHeader(<HeaderDocente/>);
      break;

      case "Coordenador":
        setHeader(<HeaderCoord/>);
      break;

      case "Aluno":
        setHeader(<HeaderAluno/>);
      break;
    }
  }, [])

  return (
    // <div>
    <div className="header">
      <CDBSidebar textColor="#fff" backgroundColor="#12304A">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
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
          <CDBSidebarMenuItem icon="user-slash">Logout</CDBSidebarMenuItem>
        </CDBSidebarFooter>

      </CDBSidebar>
    </div>
  );
};


export default Header;


