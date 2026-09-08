const request = require("supertest");
const app = require("../server");

describe("API de Aluguel de Imóveis", () => {

  test("GET /api/imoveis deve retornar a lista de imóveis", async () => {
    const response = await request(app)
      .get("/api/imoveis");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/imoveis deve cadastrar um novo imóvel", async () => {
    const novoImovel = {
      titulo: "Casa nova",
      tipo: "Casa",
      cidade: "Garanhuns",
      bairro: "Magano",
      quartos: 2,
      banheiros: 3,
      valorAluguel: 500,
      disponivel: true
    };

    const response = await request(app)
      .post("/api/imoveis")
      .send(novoImovel);

    expect(response.statusCode).toBe(201);
    expect(response.body.titulo).toBe("Casa nova");
    expect(response.body.tipo).toBe("Casa");
    expect(response.body.cidade).toBe("Garanhuns");
    expect(response.body.valorAluguel).toBe(500);
  });

});