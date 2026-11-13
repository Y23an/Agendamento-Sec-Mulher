# Documento de Arquitetura - Sistema de Monitoramento CEAM

## 1. Visão Geral
O sistema é uma aplicação Full Stack desenvolvida para gerir os atendimentos do Centro Especializado de Atendimento à Mulher (CEAM) e da Secretaria da Mulher de Serra Talhada. A arquitetura baseia-se num monorepo orquestrado por Docker, com separação clara entre a API (Backend) e a Interface (Frontend).

## 2. Stack Tecnológica
* **Backend:** Java 17, Spring Boot 4.1.2 (construído com Gradle).
* **Banco de Dados:** PostgreSQL 15 (com migrações geridas via Flyway).
* **Frontend:** React, Vite, Tailwind CSS, React Router, Axios.
* **Infraestrutura:** Docker e Docker Compose (Multi-stage builds com Nginx para o Frontend e JRE Alpine para o Backend).
* **IA Local:** OpenCode (modelo `qwen2.5-coder:3b`) para geração de código e Ollama para consultoria arquitetural.

## 3. Estrutura do Monorepo
O repositório segue a seguinte organização de pastas na raiz (`agendamento-mulher/`):
* `/backend`: Código-fonte da API Spring Boot (`br.gov.pe.mulher.atendimento`).
* `/frontend`: Código-fonte da aplicação React (sem instalação local de NPM, gerido via contentores).
* `/docs`: Documentação centralizada (Arquitetura e Modelo de Negócio) para ancorar o contexto da IA.
* `docker-compose.yml`: Orquestração local dos três serviços (db, backend, frontend).

## 4. Padrões de Projeto e Domínio
* **Tabelas de Domínio Dinâmicas (Configurações):** Campos provenientes da aba "Configurações" (como Bairros, Municípios, Agressores, Profissões, Tipos de Violência e Encaminhamentos) **NUNCA** devem ser Enums fixos no Java.
* **Modelo Entidade-Relacionamento:** Devem ser criadas Entidades JPA independentes (ex: `Bairro`, `Profissao`, `Agressor`) com pelo menos `id` (Long) e `descricao` (String).
* **Endpoints de Admin:** O sistema deve ter CRUDs completos para cada uma destas entidades, permitindo que os Administradores adicionem ou desativem opções via interface, sem alterar o código fonte.
* **Segurança e CORS:** A política de origens (CORS) não deve estar chumbada no código. É lida a partir da variável de ambiente `CORS_ALLOWED_ORIGINS` injetada pelo Docker, permitindo implantação flexível no domínio `serratalhada.pe.gov.br`.

## 5. Interface e Identidade Visual (Regra 60-30-10)
O Frontend utiliza o Tailwind CSS mapeado com a paleta oficial da Prefeitura de Serra Talhada:
* **60% Fundo:** Gelo (`#F5F5F5` - `ceamFundo`) para conforto visual nas listagens.
* **30% Cor Principal:** Lilás (`#783FA8` - `ceamLilas`) para cabeçalhos, barras laterais e destaques institucionais.
* **10% Destaque:** Azul (`#253DD9` - `ceamAzul`) para Call-to-Actions e botões primários.
* **Texto/Contraste:** Azul Escuro (`#0C205F` - `ceamAzulEscuro`).

## 6. Fluxo de Desenvolvimento com IA (OpenCode)
Para maximizar a eficiência do Hot Reload enquanto o agente OpenCode escreve o código:
1. O PostgreSQL é levantado isoladamente (`docker-compose up -d db`).
2. O Backend corre via Gradle (`./gradlew bootRun`).
3. O Frontend corre num contentor temporário de desenvolvimento mapeando a porta 5173.
4. O `docker-compose` completo é utilizado apenas para simular o ambiente de produção.