import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import AlunosPage from './pages/AlunosPage';
import ProfessoresPage from './pages/ProfessoresPage';
import MateriasPage from './pages/MateriasPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/alunos" replace />} />
          <Route path="alunos" element={<AlunosPage />} />
          <Route path="professores" element={<ProfessoresPage />} />
          <Route path="materias" element={<MateriasPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
