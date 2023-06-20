import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CadastrarProfessor from "./pages/cadProfessor/cadProfessor.jsx";
import CadastrarTurma from "./pages/cadTurma/cadTurma.jsx";
import GerenciarProfessor from "./pages/gerProfessor/gerProfessor.jsx";
import EditarProfessor from "./pages/editProfessor/editarProfessor.jsx";
import EditaProfessor from "./pages/editProfessor/editaProfessor";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            
            path="professor/cadastrar"
            element={<CadastrarProfessor />}
          />
          <Route
            exact
            path="turma/cadastrar"
            element={<CadastrarTurma />} />
          <Route
            
            path="professor/gerenciar"
            element={<GerenciarProfessor />}
          />
          <Route
            
            path="professor/:id/editar"
            element={<EditaProfessor />}
          />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
