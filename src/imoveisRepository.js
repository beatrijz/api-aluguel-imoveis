const imoveisIniciais = [
  {
    id: 1,
    titulo: "Apartamento no Centro",
    tipo: "Apartamento",
    cidade: "Maceió",
    bairro: "Centro",
    quartos: 2,
    banheiros: 1,
    valorAluguel: 1500,
    disponivel: true
  },
  {
    id: 2,
    titulo: "Casa com garagem",
    tipo: "Casa",
    cidade: "Maceió",
    bairro: "Ponta Verde",
    quartos: 3,
    banheiros: 2,
    valorAluguel: 2800,
    disponivel: true
  }
];

let imoveis = [];
let proximoId = 1;

function resetar() {
  imoveis = imoveisIniciais.map((imovel) => ({ ...imovel }));
  proximoId = imoveis.length + 1;
}

function listar() {
  return imoveis;
}

function criar(dados) {
  const {
    titulo,
    tipo,
    cidade,
    bairro,
    quartos,
    banheiros,
    valorAluguel,
    disponivel
  } = dados;

  const novoImovel = {
    id: proximoId++,
    titulo,
    tipo,
    cidade,
    bairro,
    quartos,
    banheiros,
    valorAluguel,
    disponivel
  };

  imoveis.push(novoImovel);

  return novoImovel;
}

// Retorna true se o imóvel existia e foi removido
function remover(id) {
  const indice = imoveis.findIndex((imovel) => imovel.id === id);

  if (indice === -1) {
    return false;
  }

  imoveis.splice(indice, 1);

  return true;
}

resetar();

module.exports = { listar, criar, remover, resetar };
