import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import CadProfessor from "./pages/cadProfessor/cadProfessor.jsx";
import CadTurma from './pages/cadTurma/cadTurma.jsx';



function App() {

    return (
      <>
  
        <BrowserRouter>
  
          <Routes>
  
            <Route path="cadprofessor" element={<CadProfessor/>}/>
            <Route path="cadturma" element={<CadTurma/>}/>
  
          </Routes>
  
        </BrowserRouter>
  
      </>
  
    );
  }
  
  export default App