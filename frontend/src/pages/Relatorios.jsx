import React, { useState, useEffect } from 'react';
import { obterMetricasRelatorio } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Relatorios() {
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregarMetricas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obterMetricasRelatorio();
      setMetricas(data);
    } catch (err) {
      console.error('Erro ao carregar métricas:', err);
      setError('Falha ao obter dados de relatórios do servidor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMetricas();
  }, []);

  const totalAtendimentos = metricas?.totalAtendimentos || 0;
  const totalMulheres = metricas?.totalMulheres || 0;

  // Tipos com cores oficiais da identidade visual
  const tiposInfo = [
    { nome: 'Psicológico', cor: 'bg-ceamLilas', texto: 'text-ceamLilas', bgLight: 'bg-purple-50' },
    { nome: 'Social', cor: 'bg-ceamAzul', texto: 'text-ceamAzul', bgLight: 'bg-blue-50' },
    { nome: 'Jurídico', cor: 'bg-ceamVerde', texto: 'text-ceamVerde', bgLight: 'bg-teal-50' },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ceamAzulEscuro">
            Relatórios e Métricas de Gestão
          </h1>
          <p className="text-sm text-gray-600">
            Indicadores quantitativos de acolhimento e monitoramento • CEAM Serra Talhada - PE
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handlePrint} className="text-xs py-2 px-3">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir Relatório
          </Button>
          <Button variant="primary" onClick={carregarMetricas} className="text-xs py-2 px-3">
            Atualizar Dados
          </Button>
        </div>
      </div>

      {/* Estados de Carregamento e Erro */}
      {loading ? (
        <div className="py-16 text-center text-gray-500 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm border-t-4 border-ceamLilas">
          <div className="w-10 h-10 border-4 border-ceamLilas border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-base font-bold text-ceamAzulEscuro">Consolidando métricas do banco de dados...</p>
          <p className="text-xs text-gray-500 mt-1">Calculando totais e agrupamentos em tempo real</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-50 text-red-700 rounded-lg text-sm border-l-4 border-red-500 flex items-center justify-between">
          <span>{error}</span>
          <Button variant="secondary" onClick={carregarMetricas} className="text-xs py-1 px-3">
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          {/* Grid de Métricas Principais (Cards de Destaque) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-ceamLilas flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Mulheres Atendidas</p>
                <p className="text-4xl font-extrabold text-ceamAzulEscuro mt-2">{totalMulheres}</p>
              </div>
              <p className="text-xs font-medium text-ceamLilas mt-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-ceamLilas mr-1.5" />
                Cadastros Únicos no Sistema
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-ceamAzul flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total de Atendimentos</p>
                <p className="text-4xl font-extrabold text-ceamAzulEscuro mt-2">{totalAtendimentos}</p>
              </div>
              <p className="text-xs font-medium text-ceamAzul mt-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-ceamAzul mr-1.5" />
                Sessões e Intervenções Realizadas
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-purple-500 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Em Acompanhamento</p>
                <p className="text-4xl font-extrabold text-purple-700 mt-2">{metricas?.totalEmAcompanhamento || 0}</p>
              </div>
              <p className="text-xs font-medium text-purple-600 mt-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-purple-500 mr-1.5" />
                Casos Ativos e Continuados
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-ceamVerde flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Casos Concluídos</p>
                <p className="text-4xl font-extrabold text-teal-800 mt-2">{metricas?.totalEncerrados || 0}</p>
              </div>
              <p className="text-xs font-medium text-ceamVerde mt-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-ceamVerde mr-1.5" />
                Encerrados com Resolução
              </p>
            </div>
          </div>

          {/* Gráficos e Distribuições Visuais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Atendimentos Agrupados por Tipo */}
            <Card
              title="Atendimentos por Tipo de Serviço"
              subtitle="Distribuição entre Psicologia, Serviço Social e Assistência Jurídica"
            >
              <div className="space-y-5 pt-2">
                {tiposInfo.map((tipo) => {
                  const qtd = metricas?.atendimentosPorTipo?.[tipo.nome] || 0;
                  const pct = totalAtendimentos > 0 ? Math.round((qtd / totalAtendimentos) * 100) : 0;

                  return (
                    <div key={tipo.nome} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-ceamAzulEscuro flex items-center">
                          <span className={`w-3 h-3 rounded-full ${tipo.cor} mr-2`} />
                          {tipo.nome}
                        </span>
                        <div className="text-right">
                          <span className="font-extrabold text-ceamAzulEscuro">{qtd}</span>
                          <span className="text-xs text-gray-500 ml-1.5">({pct}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${tipo.cor} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                <span>Fonte: Banco de Dados CEAM</span>
                <span className="font-semibold text-ceamAzulEscuro">Total: {totalAtendimentos} acolhimentos</span>
              </div>
            </Card>

            {/* Atendimentos por Status Operacional */}
            <Card
              title="Status Operacional dos Atendimentos"
              subtitle="Situação atual dos processos de acompanhamento"
            >
              <div className="space-y-4 pt-2">
                {[
                  { key: 'ABERTO', label: 'Abertos (Aguardando Triagem/Encaminhamento)', cor: 'bg-blue-500', text: 'text-blue-700' },
                  { key: 'EM_ACOMPANHAMENTO', label: 'Em Acompanhamento Ativo', cor: 'bg-ceamLilas', text: 'text-ceamLilas' },
                  { key: 'ENCERRADO', label: 'Encerrados / Resolvidos', cor: 'bg-ceamVerde', text: 'text-ceamVerde' },
                ].map((st) => {
                  const qtd = metricas?.atendimentosPorStatus?.[st.key] || 0;
                  const pct = totalAtendimentos > 0 ? Math.round((qtd / totalAtendimentos) * 100) : 0;

                  return (
                    <div key={st.key} className="p-3.5 rounded-lg bg-gray-50 border border-gray-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-ceamAzulEscuro">{st.label}</span>
                        <span className="font-mono font-bold text-sm text-ceamAzulEscuro">{qtd}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${st.cor} transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Mapeamento Territorial por Bairro */}
          <Card
            title="Mapeamento Territorial por Bairro de Serra Talhada"
            subtitle="Concentração de atendimentos conforme a residência das usuárias"
          >
            {metricas?.atendimentosPorBairro && Object.keys(metricas.atendimentosPorBairro).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {Object.entries(metricas.atendimentosPorBairro).map(([bairro, qtd]) => {
                  const pct = totalAtendimentos > 0 ? Math.round((qtd / totalAtendimentos) * 100) : 0;
                  return (
                    <div
                      key={bairro}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-ceamLilas transition-colors"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-ceamAzulEscuro">{bairro}</span>
                        <span className="text-xs font-mono font-bold text-ceamLilas">{qtd} casos</span>
                      </div>
                      <p className="text-[11px] text-gray-500 mb-2">Serra Talhada - PE</p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-ceamLilas h-1.5 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">
                Nenhum atendimento associado a bairro específico ainda.
              </p>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
