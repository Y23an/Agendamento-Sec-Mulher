import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

function lerExp(token) {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(b64));
    return exp ? exp * 1000 : 0;
  } catch {
    return 0;
  }
}

function lerSessao() {
  const token = localStorage.getItem('ceam_token');
  if (!token || lerExp(token) <= Date.now()) {
    localStorage.removeItem('ceam_token');
    localStorage.removeItem('ceam_user');
    return { token: null, user: null };
  }
  try {
    return { token, user: JSON.parse(localStorage.getItem('ceam_user')) };
  } catch {
    return { token, user: null };
  }
}

export function AuthProvider({ children }) {
  const [sessao, setSessao] = useState(lerSessao);
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    localStorage.removeItem('ceam_token');
    localStorage.removeItem('ceam_user');
    setSessao({ token: null, user: null });
  }, []);

  // encerra a sessão sozinha quando o token expira
  useEffect(() => {
    if (!sessao.token) return;
    const ms = lerExp(sessao.token) - Date.now();
    if (ms <= 0) { logout(); return; }
    const id = setTimeout(logout, Math.min(ms, 2 ** 31 - 1));
    return () => clearTimeout(id);
  }, [sessao.token, logout]);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/v1/auth/login', { email: email.trim(), senha });
      localStorage.setItem('ceam_token', data.token);
      localStorage.setItem('ceam_user', JSON.stringify(data.usuario));
      setSessao({ token: data.token, user: data.usuario });
      return { success: true };
    } catch (err) {
      let error = 'Não foi possível conectar ao servidor.';
      if (err.response?.status === 401) error = err.response.data?.message || 'E-mail ou senha inválidos.';
      else if (err.response?.status === 400) error = 'Informe um e-mail e uma senha válidos.';
      else if (err.response) error = 'Erro no servidor. Tente novamente.';
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user: sessao.user,
      token: sessao.token,
      isAuthenticated: !!sessao.token,
      login,
      logout,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
