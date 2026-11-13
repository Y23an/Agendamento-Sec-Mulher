# Arquitetura Detalhada do Backend (Spring Boot 4.1.2)

## 1. Estrutura de Pacotes (Domain-Driven Design simplificado)
O projeto deve seguir a separação clara de responsabilidades no pacote base `br.gov.pe.serratalhada.ceam`:
* `.config`: Configurações de Segurança (JWT), CORS, Swagger/OpenAPI e tratamento de Data/Hora.
* `.domain.entity`: Classes de entidade mapeadas com o banco de dados (JPA).
* `.domain.enums`: Apenas para dados imutáveis do sistema (ex: `RoleUsuario`, `StatusAtendimento`).
* `.repository`: Interfaces do Spring Data JPA.
* `.service`: Regras de negócio e transações (`@Transactional`).
* `.web.controller`: Endpoints REST (`@RestController`).
* `.web.dto`: Objetos de transferência de dados (Request, Response e Mappers).
* `.exception`: Tratamento global de erros (`@ControllerAdvice`).

---

## 2. Entidades do Banco de Dados (JPA)

### A. Tabelas de Domínio Dinâmico (Configurações)
Não utilizar Enums. Todas devem ter `id` (Long), `descricao` (String) e `ativo` (Boolean).
* `Bairro` (Com valor padrão preenchido via Flyway para focar em "Serra Talhada - PE").
* `Profissao`
* `TipoViolencia` (Física, Psicológica, Patrimonial, etc.)
* `VinculoAgressor` (Marido, Ex-companheiro, Pai, etc.)
* `OrgaoEncaminhamento` (Delegacia, CRAS, Ministério Público, etc.)

### B. Entidades de Acesso
* **`Usuario`**
  * Campos: `id` (UUID), `nome` (String), `email` (String único), `senha` (String hash), `role` (Enum: ADMIN, ATENDENTE), `ativo` (Boolean).

### C. Entidades Principais (Core Business)
* **`Mulher` (Vítima/Usuária do Serviço)**
  * Campos: `id` (UUID), `nome` (String), `cpf` (String único), `rg` (String), `dataNascimento` (LocalDate), `telefone` (String), `enderecoLogradouro` (String), `numero` (String).
  * Relacionamentos: `@ManyToOne` para `Bairro` e `Profissao`.
  * Auditoria: `dataCadastro` (LocalDateTime), `atualizadoEm` (LocalDateTime).

* **`Atendimento`**
  * Campos: `id` (UUID), `protocolo` (String único gerado ano/numero), `dataAtendimento` (LocalDateTime), `relatoVitima` (Text), `providenciasTomadas` (Text).
  * Relacionamentos: 
    * `@ManyToOne` para `Mulher` e `Usuario` (quem atendeu).
    * `@ManyToOne` para `VinculoAgressor`.
    * `@ManyToMany` para `TipoViolencia` (Um atendimento pode ter múltiplas violências).
  * Enums (Estes podem ser fixos): `StatusAtendimento` (ABERTO, EM_ACOMPANHAMENTO, ENCERRADO).

* **`Encaminhamento`**
  * Campos: `id` (Long), `dataEncaminhamento` (LocalDate), `observacoes` (String).
  * Relacionamentos: `@ManyToOne` para `Atendimento` e `@ManyToOne` para `OrgaoEncaminhamento`.

---

## 3. Data Transfer Objects (DTOs) e Mapeamento

Para evitar exposição de dados sensíveis e problemas de lazy loading (N+1), usar records do Java 17+:

* **Usuário DTOs:** `UsuarioRequest`, `UsuarioResponse`, `LoginRequest`, `TokenResponse`.
* **Domínios DTOs:** Como as tabelas têm a mesma estrutura, usar um genérico: `DominioRequest` (descricao, ativo), `DominioResponse` (id, descricao, ativo).
* **Mulher DTOs:** 
  * `MulherRequest`: Validações (`@NotBlank`, `@CPF`, `@Past` para nascimento). Recebe apenas o `bairroId` e `profissaoId`.
  * `MulherListResponse`: DTO resumido para a listagem (Tabela do frontend).
  * `MulherDetailResponse`: Traz todos os dados e os arrays de `AtendimentoResponse` vinculados.
* **Atendimento DTOs:** 
  * `AtendimentoRequest`: Recebe `mulherId`, lista de `tiposViolenciaIds`, e dados do relato.

---

## 4. Camada de Repositório (Spring Data JPA)

* `UsuarioRepository`: `Optional<Usuario> findByEmail(String email)`
* `MulherRepository`: `Optional<Mulher> findByCpf(String cpf)`, e busca paginada com filtros dinâmicos (Specification ou `@Query` para buscar por nome/cpf).
* `AtendimentoRepository`: Buscas por data, status e UUID da Mulher.
* **Domínios Repositories:** Todos extendem `JpaRepository<T, Long>` com `List<T> findByAtivoTrueOrderByDescricaoAsc()`.

---

## 5. Camada de Serviço (Regras de Negócio)

* `AuthService`: Geração de JWT e autenticação.
* `DominioService`: CRUD genérico ou individual para as tabelas dinâmicas, garantindo que não se delete um domínio em uso (lançar `DataIntegrityViolationException`), apenas inativar.
* `MulherService`: 
  * Validação de duplicidade de CPF.
  * Associa bairro/profissão buscados no BD.
* `AtendimentoService`: 
  * Geração automática do número de protocolo.
  * Injeção do `Usuario` logado (através do contexto do Spring Security).

---

## 6. Endpoints REST (Controllers)

Todas as rotas devem estar sob `/api/v1/`:

* **Autenticação:**
  * `POST /auth/login`
* **Configurações/Domínios:** (Protegido para ADMIN ou GET aberto para popular Selects)
  * `GET|POST|PUT /dominios/bairros`
  * `GET|POST|PUT /dominios/profissoes`
  * `GET|POST|PUT /dominios/tipos-violencia`
  * `GET|POST|PUT /dominios/vinculos-agressor`
* **Mulheres:**
  * `POST /mulheres`
  * `GET /mulheres` (Paginado: `?page=0&size=10&nome=Maria`)
  * `GET /mulheres/{id}`
  * `PUT /mulheres/{id}`
* **Atendimentos:**
  * `POST /atendimentos`
  * `GET /atendimentos/mulher/{mulherId}`
  * `PUT /atendimentos/{id}/status`

---

## 7. Tratamento de Exceções Globais
Classe `GlobalExceptionHandler` interceptando:
* `EntityNotFoundException` -> Retorna 404.
* `MethodArgumentNotValidException` -> Retorna 400 com array de campos inválidos.
* `BusinessRuleException` -> Erros lógicos (ex: CPF já cadastrado), retorna 422.
* `BadCredentialsException` -> Retorna 401.

## 8. Migrations (Flyway)
Na pasta `src/main/resources/db/migration`:
* `V1__create_tables.sql`: Criação das estruturas no PostgreSQL.
* `V2__insert_default_data.sql`: 
  * Cria o usuário ADMIN inicial.
  * Insere `Serra Talhada - PE` na tabela Bairro.
  * Insere profissões padrão ("Do Lar", "Estudante", "Agricultora", etc.).
