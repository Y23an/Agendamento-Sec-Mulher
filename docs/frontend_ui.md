# Guia de Interface de Utilizador (UI) - Sistema CEAM

## 1. Identidade Visual e Regra 60-30-10

O design do sistema baseia-se numa distribuição equilibrada de cores para garantir conforto visual e foco nas ações, configuradas previamente no `tailwind.config.js`:

* **Fundo Global (60%):** Utilizar `bg-ceamFundo` (`#F5F5F5`). O fundo gelo evita o cansaço visual comum em ecrãs brancos puros durante longas jornadas de trabalho.
* **Cor Institucional (30%):** Utilizar `ceamLilas` (`#783FA8`). Deve ser aplicada em barras de navegação laterais (Sidebar), cabeçalhos principais, ícones de destaque e bordas superiores de cartões (`border-t-4 border-ceamLilas`).
* **Ações e Destaques (10%):** Utilizar `ceamAzul` (`#253DD9`). Reservado estritamente para os Botões Primários (ex: "Salvar", "Cadastrar", "Acessar") e links de chamada para ação.
* **Texto e Contraste:** Utilizar `ceamAzulEscuro` (`#0C205F`) para títulos e textos principais, garantindo alta legibilidade.
* **Sucesso/Feedback:** Utilizar `ceamVerde` (`#009A97`) para alertas de sucesso e botões de confirmação positiva.

## 2. Layout Principal (Master Page)

O sistema (após o login) deve ser envolvido por um layout padrão composto por:

* **Sidebar (Barra Lateral):** Fundo branco ou `bg-ceamLilas`, contendo o menu de navegação (Dashboard, Usuárias, Atendimentos, Configurações). No mobile, deve ser retrátil (Menu Hambúrguer).
* **Header (Cabeçalho):** Deve exibir o título da página atual, o nome do operador logado e o logo da Prefeitura de Serra Talhada/Secretaria da Mulher.
* **Main Content (Área de Conteúdo):** Fundo `bg-ceamFundo`, com margens internas (`p-6` ou `p-8`) onde os formulários e tabelas serão renderizados dentro de "Cards".

## 3. Padrão de Componentes

### 3.1. Cartões (Cards)
A base para qualquer formulário ou tabela.
* **Classes Base:** `bg-white rounded-lg shadow-md p-6`.
* **Variação com Destaque:** Adicionar `border-t-4 border-ceamLilas`.

### 3.2. Botões
* **Primário (Salvar/Avançar):** `bg-ceamAzul text-white px-4 py-2 rounded-md font-semibold hover:opacity-90 transition-opacity`.
* **Secundário (Voltar/Cancelar):** `bg-white text-ceamAzulEscuro border border-gray-300 px-4 py-2 rounded-md font-semibold hover:bg-gray-50 transition-colors`.
* **Perigo (Excluir):** `bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors`.

### 3.3. Formulários (Inputs e Selects)
* **Labels:** Devem ser claras e concisas, utilizando `text-sm font-medium text-ceamAzulEscuro mb-1 block`.
* **Campos (Inputs/Selects):** Fundo branco, borda subtil e foco na cor institucional.
* **Classes Base:** `w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-ceamLilas focus:border-transparent`.
* *Nota:* Para domínios dinâmicos (Municípios, Bairros, Profissões), utilizar sempre a tag `<select>` preenchida através de chamadas à API, definindo "Serra Talhada" e "Pernambuco" como valores selecionados por padrão onde aplicável.

### 3.4. Tabelas de Listagem (Data Grids)
* As listagens de mulheres atendidas e configurações devem ter um design limpo.
* Cabeçalho da tabela: Fundo levemente cinza ou `bg-ceamLilas` com texto branco.
* Linhas: Fundo branco, com efeito *hover* (`hover:bg-gray-50`) para facilitar a leitura.
* Ações na tabela: Utilizar ícones (ex: Lápis para editar, Olho para ver detalhes) em vez de botões com texto grande.

## 4. Estrutura de Navegação (Rotas Recomendadas)

* `/login` - Ecrã de autenticação.
* `/` (Dashboard) - Resumo de atendimentos.
* `/usuarias` - Listagem e busca de usuárias.
* `/usuarias/nova` - Formulário de cadastro de nova usuária.
* `/atendimentos` - Registo de episódios de atendimento.
* `/configuracoes` - Painel de administração dos domínios dinâmicos (Gerir Bairros, Agressores, Tipos de Violência, etc.).

## 5. Responsividade

Todos os ecrãs devem ser responsivos (Mobile-First adaptado para Desktop), garantindo que assistentes sociais possam aceder ao sistema através de tablets ou smartphones durante as visitas, utilizando as utilidades prefixadas do Tailwind (ex: `flex-col md:flex-row`).