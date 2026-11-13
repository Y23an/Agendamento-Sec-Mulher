import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obterMetricasRelatorio, listarBairros } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Dashboard() {
  const [bairros, setBairros] = useState([]);
  const [metricas, setMetricas] = useState(null);
  const [loadingBairros, setLoadingBairros] = useState(true);
  const [errorBairros, setErrorBairros] = useState(null);

  const carregarBairros = async () => {
    setLoadingBairros(true);
    setErrorBairros(null);
    try {
      const data = await listarBairros();
      setBairros(data);
    } catch (err) {
      console.error('Erro ao conectar com API:', err);
      setErrorBairros(err.response?.data?.message || err.message || 'Falha ao conectar com o Backend');
    } finally {
      setLoadingBairros(false);
    }
  };

  const carregarDados = async () => {
    setLoadingBairros(true);
    setErrorBairros(null);
    try {
      const [bairrosData, metricasRes] = await Promise.all([
        listarBairros(),
        obterMetricasRelatorio().catch(() => null),
      ]);
      setBairros(bairrosData);
      if (metricasRes) setMetricas(metricasRes);
    } catch (err) {
      console.error('Erro ao conectar com API:', err);
      setErrorBairros(err.response?.data?.message || err.message || 'Falha ao conectar com o Backend');
    } finally {
      setLoadingBairros(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const stats = [
    {
      label: 'Mulheres Atendidas',
      value: metricas ? metricas.totalMulheres.toString() : '...',
      detail: 'Cadastradas no BD',
      color: 'border-ceamLilas',
    },
    {
      label: 'Atendimentos Realizados',
      value: metricas ? metricas.totalAtendimentos.toString() : '...',
      detail: 'Sessões registradas',
      color: 'border-ceamAzul',
    },
    {
      label: 'Em Acompanhamento',
      value: metricas ? metricas.totalEmAcompanhamento.toString() : '...',
      detail: 'Casos ativos no CEAM',
      color: 'border-ceamVerde',
    },
    {
      label: 'Bairros Ativos no BD',
      value: loadingBairros ? '...' : bairros.length.toString(),
      detail: 'Serra Talhada - PE (API)',
      color: 'border-purple-400',
    },
  ];

  const atendimentosRecentes = [
    { protocolo: '2026-000142', mulher: 'M. S. C. (Iniciais)', bairro: 'Bom Jesus', data: '04/11/2026', status: 'EM_ACOMPANHAMENTO' },
    { protocolo: '2026-000141', mulher: 'A. P. L. (Iniciais)', bairro: 'Cohab', data: '03/11/2026', status: 'ABERTO' },
    { protocolo: '2026-000140', mulher: 'F. R. S. (Iniciais)', bairro: 'Várzea', data: '03/11/2026', status: 'ENCERRADO' },
    { protocolo: '2026-000139', mulher: 'C. M. O. (Iniciais)', bairro: 'Caxixola', data: '02/11/2026', status: 'EM_ACOMPANHAMENTO' },
  ];

  return (
    <div className="space-y-6">
      {/* Banner de Boas-Vindas e Ação Rápida */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-lg shadow-sm border-l-4 border-ceamLilas">
        <div>
          <h2 className="text-xl font-bold text-ceamAzulEscuro">Painel de Monitoramento e Acolhimento</h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Centro Especializado de Atendimento à Mulher • Secretaria Municipal da Mulher
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/usuarias/nova">
            <Button variant="primary">
              + Cadastrar Mulher
            </Button>
          </Link>
          <Link to="/atendimentos">
            <Button variant="secondary">
              + Atendimentos
            </Button>
          </Link>
          <Link to="/relatorios">
            <Button variant="secondary">
              Relatórios e Métricas
            </Button>
          </Link>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-white p-5 rounded-lg shadow-sm border-t-4 ${stat.color}`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{stat.label}</p>
            <p className="text-3xl font-extrabold text-ceamAzulEscuro mt-2">{stat.value}</p>
            <p className="text-xs font-medium text-ceamVerde mt-1">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Seção de Integração com o Backend: Lista de Bairros Dinâmicos */}
      <Card
        title="Bairros de Serra Talhada (Integração Backend Spring Boot ↔ React)"
        subtitle="Dados carregados dinamicamente via GET /api/v1/dominios/bairros (PostgreSQL)"
      >
        {loadingBairros ? (
          <div className="py-8 text-center text-gray-500 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-4 border-ceamLilas border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm font-medium text-ceamAzulEscuro">Consultando tabela de bairros no PostgreSQL...</p>
          </div>
        ) : errorBairros ? (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded text-sm text-red-700 flex items-center justify-between">
            <div>
              <p className="font-bold">Não foi possível carregar os bairros:</p>
              <p className="text-xs mt-1">{errorBairros}</p>
            </div>
            <Button variant="secondary" onClick={carregarBairros} className="text-xs py-1 px-3">
              Tentar Novamente
            </Button>
          </div>
        ) : bairros.length === 0 ? (
          <div className="p-4 bg-gray-50 text-center text-sm text-gray-500 rounded">
            Nenhum bairro cadastrado no momento.
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {bairros.map((bairro) => (
                <div
                  key={bairro.id}
                  className="bg-gray-50 hover:bg-purple-50/50 transition-colors p-3.5 rounded-lg border border-gray-200 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono text-gray-400">ID #{bairro.id}</span>
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-ceamVerde">
                      {bairro.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-ceamAzulEscuro truncate" title={bairro.descricao}>
                    {bairro.descricao}
                  </p>
                  <span className="text-[10px] text-gray-500 mt-1">Serra Talhada - PE</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center text-ceamVerde font-semibold">
                <span className="w-2 h-2 rounded-full bg-ceamVerde mr-1.5 animate-pulse" />
                Conectado com sucesso à API REST
              </span>
              <button
                onClick={carregarBairros}
                className="text-ceamAzul font-medium hover:underline flex items-center"
              >
                Atualizar Dados
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Seção Principal de Conteúdo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Atendimentos Recentes */}
        <div className="lg:col-span-2">
          <Card title="Últimos Atendimentos Registrados" subtitle="Episódios acolhidos pela equipe multidisciplinar">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-ceamAzulEscuro">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-600">
                  <tr>
                    <th className="py-3 px-4">Protocolo</th>
                    <th className="py-3 px-4">Usuária</th>
                    <th className="py-3 px-4">Bairro</th>
                    <th className="py-3 px-4">Data</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {atendimentosRecentes.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-ceamLilas">{item.protocolo}</td>
                      <td className="py-3 px-4 font-medium">{item.mulher}</td>
                      <td className="py-3 px-4 text-gray-600">{item.bairro}</td>
                      <td className="py-3 px-4 text-gray-600">{item.data}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          item.status === 'EM_ACOMPANHAMENTO' ? 'bg-purple-100 text-ceamLilas' :
                          item.status === 'ABERTO' ? 'bg-blue-100 text-ceamAzul' :
                          'bg-emerald-100 text-ceamVerde'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Informações Institucionais do CEAM */}
        <div>
          <Card title="Rede de Apoio CEAM" subtitle="Diretrizes de Atendimento Integrado">
            <div className="space-y-4 text-sm text-gray-700">
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                <h4 className="font-bold text-ceamLilas text-xs uppercase mb-1">Sigilo e Privacidade</h4>
                <p className="text-xs text-gray-600">
                  Todos os dados de usuárias e relatos são protegidos pelo sigilo profissional da equipe do CEAM Serra Talhada.
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-bold text-ceamAzul text-xs uppercase mb-1">Equipe Multidisciplinar</h4>
                <p className="text-xs text-gray-600">
                  Acolhimento psicossocial, assistência jurídica e encaminhamentos para órgãos de proteção e segurança pública.
                </p>
              </div>

              <div className="p-3 bg-teal-50 rounded-lg border border-teal-100">
                <h4 className="font-bold text-ceamVerde text-xs uppercase mb-1">Localidade Padrão</h4>
                <p className="text-xs text-gray-600">
                  Município de referência: <strong>Serra Talhada - Pernambuco (PE)</strong>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
