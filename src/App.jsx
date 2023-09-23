import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CadastrarProfessor from "./pages/cadProfessor/cadProfessor.jsx";
import CadastrarTurma from "./pages/cadTurma/cadTurma.jsx";
import GerenciarProfessor from "./pages/gerProfessor/gerProfessor.jsx";
import EditaProfessor from "./pages/editProfessor/editaProfessor.jsx";
import GerenciarTurma from "./pages/gerTurma/gerTurma.jsx";
import EditaTurma from "./pages/editTurma/editaTurma.jsx";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Simuladores from "./pages/simuladores/Simuladores";
import CadastrarSimulador from "./pages/cadSimulador/cadSimulador.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Importa from "./pages/importarAluno/importa";
import Empresa from "./pages/empresa/empresa";
import Turmas from "./pages/turmas/turmas";
import CadSimulador02 from "./pages/cadSimulador02/cadSimulador02";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />         
          {/* <Route element={<ProtectedRoute/>}> */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="turma/cadastrar" element={<CadastrarTurma />} />
            <Route path="turma/gerenciar" element={<GerenciarTurma />} />
            <Route path="turma/:id/editar" element={<EditaTurma />} />
            <Route path="professor/cadastrar" element={<CadastrarProfessor />} />
            <Route path="professor/gerenciar" element={<GerenciarProfessor />} />
            <Route path="professor/:id/editar" element={<EditaProfessor />} />
            <Route path="/simuladores" element={<Simuladores />} />
            <Route path="/simulador/cadastrar/:id/" element={<CadastrarSimulador />} />
            <Route path="/simulador02/cadastrar/:id/" element={<CadSimulador02 />} />
            <Route path="/importa/:id/" element={<Importa />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/turmas" element={<Turmas />} />
          {/* </Route> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
