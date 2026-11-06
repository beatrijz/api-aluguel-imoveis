# API REST - Aluguel de Imóveis

[![CI](https://github.com/beatrijz/api-aluguel-imoveis/actions/workflows/commits.yml/badge.svg?branch=main)](https://github.com/beatrijz/api-aluguel-imoveis/actions/workflows/commits.yml)
[![Docker Hub](https://badgen.net/badge/icon/docker%20hub?icon=docker&label)](https://hub.docker.com/r/beatriijz/api-aluguel-imoveis)
[![Docker pulls](https://badgen.net/docker/pulls/beatriijz/api-aluguel-imoveis?icon=docker&label=pulls)](https://hub.docker.com/r/beatriijz/api-aluguel-imoveis)
[![Docker image size](https://badgen.net/docker/size/beatriijz/api-aluguel-imoveis/latest/amd64?icon=docker&label=tamanho)](https://hub.docker.com/r/beatriijz/api-aluguel-imoveis)

API REST desenvolvida em JavaScript utilizando Node.js e Express.

## Objetivo

A API permite listar imóveis disponíveis para aluguel, cadastrar novos imóveis e remover imóveis.

## Tecnologias utilizadas

- JavaScript
- Node.js
- Express
- Git
- GitHub
- Docker
- Vagrant + VirtualBox

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

### Executar com Docker

A imagem da API está publicada no DockerHub:

https://hub.docker.com/r/beatriijz/api-aluguel-imoveis

```bash
docker pull beatriijz/api-aluguel-imoveis:latest
docker run -p 8080:8080 beatriijz/api-aluguel-imoveis:latest
```

Ou, para construir a imagem localmente a partir do `Dockerfile`:

```bash
docker build -t api-aluguel-imoveis .
docker run -p 8080:8080 api-aluguel-imoveis
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

## Infraestrutura com Vagrant

O `Vagrantfile` na raiz do projeto cria duas máquinas virtuais Ubuntu 24.04 (box `bento/ubuntu-24.04`) no provedor **VirtualBox**:

| VM | Papel | Memória | IP privado (Classe C) |
|----|-------|---------|------------------------|
| `vm1` | Cliente, usada para testar a API | 1024 MB | `192.168.56.10` |
| `vm2` | Backend, executa a API na porta 8080 | 1024 MB | `192.168.56.11` |

Na `vm2`, o provisionamento:

- instala o Node.js 20 e as dependências da aplicação (`npm ci --omit=dev`);
- sincroniza a pasta do projeto com a pasta `/vagrant_data` da VM;
- registra a API como serviço do systemd (`api-aluguel-imoveis`) e a executa a partir de `/vagrant_data`.

A memória de 1024 MB é suficiente para o sistema operacional, o Node.js e a API em Express, que usa menos de 100 MB em execução.

### Pré-requisitos

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) 7.1 ou superior
- [Vagrant](https://developer.hashicorp.com/vagrant/install) 2.4 ou superior

### Passo a passo para executar a infraestrutura

1. Clonar o repositório e entrar na pasta:

   ```bash
   git clone https://github.com/beatrijz/api-aluguel-imoveis.git
   cd api-aluguel-imoveis
   ```

2. Criar e provisionar as duas VMs (na primeira vez, a box é baixada e o Node.js é instalado na `vm2`):

   ```bash
   vagrant up
   ```

3. Conferir se as duas VMs estão rodando:

   ```bash
   vagrant status
   ```

   As duas máquinas, `vm1` e `vm2`, devem aparecer como `running (virtualbox)`.

4. (Opcional) Conferir se a API está em execução na `vm2`:

   ```bash
   vagrant ssh vm2 -c "systemctl status api-aluguel-imoveis --no-pager"
   ```

### Como testar a rota GET dentro da VM1

1. Acessar a `vm1`:

   ```bash
   vagrant ssh vm1
   ```

2. Dentro da `vm1`, chamar a rota `GET /api/imoveis` da API que está na `vm2`, com `curl`:

   ```bash
   curl -i http://192.168.56.11:8080/api/imoveis
   ```

   Ou com `wget`:

   ```bash
   wget -qO- http://192.168.56.11:8080/api/imoveis
   ```

   A resposta esperada é `HTTP/1.1 200 OK` com a lista de imóveis em JSON.

3. Sair da `vm1`:

   ```bash
   exit
   ```

O mesmo teste pode ser feito sem entrar na VM:

```bash
vagrant ssh vm1 -c "curl -i http://192.168.56.11:8080/api/imoveis"
```

### Outros comandos úteis

```bash
vagrant reload vm2      # reinicia a vm2 (a API é reiniciada junto)
vagrant halt            # desliga as VMs
vagrant destroy -f      # apaga as VMs
```

## Docker e publicação no DockerHub

O workflow `.github/workflows/commits.yml` tem três jobs ligados ao Docker, executados depois do job **Qualidade de código**:

1. **Construção da imagem Docker**: roda a cada push em qualquer branch. Constrói a imagem a partir do `Dockerfile` e a guarda como artefato do workflow.
2. **Teste da imagem Docker**: sobe um container com a imagem construída e verifica se a rota `GET /api/imoveis` responde.
3. **Publicação da imagem no DockerHub**: roda apenas em mudanças na `main` (baseline). Publica a imagem em `beatriijz/api-aluguel-imoveis` com as tags `latest` e o SHA do commit.

As credenciais do DockerHub ficam nos secrets `DOCKERHUB_USERNAME` e `DOCKERHUB_TOKEN` do repositório.

## Commits assinados

A partir da `feature/remover-imovel` (PR #3), todos os commits são assinados com chave SSH. A chave pública foi cadastrada no GitHub como *Signing Key*, então os commits aparecem como **Verified**. Os commits anteriores a essa mudança não são assinados, e a regra de commits assinados da `main` garante que nenhum commit sem assinatura entre daqui em diante.

## Proteção de branches

A `main` é a branch de produção e está protegida:

- Não aceita push direto: toda alteração entra por pull request.
- O pull request só pode ser integrado se o job **Qualidade de código** passar.
- Os commits precisam ser assinados.
- Não é permitido force push nem apagar a branch.
