import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cadastrarMulher, listarBairros, listarProfissoes } from '../services/api';
import { maskCpf, maskPhone } from '../utils/masks';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

export default function CadastroMulher() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    dataNascimento: '',
    telefone: '',
    enderecoLogradouro: '',
    numero: '',
    bairroId: '',
    profissaoId: '',
  });

  const [bairros, setBairros] = useState([]);
  const [profissoes, setProfissoes] = useState([]);
  const [loadingDominios, setLoadingDominios] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    async function carregarDados() {
      try {
        setLoadingDominios(true);
        const [bairrosRes, profissoesRes] = await Promise.all([
          listarBairros(),
          listarProfissoes(),
        ]);
        setBairros(bairrosRes);
        setProfissoes(profissoesRes);

        // Define o primeiro bairro e profissão como padrão se existirem
        if (bairrosRes.length > 0) {
          setFormData((prev) => ({ ...prev, bairroId: bairrosRes[0].id.toString() }));
        }
        if (profissoesRes.length > 0) {
          setFormData((prev) => ({ ...prev, profissaoId: profissoesRes[0].id.toString() }));
        }
      } catch (err) {
        console.error('Erro ao carregar dados de domínio:', err);
        setErrorMessage('Não foi possível carregar as listas de bairros e profissões do servidor.');
      } finally {
        setLoadingDominios(false);
      }
    }
    carregarDados();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === 'cpf') {
      finalValue = maskCpf(value);
    } else if (name === 'telefone') {
      finalValue = maskPhone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setFieldErrors({});

    if (!formData.nome.trim()) {
      setFieldErrors((prev) => ({ ...prev, nome: 'Nome completo é obrigatório' }));
      return;
    }
    if (!formData.cpf.trim()) {
      setFieldErrors((prev) => ({ ...prev, cpf: 'CPF é obrigatório' }));
      return;
    }
    if (!formData.bairroId) {
      setFieldErrors((prev) => ({ ...prev, bairroId: 'Selecione um bairro' }));
      return;
    }
    if (!formData.profissaoId) {
      setFieldErrors((prev) => ({ ...prev, profissaoId: 'Selecione uma profissão' }));
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        nome: formData.nome.trim(),
        cpf: formData.cpf.trim(),
        rg: formData.rg.trim() || null,
        dataNascimento: formData.dataNascimento || null,
        telefone: formData.telefone.trim() || null,
        enderecoLogradouro: formData.enderecoLogradouro.trim() || null,
        numero: formData.numero.trim() || null,
        bairroId: Number(formData.bairroId),
        profissaoId: Number(formData.profissaoId),
      };

      const novaMulher = await cadastrarMulher(payload);
      setSuccessData(novaMulher);
    } catch (err) {
      console.error('Erro ao cadastrar mulher:', err);
      if (err.response?.status === 422) {
        setErrorMessage(err.response.data?.message || 'CPF já cadastrado no sistema.');
      } else if (err.response?.status === 400 && err.response.data) {
        setFieldErrors(err.response.data);
        setErrorMessage('Por favor, verifique os campos destacados em vermelho.');
      } else {
        setErrorMessage(err.response?.data?.message || 'Erro ao comunicar com o servidor.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessData(null);
    setFormData({
      nome: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
      telefone: '',
      enderecoLogradouro: '',
      numero: '',
      bairroId: bairros.length > 0 ? bairros[0].id.toString() : '',
      profissaoId: profissoes.length > 0 ? profissoes[0].id.toString() : '',
    });
    setErrorMessage('');
    setFieldErrors({});
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho da Página */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/usuarias" className="text-sm font-semibold text-ceamLilas hover:underline flex items-center">
              ← Voltar para Usuárias
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-ceamAzulEscuro mt-1">
            Cadastro de Usuária (Mulher Atendida)
          </h1>
          <p className="text-sm text-gray-600">
            Acolhimento humanizado e registro no banco de dados do CEAM • Serra Talhada - PE
          </p>
        </div>
      </div>

      {/* Alerta de Sucesso */}
      {successData && (
        <div className="bg-emerald-50 border-l-4 border-ceamVerde p-6 rounded-lg shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-ceamVerde mr-3 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-ceamAzulEscuro">
                  Usuária Cadastrada com Sucesso!
                </h3>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>{successData.nome}</strong> (CPF: <span className="font-mono">{successData.cpf}</span>) foi salva no banco de dados.
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  ID do Registro: <span className="font-mono">{successData.id}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button variant="success" onClick={handleReset} className="text-xs py-1.5 px-3">
              + Cadastrar Outra Usuária
            </Button>
            <Link to="/usuarias">
              <Button variant="secondary" className="text-xs py-1.5 px-3">
                Ver Lista de Usuárias
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Alerta de Erro Geral */}
      {errorMessage && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg text-sm text-red-700 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-red-500 hover:text-red-700 font-bold ml-4">
            ×
          </button>
        </div>
      )}

      {/* Formulário Principal */}
      <form onSubmit={handleSubmit}>
        <Card
          title="Ficha Cadastral e Dados Socioeconômicos"
          subtitle="Os campos sinalizados com (*) são obrigatórios para a abertura do prontuário"
        >
          {loadingDominios ? (
            <div className="py-12 text-center text-gray-500 flex flex-col items-center">
              <div className="w-8 h-8 border-4 border-ceamLilas border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-sm font-medium text-ceamAzulEscuro">Carregando tabelas dinâmicas do CEAM...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Seção 1: Dados Pessoais */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ceamLilas pb-2 border-b border-gray-100 mb-4">
                  1. Identificação Pessoal da Mulher
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Input
                      label="Nome Completo"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Ex: Maria das Graças Silva"
                      required
                      error={fieldErrors.nome}
                    />
                  </div>

                  <div>
                    <Input
                      label="CPF (apenas números ou formatado)"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                      placeholder="000.000.000-00"
                      required
                      error={fieldErrors.cpf}
                      helperText="Obrigatório para controle de reincidência e prontuário único"
                    />
                  </div>

                  <div>
                    <Input
                      label="RG (Documento de Identidade)"
                      name="rg"
                      value={formData.rg}
                      onChange={handleChange}
                      placeholder="Ex: 1.234.567 SDS/PE"
                      error={fieldErrors.rg}
                    />
                  </div>

                  <div>
                    <Input
                      label="Data de Nascimento"
                      type="date"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      error={fieldErrors.dataNascimento}
                    />
                  </div>

                  <div>
                    <Input
                      label="Telefone / WhatsApp para Contato Seguro"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      placeholder="(87) 99999-9999"
                      error={fieldErrors.telefone}
                    />
                  </div>
                </div>
              </div>

              {/* Seção 2: Localização e Residência */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ceamLilas pb-2 border-b border-gray-100 mb-4">
                  2. Localização e Residência
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                      Estado (Referência)
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Pernambuco (PE)"
                      className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                      Município (Referência)
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Serra Talhada"
                      className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-600 text-sm cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                      Bairro em Serra Talhada <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="bairroId"
                      value={formData.bairroId}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-ceamAzulEscuro bg-white focus:outline-none focus:ring-2 focus:ring-ceamLilas focus:border-transparent text-sm"
                    >
                      {bairros.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.descricao}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.bairroId && (
                      <p className="text-xs text-red-600 mt-1">{fieldErrors.bairroId}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Input
                      label="Endereço (Rua, Avenida, Sítio ou Comunidade)"
                      name="enderecoLogradouro"
                      value={formData.enderecoLogradouro}
                      onChange={handleChange}
                      placeholder="Ex: Rua Agostinho Nunes de Magalhães"
                      error={fieldErrors.enderecoLogradouro}
                    />
                  </div>

                  <div>
                    <Input
                      label="Número ou Complemento"
                      name="numero"
                      value={formData.numero}
                      onChange={handleChange}
                      placeholder="Ex: 120 ou S/N"
                      error={fieldErrors.numero}
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Dados Socioeconômicos */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ceamLilas pb-2 border-b border-gray-100 mb-4">
                  3. Ocupação e Renda
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-ceamAzulEscuro mb-1 block">
                      Profissão / Ocupação Principal <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="profissaoId"
                      value={formData.profissaoId}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2 text-ceamAzulEscuro bg-white focus:outline-none focus:ring-2 focus:ring-ceamLilas focus:border-transparent text-sm"
                    >
                      {profissoes.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.descricao}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.profissaoId && (
                      <p className="text-xs text-red-600 mt-1">{fieldErrors.profissaoId}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => navigate('/usuarias')}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={submitting}
                  className="px-6 py-2.5 shadow"
                >
                  {submitting ? 'Salvando no Banco...' : 'Salvar Cadastro'}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </form>
    </div>
  );
}
