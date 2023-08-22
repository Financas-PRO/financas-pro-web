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
            <NavLink exact to="/">
              <CDBSidebarMenuItem icon="columns">Inicial</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/professor/cadastrar">
              <CDBSidebarMenuItem icon="table">Cadastro Professor</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/turma/cadastrar">
              <CDBSidebarMenuItem icon="table">Cadastro Turma</CDBSidebarMenuItem>
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