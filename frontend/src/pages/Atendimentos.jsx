import React, { useState, useEffect } from 'react';
import { listarAtendimentos, cadastrarAtendimento, listarMulheres } from '../services/api';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Atendimentos() {
  const [atendimentos, setAtendimentos] = useState([]);
  const [mulheres, setMulheres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');

  const [form, setForm] = useState({
    mulherId: '',
    tipoAtendimento: 'Psicológico',
    relatoVitima: '',
    providenciasTomadas: '',
  });

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [atendRes, mulhRes] = await Promise.all([
        listarAtendimentos(),
        listarMulheres(),
      ]);
      setAtendimentos(atendRes);
      setMulheres(mulhRes);
      if (mulhRes.length > 0 && !form.mulherId) {
        setForm((prev) => ({ ...prev, mulherId: mulhRes[0].id }));
      }
    } catch (err) {
      console.error('Erro ao buscar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (!form.mulherId) {
      setErro('Selecione uma mulher para vincular ao atendimento.');
      return;
    }

    try {
      setSalvando(true);
      const novo = await cadastrarAtendimento({
        mulherId: form.mulherId,
        tipoAtendimento: form.tipoAtendimento,
        relatoVitima: form.relatoVitima.trim() || null,
        providenciasTomadas: form.providenciasTomadas.trim() || null,
      });

      setSucesso(`Atendimento registrado com sucesso! Protocolo: ${novo.protocolo}`);
      setModalAberto(false);
      setForm({
        mulherId: mulheres.length > 0 ? mulheres[0].id : '',
        tipoAtendimento: 'Psicológico',
        relatoVitima: '',
        providenciasTomadas: '',
      });
      carregarDados();
    } catch (err) {
      console.error('Erro ao salvar atendimento:', err);
      setErro(err.response?.data?.message || 'Falha ao registrar atendimento no servidor.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Topo com Título e Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ceamAzulEscuro">Registro de Atendimentos</h1>
          <p className="text-sm text-gray-600">
            Acolhimentos psicossociais, jurídicos e intervenções multidisciplinares • CEAM
          </p>
        </div>
        <Button variant="primary" onClick={() => setModalAberto(true)} className="shadow">
          + Novo Registro de Atendimento
        </Button>
      </div>

      {/* Alerta de Sucesso */}
      {sucesso && (
        <div className="p-4 bg-emerald-50 border-l-4 border-ceamVerde text-emerald-800 rounded-lg text-sm flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-ceamVerde mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>{sucesso}</span>
          </div>
          <button onClick={() => setSucesso('')} className="text-emerald-700 font-bold ml-4">
            ×
          </button>
        </div>
      )}

      {/* Alerta de Erro */}
      {erro && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg text-sm flex items-center justify-between">
          <span>{erro}</span>
          <button onClick={() => setErro('')} className="text-red-700 font-bold ml-4">
            ×
          </button>
        </div>
      )}

      {/* Card da Tabela de Atendimentos */}
      <Card
        title="Histórico de Atendimentos Realizados"
        subtitle={`Total de ${atendimentos.length} atendimentos registrados no prontuário`}
      >
        {loading ? (
          <div className="py-12 text-center text-gray-500 flex flex-col items-center">
            <div className="w-8 h-8 border-4 border-ceamLilas border-t-transparent rounded-full animate-spin mb-2" />
            <p className="text-sm font-medium text-ceamAzulEscuro">Carregando atendimentos do PostgreSQL...</p>
          </div>
        ) : atendimentos.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <p className="text-base font-semibold text-ceamAzulEscuro">Nenhum atendimento registrado ainda</p>
            <p className="text-xs text-gray-500 mt-1">Clique no botão acima para registrar o primeiro atendimento.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-ceamAzulEscuro">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase font-semibold text-gray-600">
                <tr>
                  <th className="py-3 px-4">Protocolo</th>
                  <th className="py-3 px-4">Usuária</th>
                  <th className="py-3 px-4">Tipo de Acolhimento</th>
                  <th className="py-3 px-4">Data</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Relato / Providências</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {atendimentos.map((atend) => (
                  <tr key={atend.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-ceamLilas">
                      {atend.protocolo}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {atend.mulher?.nome || 'Usuária não identificada'}
                      {atend.mulher?.cpf && (
                        <span className="block text-xs font-mono text-gray-400">{atend.mulher.cpf}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        atend.tipoAtendimento === 'Psicológico' ? 'bg-purple-100 text-ceamLilas' :
                        atend.tipoAtendimento === 'Social' ? 'bg-blue-100 text-ceamAzul' :
                        'bg-teal-100 text-ceamVerde'
                      }`}>
                        {atend.tipoAtendimento || 'Social'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">
                      {atend.dataAtendimento ? atend.dataAtendimento.slice(0, 10) : 'Hoje'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        atend.status === 'EM_ACOMPANHAMENTO' ? 'bg-purple-100 text-ceamLilas' :
                        atend.status === 'ABERTO' ? 'bg-blue-100 text-ceamAzul' :
                        'bg-emerald-100 text-ceamVerde'
                      }`}>
                        {atend.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-600 max-w-xs truncate" title={atend.relatoVitima}>
                      {atend.relatoVitima || atend.providenciasTomadas || 'Sem relato registrado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Modal de Novo Atendimento */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setModalAberto(false)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-10 border-t-4 border-ceamLilas max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-ceamAzulEscuro">
                Registrar Novo Episódio de Atendimento
              </h3>
              <button
                onClick={() => setModalAberto(false)}
                className="text-gray-400 hover:text-gray-600 font-bold text-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                  Selecione a Mulher Atendida <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.mulherId}
                  onChange={(e) => setForm({ ...form, mulherId: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-ceamAzulEscuro focus:outline-none focus:ring-2 focus:ring-ceamLilas bg-white"
                  required
                >
                  <option value="">Selecione uma mulher...</option>
                  {mulheres.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nome} (CPF: {m.cpf})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                  Tipo de Atendimento / Acolhimento <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.tipoAtendimento}
                  onChange={(e) => setForm({ ...form, tipoAtendimento: e.target.value })}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-ceamAzulEscuro focus:outline-none focus:ring-2 focus:ring-ceamLilas bg-white"
                >
                  <option value="Psicológico">Psicológico (Acolhimento Emocional)</option>
                  <option value="Social">Social (Assistência e Direitos Sociais)</option>
                  <option value="Jurídico">Jurídico (Orientação e Medidas Protetivas)</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                  Relato da Usuária (Sigiloso)
                </label>
                <textarea
                  rows="3"
                  value={form.relatoVitima}
                  onChange={(e) => setForm({ ...form, relatoVitima: e.target.value })}
                  placeholder="Descreva detalhadamente o relato apresentado durante a escuta qualificada..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-ceamAzulEscuro focus:outline-none focus:ring-2 focus:ring-ceamLilas"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                  Providências e Encaminhamentos
                </label>
                <textarea
                  rows="2"
                  value={form.providenciasTomadas}
                  onChange={(e) => setForm({ ...form, providenciasTomadas: e.target.value })}
                  placeholder="Orientações prestadas, encaminhamento para delegacia, CRAS ou outros órgãos..."
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-ceamAzulEscuro focus:outline-none focus:ring-2 focus:ring-ceamLilas"
                />
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <Button variant="secondary" onClick={() => setModalAberto(false)} disabled={salvando}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" disabled={salvando}>
                  {salvando ? 'Salvando...' : 'Salvar Atendimento'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
