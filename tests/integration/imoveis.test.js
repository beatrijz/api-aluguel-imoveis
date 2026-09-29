const request = require("supertest");
const app = require("../../src/app");
const imoveisRepository = require("../../src/imoveisRepository");

const dadosImovel = {
  titulo: "Casa nova",
  tipo: "Casa",
  cidade: "Garanhuns",
  bairro: "Magano",
  quartos: 2,
  banheiros: 3,
  valorAluguel: 500,
  disponivel: true
};

beforeEach(() => {
  imoveisRepository.resetar();
});

describe("GET /api/imoveis", () => {
  test("retorna 200 com a lista de imóveis", async () => {
    const res = await request(app).get("/api/imoveis");

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe("POST /api/imoveis", () => {
  test("retorna 201 com o imóvel cadastrado", async () => {
    const res = await request(app).post("/api/imoveis").send(dadosImovel);

    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 3, ...dadosImovel });
  });

  test("o imóvel cadastrado aparece na listagem", async () => {
    await request(app).post("/api/imoveis").send(dadosImovel);
    const res = await request(app).get("/api/imoveis");

    expect(res.body).toHaveLength(3);
  });

  test("aceita requisição sem corpo", async () => {
    const res = await request(app).post("/api/imoveis");

    expect(res.status).toBe(201);
    expect(res.body.id).toBe(3);
  });
});

describe("DELETE /api/imoveis/:id", () => {
  test("retorna 204 e remove o imóvel existente", async () => {
    const res = await request(app).delete("/api/imoveis/1");

    expect(res.status).toBe(204);
    expect(res.body).toEqual({});

    const lista = await request(app).get("/api/imoveis");
    expect(lista.body.map((i) => i.id)).toEqual([2]);
  });

  test("retorna 404 para imóvel inexistente", async () => {
    const res = await request(app).delete("/api/imoveis/999");

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ mensagem: "Imóvel não encontrado" });
  });

  test("retorna 404 para id inválido", async () => {
    const res = await request(app).delete("/api/imoveis/abc");

    expect(res.status).toBe(404);
  });

  test("retorna 404 ao remover o mesmo imóvel duas vezes", async () => {
    await request(app).delete("/api/imoveis/2");
    const res = await request(app).delete("/api/imoveis/2");

    expect(res.status).toBe(404);
  });
});
