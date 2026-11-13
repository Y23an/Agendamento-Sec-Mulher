import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

export default function Configuracoes() {
  const dominios = [
    { nome: 'Bairros', endpoint: '/api/v1/dominios/bairros', count: '28 itens' },
    { nome: 'Profissões', endpoint: '/api/v1/dominios/profissoes', count: '14 itens' },
    { nome: 'Tipos de Violência', endpoint: '/api/v1/dominios/tipos-violencia', count: '8 itens' },
    { nome: 'Vínculos com Agressor', endpoint: '/api/v1/dominios/vinculos-agressor', count: '7 itens' },
    { nome: 'Órgãos de Encaminhamento', endpoint: '/api/v1/dominios/orgaos-encaminhamento', count: '10 itens' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ceamAzulEscuro">Tabelas de Domínio Dinâmicas</h2>
          <p className="text-sm text-gray-500">Configuração de parâmetros dinâmicos sem alteração no código-fonte</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dominios.map((dom, idx) => (
          <Card key={idx} title={dom.nome} subtitle={`Gerenciamento via API: ${dom.endpoint}`}>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-purple-50 text-ceamLilas rounded-full border border-purple-200">
                {dom.count}
              </span>
              <Button variant="secondary" className="text-xs py-1 px-3">
                Gerenciar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
