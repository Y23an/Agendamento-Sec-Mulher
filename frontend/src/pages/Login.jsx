import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import logoCeam from '../assets/logos/logo-ceam.png';
import logoPrefeitura from '../assets/logos/logo-prefeitura-horizontal.png';

export default function Login() {
  const [email, setEmail] = useState('atendente@ceam.serratalhada.pe.gov.br');
  const [senha, setSenha] = useState('123456');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !senha) {
      setError('Por favor, informe seu e-mail institucional e senha.');
      return;
    }

    const result = await login(email, senha);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Credenciais inválidas. Verifique e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-ceamFundo flex flex-col justify-center items-center px-4 py-8">
      <div className="max-w-md w-full mb-6 text-center">
        <div className="flex justify-center items-center gap-4 mb-4">
          <img src={logoCeam} alt="Logo CEAM" className="h-16 object-contain" />
          <div className="h-10 w-px bg-gray-300" />
          <img src={logoPrefeitura} alt="Prefeitura Municipal" className="h-12 object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-ceamAzulEscuro">
          Sistema de Monitoramento CEAM
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Secretaria Municipal da Mulher • Serra Talhada - PE
        </p>
      </div>

      <div className="w-full max-w-md">
        <Card title="Acesso Restrito ao Painel" subtitle="Insira suas credenciais de operador do CEAM">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="E-mail Institucional"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu.nome@serratalhada.pe.gov.br"
              required
            />

            <Input
              label="Senha de Acesso"
              type="password"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
              <span>Ambiente Seguro • Rede Municipal</span>
              <span className="text-ceamLilas font-medium cursor-pointer hover:underline">
                Esqueceu a senha?
              </span>
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                className="w-full py-2.5 text-base shadow"
              >
                {loading ? 'Validando Acesso...' : 'Acessar Sistema'}
              </Button>
            </div>
          </form>

          <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-500">
            <p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD)</p>
            <p className="mt-0.5 font-medium text-ceamAzulEscuro">CEAM Serra Talhada © 2026</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
