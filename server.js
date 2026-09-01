const express = require("express");

const app = express();

const PORT = 8080;

app.use(express.json());

let imoveis = [
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


// GET - listar imóveis
app.get("/api/imoveis", (req, res) => {
  res.status(200).json(imoveis);
});


// POST - cadastrar imóvel
app.post("/api/imoveis", (req, res) => {

  const {
    titulo,
    tipo,
    cidade,
    bairro,
    quartos,
    banheiros,
    valorAluguel,
    disponivel
  } = req.body;


  const novoImovel = {
    id: imoveis.length + 1,
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

  res.status(201).json(novoImovel);
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});