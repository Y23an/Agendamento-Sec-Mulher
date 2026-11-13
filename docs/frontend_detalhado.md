# Arquitetura Detalhada do Frontend (React + Vite)

## 1. Estrutura de Pastas (`frontend/src/`)
O projeto deve seguir uma arquitetura modularizada, separando responsabilidades lógicas, visuais e de integração:

* `assets/`: Imagens estáticas e logos (`logo-ceam-individual.png`, etc.).
* `components/`: Componentes visuais genéricos e reutilizáveis (Botões, Inputs, Modais, Tabelas).
* `layouts/`: Estruturas de página (ex: `MasterLayout.jsx` contendo Sidebar e Header).
* `pages/`: Componentes de nível de página (telas inteiras, ex: `Dashboard.jsx`, `Login.jsx`, `MulherList.jsx`).
* `routes/`: Configuração do React Router DOM e proteção de rotas (Private Routes).
* `services/`: Configuração do Axios e chamadas diretas para a API Spring Boot.
* `hooks/`: Hooks customizados (ex: `useAuth`, `useDominios`).
* `context/`: Contextos globais (Context API) para estado de autenticação e tema.
* `utils/`: Funções auxiliares (máscaras de CPF, formatação de datas, tratativas de erro).

## 2. Camada de Roteamento (React Router DOM)
* **Rotas Públicas:** `/login` (acessível a qualquer utilizador).
* **Rotas Privadas:** Todas as outras rotas devem estar encapsuladas num componente `<PrivateRoute>`, que verifica a existência de um token JWT válido. Se o token não existir ou expirar, redireciona automaticamente para `/login`.
* **Layout Aninhado:** Utilizar o `<Outlet>` do React Router dentro do `MasterLayout.jsx` para renderizar o conteúdo das páginas sem recarregar a Sidebar e o Header.

## 3. Integração com a API (Axios)
A comunicação com o Backend deve ser centralizada no arquivo `services/api.js`:
* **Base URL:** Lida das variáveis de ambiente (`import.meta.env.VITE_API_URL`) ou fixada em `/api/v1` em ambiente de Docker com proxy/Nginx.
* **Interceptors (Request):** Um interceptor deve injetar automaticamente o cabeçalho `Authorization: Bearer {token}` em todas as requisições (exceto `/login`).
* **Interceptors (Response):** Um interceptor global para capturar erros `401 Unauthorized` ou `403 Forbidden` e forçar o logout (limpar localStorage e redirecionar para `/login`).

## 4. Estratégia de Formulários e Domínios Dinâmicos
* **Componentes Controlados:** Todos os inputs devem refletir o estado do React (`useState` genérico para o formulário, ex: `const [formData, setFormData] = useState({})`).
* **Hook Genérico de Domínios (`useDominios`):** Criar um hook customizado que abstraia a busca de tabelas de domínio dinâmico (Bairros, Profissões, Tipos de Violência). Este hook deve fazer cache em memória para evitar requisições repetitivas à API sempre que um `<select>` for renderizado.
* **Componente `<SelectDinamico>`:** Criar um componente de `<select>` que receba o nome do domínio como *prop* (`dominio="bairros"`) e se encarregue de buscar as opções, renderizá-las e definir o valor padrão para "Serra Talhada - PE" quando aplicável.

## 5. Gerenciamento de Estado de Autenticação (Context API)
Criar um `AuthContext.jsx` responsável por:
* Armazenar o JWT no `localStorage`.
* Decodificar o JWT para extrair os dados do utilizador (Nome, Role/Perfil).
* Disponibilizar as funções genéricas `login(credenciais)` e `logout()` para toda a árvore de componentes.
* Restringir renderização de botões sensíveis (ex: Excluir) baseado na `Role` do utilizador logado.

## 6. Componentização Base (Design System)
Construir uma biblioteca interna de componentes (`/components/common/`) para não repetir classes do Tailwind:
* `<Button variant="primary|secondary|danger">`: Aplica as cores da regra 60-30-10 (`ceamAzul` para primário).
* `<Input name="cpf" mask="cpf">`: Input com suporte nativo a formatação.
* `<Card title="Formulário de Cadastro">`: Container branco com borda `border-t-4 border-ceamLilas`.
* `<DataTable columns={...} data={...} />`: Componente genérico de tabela com suporte a paginação via API (recebendo `page` e `size`).

## 7. Tratamento de Erros e Feedback Visual
* Utilizar uma biblioteca leve de notificações (como `react-toastify` ou `sonner`, ou um contexto simples customizado) para exibir alertas.
* Requisições bem-sucedidas disparam alertas usando a cor `ceamVerde`.
* Erros de validação do Spring Boot (Status 400) devem ser iterados e exibidos abaixo dos respetivos campos no formulário (ex: "CPF inválido", "Data obrigatória").
