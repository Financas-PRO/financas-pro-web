import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CadastrarProfessor from "./pages/CadProfessor/CadProfessor.jsx";
import CadastrarTurma from "./pages/CadTurma/CadTurma.jsx";
import GerenciarProfessor from "./pages/GerProfessor/GerProfessor.jsx";
import EditarProfessor from "./pages/EditProfessor/EditarProfessor.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="professor/cadastrar"
            element={<CadastrarProfessor />}
          />
          <Route
            exact
            path="turma/cadastrar"
            element={<CadastrarTurma />} />
          <Route
            exact
            path="professor/gerenciar"
            element={<GerenciarProfessor />}
          />
          <Route
            exact
            path="professor/:id/editar"
            element={<EditarProfessor />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
