# API REST - Aluguel de Imóveis

API REST desenvolvida em JavaScript utilizando Node.js e Express.

## Objetivo

A API permite listar imóveis disponíveis para aluguel e cadastrar novos imóveis.

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
Endpoints
Listar imóveis

Método:

GET /api/imoveis

Retorna a lista de imóveis cadastrados.

Exemplo de resposta:

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
Cadastrar imóvel

Método:

POST /api/imoveis

Exemplo de corpo da requisição:

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

A API retorna o imóvel cadastrado com status:

201 Created
Workflow utilizado

Foi utilizado o Git Flow.

O desenvolvimento foi organizado utilizando branches separadas para novas funcionalidades.

A branch main contém a versão estável do projeto.

Para adicionar a funcionalidade de cadastro de imóveis foi criada a branch:

feature/cadastrar-imovel

Após os testes da nova funcionalidade, a branch foi integrada novamente na main.

Esse fluxo facilita a organização do desenvolvimento, permitindo criar novas funcionalidades sem alterar diretamente a versão principal do projeto.
