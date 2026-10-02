# API REST - Aluguel de Imóveis

API REST desenvolvida em JavaScript utilizando Node.js e Express.

## Objetivo

A API permite listar imóveis disponíveis para aluguel, cadastrar novos imóveis e remover imóveis.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Express
- Git
- GitHub

## Como executar

Instalar dependências:

```bash
npm install
```

Executar a API:

```bash
node server.js
```

A API será executada em:

```
http://localhost:8080
```

## Endpoints

### Listar imóveis

`GET /api/imoveis`

Retorna a lista de imóveis cadastrados com status `200 OK`.

Exemplo de resposta:

```json
[
  {
    "id": 1,
    "titulo": "Apartamento no Centro",
    "tipo": "Apartamento",
    "cidade": "Maceió",
    "bairro": "Centro",
    "quartos": 2,
    "banheiros": 1,
    "valorAluguel": 1500,
    "disponivel": true
  }
]
```

### Cadastrar imóvel

`POST /api/imoveis`

Exemplo de corpo da requisição:

```json
{
  "titulo": "Casa nova",
  "tipo": "Casa",
  "cidade": "Garanhuns",
  "bairro": "Magano",
  "quartos": 2,
  "banheiros": 3,
  "valorAluguel": 500,
  "disponivel": true
}
```

Retorna o imóvel cadastrado com status `201 Created`.

### Remover imóvel

`DELETE /api/imoveis/:id`

- `204 No Content`: o imóvel existia e foi removido.
- `404 Not Found`: não existe imóvel com o id informado.

## Workflow utilizado

Foi utilizado o **GitHub Flow**.

Existe uma única branch de longa duração, a `main`, que contém sempre a versão estável (produção). Não existem as branches `develop`, `release/*` ou `hotfix/*` do Git Flow.

Cada funcionalidade é desenvolvida em uma branch curta criada a partir da `main`:

- `feature/cadastrar-imovel`: rota POST de cadastro de imóveis
- `feature/github-actions`: workflows do GitHub Actions (PRs #1 e #2)
- `feature/remover-imovel`: rota DELETE, testes, linter e job de qualidade

O ciclo de cada funcionalidade é:

1. Atualizar a `main` local (`git pull`).
2. Criar a branch `feature/<nome>` a partir da `main`.
3. Fazer commits assinados na branch e enviá-la para o GitHub.
4. Abrir um pull request para a `main`; o job **Qualidade de código** roda automaticamente.
5. Com o job aprovado, fazer o merge do pull request na `main`.

No início do projeto, antes da proteção da `main`, o fluxo ainda não era seguido à risca: a `feature/cadastrar-imovel` foi integrada localmente, sem pull request, e os commits de documentação do README foram feitos diretamente na `main`. A partir da `feature/github-actions`, todas as alterações passaram a entrar por pull request, e hoje a proteção da `main` impede push direto.

## Testes e qualidade

```bash
npm run lint              # ESLint
npm run test:unit         # testes de unidade (tests/unit)
npm run test:integration  # testes de integração com supertest (tests/integration)
npm test                  # todos os testes + cobertura (falha abaixo de 90%)
```

Os workflows `.github/workflows/commits.yml` (push na `main` e em `feature/**`) e `.github/workflows/pull-request.yml` (pull requests para a `main`) executam o job **Qualidade de código**, com as etapas de linter, testes de unidade, testes de integração e verificação de cobertura.

## Análise estática (SonarQube Cloud)

O projeto é analisado pelo SonarQube Cloud (plano gratuito):

https://sonarcloud.io/project/overview?id=beatrijz_api-aluguel-imoveis

O job **Análise SonarQube** dos workflows executa os testes, gera o relatório de cobertura (`coverage/lcov.info`) e envia a análise para o SonarQube Cloud. A configuração fica em `sonar-project.properties`, e o token de acesso fica no secret `SONAR_TOKEN` do repositório.

Problemas apontados pela primeira análise e corrigidos:

- `src/app.js`: o Express expunha a versão do framework pelo cabeçalho `X-Powered-By`; o cabeçalho foi desativado com `app.disable("x-powered-by")`.
- Workflows: o `npm ci` executava scripts de instalação dos pacotes; agora é usado `npm ci --ignore-scripts`.

## Commits assinados

A partir da `feature/remover-imovel` (PR #3), todos os commits são assinados com chave SSH. A chave pública foi cadastrada no GitHub como *Signing Key*, então os commits aparecem como **Verified**. Os commits anteriores a essa mudança não são assinados, e a regra de commits assinados da `main` garante que nenhum commit sem assinatura entre daqui em diante.

## Proteção de branches

A `main` é a branch de produção e está protegida:

- Não aceita push direto: toda alteração entra por pull request.
- O pull request só pode ser integrado se o job **Qualidade de código** passar.
- Os commits precisam ser assinados.
- Não é permitido force push nem apagar a branch.
