import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import CadProfessor from "./pages/cadProfessor/cadProfessor.jsx";
import CadTurma from './pages/cadTurma/cadTurma.jsx';
import GerProfessor from './pages/gerProfessor/gerProfessor.jsx'
import EditarProfessor from './pages/editProfessor/editarProfessor.jsx'



function App() {

    return (
      <>
  
        <BrowserRouter>
  
          <Routes>
  
            <Route path="professor/cadastrar" element={<CadProfessor/>}/>
            <Route path="turma/cadastrar" element={<CadTurma/>}/>
            <Route path="professor/gerenciar" element={<GerProfessor/>}/>
            <Route path="professor/:id/editar" element={<EditarProfessor/>}/>


          </Routes>
  
        </BrowserRouter>
  
      </>
  
    );
  }
  
  export default App