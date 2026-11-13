import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import MasterLayout from '../layouts/MasterLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Usuarias from '../pages/Usuarias';
import CadastroMulher from '../pages/CadastroMulher';
import Atendimentos from '../pages/Atendimentos';
import Relatorios from '../pages/Relatorios';
import Configuracoes from '../pages/Configuracoes';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <MasterLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="usuarias" element={<Usuarias />} />
        <Route path="usuarias/nova" element={<CadastroMulher />} />
        <Route path="atendimentos" element={<Atendimentos />} />
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
