import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listarMulheres } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Usuarias() {
  const [mulheres, setMulheres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  const carregarMulheres = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await listarMulheres();
      setMulheres(data);
    } catch (err) {
      console.error('Erro ao buscar mulheres cadastradas:', err);
      setError('Falha ao carregar a listagem de mulheres do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMulheres();
  }, []);

  const mulheresFiltradas = mulheres.filter((m) => {
    const termo = filtro.toLowerCase();
    const nome = m.nome ? m.nome.toLowerCase() : '';
    const cpf = m.cpf ? m.cpf.toLowerCase() : '';
    return nome.includes(termo) || cpf.includes(termo);
  });

  return (
    <div className="space-y-6">
      {/* Topo com Título e Ação de Cadastro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ceamAzulEscuro">
            Usuárias do CEAM (Mulheres Atendidas)
          </h1>
          <p className="text-sm text-gray-600">
            Registro cadastral e histórico de acolhimentos • Serra Talhada - PE
          </p>
        </div>
        <Link to="/usuarias/nova">
          <Button variant="primary" className="shadow">
            + Cadastrar Nova Mulher
          </Button>
        </Link>
      </div>

      {/* Card Principal com Barra de Pesquisa e Tabela */}
      <Card
        title="Listagem Geral de Usuárias Cadastradas"
        subtitle={`Total de ${mulheres.length} registros no banco de dados`}
      >
        {/* Barra de Filtro */}
        <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="w-full sm:w-96 relative">
            <input
              type="text"
              placeholder="Buscar por nome ou CPF..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ceamLilas focus:border-transparent text-ceamAzulEscuro"
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3 top-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Button variant="secondary" onClick={carregarMulheres} className="text-xs py-2 px-3">
            Atualizar Lista
          </Button>
        </div>

        {/* Estados de Carregamento e Dados */}
        {loading ? (
          <div className="py-12 text-center text-gray-500 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-ceamLilas border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm text-ceamAzulEscuro font-medium">Carregando usuárias do PostgreSQL...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border-l-4 border-red-500 flex items-center justify-between">
            <span>{error}</span>
            <Button variant="secondary" onClick={carregarMulheres} className="text-xs py-1 px-3">
              Tentar novamente
            </Button>
          </div>
        ) : mulheresFiltradas.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-base font-semibold text-ceamAzulEscuro">Nenhuma mulher encontrada</p>
            <p className="text-xs text-gray-500 mt-1">
              {filtro ? 'Tente ajustar os termos da sua pesquisa.' : 'Comece cadastrando a primeira usuária do sistema.'}
            </p>
            {!filtro && (
              <div className="mt-4">
                <Link to="/usuarias/nova">
                  <Button variant="primary">+ Cadastrar Mulher Agora</Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-ceamAzulEscuro">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-600">
                <tr>
                  <th className="py-3 px-4">Nome da Usuária</th>
                  <th className="py-3 px-4">CPF</th>
                  <th className="py-3 px-4">Telefone</th>
                  <th className="py-3 px-4">Bairro</th>
                  <th className="py-3 px-4">Profissão</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mulheresFiltradas.map((mulher) => (
                  <tr key={mulher.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-ceamAzulEscuro">{mulher.nome}</span>
                      {mulher.rg && (
                        <span className="block text-xs text-gray-500 font-mono">RG: {mulher.rg}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-ceamLilas">
                      {mulher.cpf}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mulher.telefone || 'Não informado'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mulher.bairro?.descricao || 'Serra Talhada'}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {mulher.profissao?.descricao || 'Não informada'}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link to="/atendimentos" className="text-xs text-ceamAzul hover:underline font-semibold">
                        + Atendimento
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
