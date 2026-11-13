# Modelo de Dados e Domínio - CEAM

O sistema é responsável por gerir o atendimento a mulheres vítimas de violência no CEAM e na Secretaria da Mulher. Baseia-se em duas entidades principais (Usuária e Atendimento) e nas suas respetivas tabelas de domínio com opções dinâmicas para permitir a gestão e evolução pelos administradores sem necessidade de alterar o código-fonte.

## 1. Entidades de Domínio (Configurações Dinâmicas)
Para permitir que o administrador altere as opções via interface (Frontend), o sistema possui as seguintes tabelas de domínio (CRUDs independentes no banco de dados):
* **Perfil da Usuária:** `EstadoCivil`, `RacaCor`, `Escolaridade`, `Profissao`, `RendaFamiliar`, `Bairro` (para gestão local dos bairros).
* **Dados do Atendimento:** `TipoViolencia`, `TipoEncaminhamento`, `Agressor`, `FormaIngresso`, `ProfissionalResponsavel`, `StatusMedidaProtetiva`
* **Regra de Implementação:** Estas entidades devem ter, no mínimo, os campos `id` (Long) e `descricao` (String). NUNCA devem ser implementadas como Enums fixos no Java.

## 2. Entidade: Usuaria (Cadastro da Mulher)
Armazena os dados pessoais e socioeconómicos da mulher atendida.
* **id:** (Long, Chave Primária)
* **dataCadastro:** (LocalDate)
* **cpf:** (String, Único, 11 dígitos)
* **nomeCompleto:** (String)
* **dataNascimento:** (LocalDate)
* **estadoCivil:** (Relacionamento ManyToOne com a entidade `EstadoCivil`)
* **racaCor:** (Relacionamento ManyToOne com a entidade `RacaCor`)
* **numeroFilhos:** (Integer)
* **escolaridade:** (Relacionamento ManyToOne com a entidade `Escolaridade`)
* **profissao:** (Relacionamento ManyToOne com a entidade `Profissao`)
* **trabalhando:** (Boolean)
* **rendaFamiliar:** (Relacionamento ManyToOne com a entidade `RendaFamiliar`)
* **bairro:** (Relacionamento ManyToOne com a entidade `Bairro`)
* **municipio:** (Relacionamento ManyToOne com a entidade `Municipio` - ver secção 4)

## 3. Entidade: Atendimento (Registo de Atendimento)
Registo de cada interação com a usuária. Possui um relacionamento Muitos-para-Um (vários atendimentos para uma mesma Usuária).
* **id:** (Long, Chave Primária)
* **dataAtendimento:** (LocalDate)
* **usuaria_id:** (Relacionamento ManyToOne com a entidade `Usuaria`)
* **tipoContato:** (String - 'PRESENCIAL' ou 'TELEFONEMA')
* **profissionalResponsavel:** (Relacionamento ManyToOne com a entidade `ProfissionalResponsavel`)
* **agressor:** (Relacionamento ManyToOne com a entidade `Agressor`)
* **fezBoletimOcorrencia:** (Boolean)
* **statusMedidaProtetiva:** (Relacionamento ManyToOne com a entidade `StatusMedidaProtetiva`)
* **formaIngresso:** (Relacionamento ManyToOne com a entidade `FormaIngresso`)
* **reincidencia:** (Boolean)
* **violenciaPrincipal:** (Relacionamento ManyToOne com a entidade `TipoViolencia`)
* **violenciasSecundarias:** (Relacionamento ManyToMany com a entidade `TipoViolencia`)
* **encaminhamentosRealizados:** (Relacionamento ManyToMany com a entidade `TipoEncaminhamento`)
* **observacao:** (Text)

## 4. Localidades (Estados e Municípios / IBGE)
* **Tabelas de Domínio Fixo:** O sistema deve possuir as entidades `Estado` e `Municipio` populadas via script SQL do Flyway (na migração inicial) contendo todos os estados e municípios do Brasil.
* **Relacionamento:** `Municipio` possui um relacionamento ManyToOne com `Estado`.
* **Regra de Interface (Frontend):** Nos formulários de cadastro e edição de utilizadoras, os campos de localidade devem vir sempre pré-preenchidos com Estado = "Pernambuco (PE)" e Município = "Serra Talhada". Isto agiliza o processo, permitindo no entanto a alteração manual por parte da atendente caso a mulher resida noutra cidade.