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
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route element={<ProtectedRoute/>}> */}
            <Route path="turma/cadastrar" element={<CadastrarTurma />} />
            <Route path="turma/gerenciar" element={<GerenciarTurma />} />
            <Route path="turma/:id/editar" element={<EditaTurma />} />
            <Route path="professor/cadastrar" element={<CadastrarProfessor />} />
            <Route path="professor/gerenciar" element={<GerenciarProfessor />} />
            <Route path="professor/:id/editar" element={<EditaProfessor />} />
          {/* </Route> */}
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
