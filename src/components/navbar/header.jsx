<<<<<<< HEAD
import React from "react";
import Img from '../../assets/image/toledo.png';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function header(){
    return(
        <>
            <nav>
                <img src={Img} alt="" />
                <h2>Finanças PRO</h2>
            </nav>
        </>
    )
}
=======
import React from 'react';
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


const Header = () => {
  return (
    // <div>
    <div style={{ display: 'flex', height: '100vh', position: 'fixed', overflow: 'scroll initial'}}> 
      <CDBSidebar textColor="#fff" backgroundColor="#12304A">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            <img  className= "aguia-menu"src={menutoledo} alt='aguia'/>
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu >
            <NavLink to="/">
              <CDBSidebarMenuItem icon="home">Inicial</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/professor/cadastrar">
              <CDBSidebarMenuItem icon="table">Cadastro Professor</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/turma/cadastrar">
              <CDBSidebarMenuItem icon="table">Cadastro Turma</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/turma/gerenciar">
              <CDBSidebarMenuItem icon="table">Gerenciamento Turma</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/professor/gerenciar">
              <CDBSidebarMenuItem icon="table">Gerenciamento Professor</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/simulador/cadastrar">
              <CDBSidebarMenuItem icon="table">Cadastro Simulador</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/simulador"> 
              <CDBSidebarMenuItem icon="table">Simuladores</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Finanças PRO
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Header   ;
>>>>>>> front
