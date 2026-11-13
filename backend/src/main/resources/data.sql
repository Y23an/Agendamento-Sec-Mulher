-- Ajuste de compatibilidade caso a coluna usuario_id tenha constraint not null prévia
ALTER TABLE IF EXISTS atendimentos ALTER COLUMN usuario_id DROP NOT NULL;

-- Usuário Padrão do Sistema
INSERT INTO usuarios (id, nome, email, senha, role, ativo)
VALUES ('00000000-0000-0000-0000-000000000001', 'Atendente CEAM', 'atendente@ceam.serratalhada.pe.gov.br', '123456', 'ATENDENTE', true)
ON CONFLICT (email) DO NOTHING;

-- Bairros de Serra Talhada
INSERT INTO bairros (descricao, ativo) SELECT 'Centro', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Centro');
INSERT INTO bairros (descricao, ativo) SELECT 'Bom Jesus', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Bom Jesus');
INSERT INTO bairros (descricao, ativo) SELECT 'Cohab', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Cohab');
INSERT INTO bairros (descricao, ativo) SELECT 'Várzea', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Várzea');
INSERT INTO bairros (descricao, ativo) SELECT 'Caxixola', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Caxixola');
INSERT INTO bairros (descricao, ativo) SELECT 'Ipsep', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Ipsep');
INSERT INTO bairros (descricao, ativo) SELECT 'Vila Bela', true WHERE NOT EXISTS (SELECT 1 FROM bairros WHERE descricao = 'Vila Bela');

-- Profissões
INSERT INTO profissaos (descricao, ativo) SELECT 'Agricultora', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Agricultora');
INSERT INTO profissaos (descricao, ativo) SELECT 'Do Lar', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Do Lar');
INSERT INTO profissaos (descricao, ativo) SELECT 'Autônoma', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Autônoma');
INSERT INTO profissaos (descricao, ativo) SELECT 'Estudante', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Estudante');
INSERT INTO profissaos (descricao, ativo) SELECT 'Professora', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Professora');
INSERT INTO profissaos (descricao, ativo) SELECT 'Comerciária', true WHERE NOT EXISTS (SELECT 1 FROM profissaos WHERE descricao = 'Comerciária');

-- Tipos de Violência
INSERT INTO tipo_violencias (descricao, ativo) SELECT 'Violência Física', true WHERE NOT EXISTS (SELECT 1 FROM tipo_violencias WHERE descricao = 'Violência Física');
INSERT INTO tipo_violencias (descricao, ativo) SELECT 'Violência Psicológica', true WHERE NOT EXISTS (SELECT 1 FROM tipo_violencias WHERE descricao = 'Violência Psicológica');
INSERT INTO tipo_violencias (descricao, ativo) SELECT 'Violência Patrimonial', true WHERE NOT EXISTS (SELECT 1 FROM tipo_violencias WHERE descricao = 'Violência Patrimonial');
INSERT INTO tipo_violencias (descricao, ativo) SELECT 'Violência Moral', true WHERE NOT EXISTS (SELECT 1 FROM tipo_violencias WHERE descricao = 'Violência Moral');
INSERT INTO tipo_violencias (descricao, ativo) SELECT 'Violência Sexual', true WHERE NOT EXISTS (SELECT 1 FROM tipo_violencias WHERE descricao = 'Violência Sexual');

-- Vínculos com o Agressor
INSERT INTO vinculo_agressors (descricao, ativo) SELECT 'Cônjuge / Companheiro', true WHERE NOT EXISTS (SELECT 1 FROM vinculo_agressors WHERE descricao = 'Cônjuge / Companheiro');
INSERT INTO vinculo_agressors (descricao, ativo) SELECT 'Ex-companheiro / Ex-namorado', true WHERE NOT EXISTS (SELECT 1 FROM vinculo_agressors WHERE descricao = 'Ex-companheiro / Ex-namorado');
INSERT INTO vinculo_agressors (descricao, ativo) SELECT 'Familiar / Parente', true WHERE NOT EXISTS (SELECT 1 FROM vinculo_agressors WHERE descricao = 'Familiar / Parente');
INSERT INTO vinculo_agressors (descricao, ativo) SELECT 'Vizinho / Conhecido', true WHERE NOT EXISTS (SELECT 1 FROM vinculo_agressors WHERE descricao = 'Vizinho / Conhecido');

-- Mulheres Fictícias para Demonstração e Métricas
INSERT INTO mulheres (id, nome, cpf, rg, data_nascimento, telefone, endereco_logradouro, numero, bairro_id, profissao_id, data_cadastro, atualizado_em)
VALUES 
  ('11111111-1111-1111-1111-111111111101', 'Maria Aparecida da Silva', '11144477735', '1234567 SDS/PE', '1985-05-15', '(87) 99999-8888', 'Rua Enock Ignácio de Oliveira', '100', 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO mulheres (id, nome, cpf, rg, data_nascimento, telefone, endereco_logradouro, numero, bairro_id, profissao_id, data_cadastro, atualizado_em)
VALUES 
  ('11111111-1111-1111-1111-111111111102', 'Ana Lúcia Santos Ferreira', '52998224725', '2345678 SDS/PE', '1992-08-20', '(87) 98888-7777', 'Avenida Afonso Magalhães', '250', 2, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO mulheres (id, nome, cpf, rg, data_nascimento, telefone, endereco_logradouro, numero, bairro_id, profissao_id, data_cadastro, atualizado_em)
VALUES 
  ('11111111-1111-1111-1111-111111111103', 'Francisca Pereira de Lima', '70415392070', '3456789 SDS/PE', '1978-02-10', '(87) 97777-6666', 'Rua Joaquim Conrado', '45', 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO mulheres (id, nome, cpf, rg, data_nascimento, telefone, endereco_logradouro, numero, bairro_id, profissao_id, data_cadastro, atualizado_em)
VALUES 
  ('11111111-1111-1111-1111-111111111104', 'Cláudia Rodrigues Oliveira', '85493218080', '4567890 SDS/PE', '2001-11-28', '(87) 99111-2222', 'Rua Manoel Pereira Lins', '502', 4, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (cpf) DO NOTHING;

INSERT INTO mulheres (id, nome, cpf, rg, data_nascimento, telefone, endereco_logradouro, numero, bairro_id, profissao_id, data_cadastro, atualizado_em)
VALUES 
  ('11111111-1111-1111-1111-111111111105', 'Juliana Bezerra Costa', '01234567890', '5678901 SDS/PE', '1989-07-04', '(87) 99333-4444', 'Rua Agostinho Nunes', '78', 5, 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (cpf) DO NOTHING;

-- Atendimentos Fictícios com Associação Dinâmica pelo CPF da Mulher
INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222201',
  '2026-000001',
  CURRENT_TIMESTAMP - INTERVAL '10 days',
  'Usuária relatou ameaças constantes e violência psicológica.',
  'Acolhimento psicológico realizado e orientações jurídicas.',
  'EM_ACOMPANHAMENTO',
  'Psicológico',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '11144477735' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222202',
  '2026-000002',
  CURRENT_TIMESTAMP - INTERVAL '8 days',
  'Necessidade de inclusão em programas sociais municipais.',
  'Encaminhada ao CRAS e atualização do CadÚnico.',
  'ABERTO',
  'Social',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '52998224725' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222203',
  '2026-000003',
  CURRENT_TIMESTAMP - INTERVAL '6 days',
  'Solicitação de medidas protetivas de urgência.',
  'Ofício encaminhado à Delegacia da Mulher e Vara Única.',
  'ENCERRADO',
  'Jurídico',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '70415392070' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222204',
  '2026-000004',
  CURRENT_TIMESTAMP - INTERVAL '4 days',
  'Sessão de escuta qualificada e suporte emocional continuado.',
  'Acompanhamento psicológico quinzenal agendado.',
  'EM_ACOMPANHAMENTO',
  'Psicológico',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '85493218080' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222205',
  '2026-000005',
  CURRENT_TIMESTAMP - INTERVAL '3 days',
  'Visita domiciliar da equipe técnica multidisciplinar.',
  'Relatório social emitido e encaminhamento à Secretaria da Mulher.',
  'EM_ACOMPANHAMENTO',
  'Social',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '01234567890' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;

INSERT INTO atendimentos (id, protocolo, data_atendimento, relato_vitima, providencias_tomadas, status, tipo_atendimento, mulher_id, usuario_id)
SELECT 
  '22222222-2222-2222-2222-222222222206',
  '2026-000006',
  CURRENT_TIMESTAMP - INTERVAL '1 days',
  'Acompanhamento de processo de guarda e pensão alimentícia.',
  'Assistência jurídica inicial prestada pelo CEAM.',
  'ABERTO',
  'Jurídico',
  id,
  '00000000-0000-0000-0000-000000000001'
FROM mulheres WHERE cpf = '11144477735' LIMIT 1
ON CONFLICT (protocolo) DO NOTHING;
