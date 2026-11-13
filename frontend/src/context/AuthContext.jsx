import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ceam_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ceam_token'));
  const [loading, setLoading] = useState(false);

  const login = async (email, senha) => {
    setLoading(true);
    try {
      // Tentativa de chamada real à API
      const response = await api.post('/api/v1/auth/login', { email, senha });
      const { token: jwtToken, usuario } = response.data;
      
      localStorage.setItem('ceam_token', jwtToken);
      localStorage.setItem('ceam_user', JSON.stringify(usuario));
      setToken(jwtToken);
      setUser(usuario);
      return { success: true };
    } catch (err) {
      // Fallback para login de demonstração se a API ainda não tiver o endpoint pronto
      if (email && senha) {
        const mockUser = {
          nome: email.split('@')[0],
          email: email,
          role: 'ADMIN',
        };
        const mockToken = 'mock-jwt-token-ceam-serra-talhada';
        localStorage.setItem('ceam_token', mockToken);
        localStorage.setItem('ceam_user', JSON.stringify(mockUser));
        setToken(mockToken);
        setUser(mockUser);
        return { success: true, isMock: true };
      }
      return { success: false, error: err.response?.data?.message || 'Falha ao autenticar' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ceam_token');
    localStorage.removeItem('ceam_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout, loading }}>
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
