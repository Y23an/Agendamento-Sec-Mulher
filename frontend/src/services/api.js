import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ceam_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('ceam_token');
      localStorage.removeItem('ceam_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const cadastrarMulher = async (dadosMulher) => {
  const response = await api.post('/api/v1/mulheres', dadosMulher);
  return response.data;
};

export const listarMulheres = async () => {
  const response = await api.get('/api/v1/mulheres');
  return response.data;
};

export const listarBairros = async () => {
  const response = await api.get('/api/v1/dominios/bairros');
  return response.data;
};

export const listarProfissoes = async () => {
  const response = await api.get('/api/v1/dominios/profissoes');
  return response.data;
};

export const obterMetricasRelatorio = async () => {
  const response = await api.get('/api/v1/relatorios/metricas');
  return response.data;
};

export const listarAtendimentos = async () => {
  const response = await api.get('/api/v1/atendimentos');
  return response.data;
};

export const cadastrarAtendimento = async (dadosAtendimento) => {
  const response = await api.post('/api/v1/atendimentos', dadosAtendimento);
  return response.data;
};

export default api;
