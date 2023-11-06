import React, { useContext } from "react";
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
import ProtectedRoute from "./components/ProtectedRoute";
import Importa from "./pages/importarAluno/importa";
import Empresa from "./pages/empresa/empresa";
import Turmas from "./pages/turmas/turmas";
import Demonstrativo from "./pages/demonstrativo/demonstrativo";
import Erro from "./pages/erro/erro";
import CadSimulador from "./pages/cadSimulador/cadSimulador";
import Analise from "./pages/analiseAluno/analise";
import Feedback from "./pages/feedbackProfessor/feedback";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Resumo from "./pages/resumo/resumo.jsx";

function App() {
  
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Erro />} />

          <Route element={<ProtectedRoute route="checkAuth" />}>

            <Route path="/" element={<Dashboard />} />

            <Route element={<ProtectedRoute route="scopeAluno" />}>
              <Route path="/simuladores/:id/" element={<Simuladores />} />
              <Route path="/empresa/:id/" element={<Empresa />} />
              <Route path="/simulador/cadastrar/:id" element={<CadSimulador />} />
              <Route path="/analise/:id" element={<Analise />} />
              <Route path="/feedback" element={<Feedback />} />
            </Route>

            <Route element={<ProtectedRoute route="scopeDoc" />}>
              <Route path="/importa/:id/" element={<Importa />} />
              <Route path="turma/cadastrar" element={<CadastrarTurma />} />
              <Route path="turma/gerenciar" element={<GerenciarTurma />} />
              <Route path="turma/:id/editar" element={<EditaTurma />} />
              <Route path="/importa/:id/" element={<Importa />} />
            </Route>

            <Route path="/turmas" element={<Turmas />} />
            <Route path="professor/cadastrar" element={<CadastrarProfessor />} />
            <Route path="professor/gerenciar" element={<GerenciarProfessor />} />
            <Route path="professor/:id/editar" element={<EditaProfessor />} />
            <Route path="/demonstrativo/:id" element={<Demonstrativo />} />
            <Route path="/resumo/:id" element={<Resumo />} />

          </Route>

        </Routes>
      </Provider>

    </BrowserRouter>
  );
}

export default App;

