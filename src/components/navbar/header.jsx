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
  CDBNavbar,
  CDBNavToggle,
  CDBNavBrand
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setToggle } from '../../redux/action';
import tratarErro from '../../util/tratarErro';

const header_aluno = [
  {
    rota: "/",
    icone: "bi bi-house-gear",
    titulo: "Dashboard"

  },
  {
    rota: "/turmas",
    icone: "bi bi-person-video3",
    titulo: "Turmas"
  },

]

const header_docente = [
  {
    rota: "/",
    icone: "bi bi-house-gear ",
    titulo: "Dashboard"
  },
  {
    rota: "/turmas",
    icone: "bi bi-person-video3",
    titulo: "Turmas"
  },
  {
    rota: "/turma/gerenciar",
    icone: "bi bi-people-fill",
    titulo: "Gerenciar Turmas"
  }
]

const Header = () => {

  const [header, setHeader] = useState([]);
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
            return navigate(`/login`);
          }, 1500);
        }

      })
      .catch(error => {

        let erros = tratarErro(error.response.data.error);

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

  const SideBar = () => {

    return (
      <div className="header">
        <ToastContainer />

        <CDBSidebar toggled={toggled} textColor="#fff" backgroundColor="#12304A">
          <CDBSidebarHeader prefix={<i onClick={(e) => { toggled ? dispatch(setToggle(false)) : dispatch(setToggle(true)) }} className="fa fa-bars fa-large"></i>} >
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              <img className="aguia-menu" src={menutoledo} alt='aguia' />
            </a>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              {header.map(item => {
                return (
                  <NavLink to={item.rota}>
                    <CDBSidebarMenuItem icon={item.icone}>{item.titulo}</CDBSidebarMenuItem>
                  </NavLink>
                )
              })}
            </CDBSidebarMenu>

          </CDBSidebarContent>

          <CDBSidebarFooter>
            <CDBSidebarMenuItem onClick={handleLogout} icon="user-slash">Sair</CDBSidebarMenuItem>
          </CDBSidebarFooter>

        </CDBSidebar>


      </div >
    )

  }

  const NavBar = () => {
    return (
      <div className='navbar-mobile container-fluid' style={{ display: 'none' }}>
        <CDBNavbar className='justify-content-start'>
          <CDBNavToggle
            onClick={() => toggled ? dispatch(setToggle(false)) : dispatch(setToggle(true))}
          />

          <CDBNavBrand href="/">
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              <img className="aguia-menu img-fluid" style={{ height: "2em", marginLeft: "1em" }} src={menutoledo} alt='aguia' />
            </a>
          </CDBNavBrand>

        </CDBNavbar>
      </div>

    )
  }

  useEffect(() => {
    switch (localStorage.getItem("papel")) {

      case "Admin":
        setHeader(header_docente);
        break;

      case "Docente":
        setHeader(header_docente);
        break;

      case "Coordenador":
        setHeader(header_docente);
        break;

      case "Aluno":
        setHeader(header_aluno);
        break;
    }
  }, [])

  return (
    <>
      <NavBar />
      <SideBar />
    </>
  );
};


export default Header;


