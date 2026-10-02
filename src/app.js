const express = require("express");
const imoveisRepository = require("./imoveisRepository");

const app = express();

// Não expor a tecnologia do servidor no cabeçalho X-Powered-By
app.disable("x-powered-by");

app.use(express.json());


// GET - listar imóveis
app.get("/api/imoveis", (req, res) => {
  res.status(200).json(imoveisRepository.listar());
});


// POST - cadastrar imóvel
app.post("/api/imoveis", (req, res) => {
  const novoImovel = imoveisRepository.criar(req.body ?? {});

  res.status(201).json(novoImovel);
});


// DELETE - remover imóvel
app.delete("/api/imoveis/:id", (req, res) => {
  const removido = imoveisRepository.remover(Number(req.params.id));

  if (!removido) {
    return res.status(404).json({ mensagem: "Imóvel não encontrado" });
  }

  res.status(204).send();
});

module.exports = app;
