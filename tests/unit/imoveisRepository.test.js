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

describe("imoveisRepository", () => {
  test("listar retorna os imóveis iniciais", () => {
    const imoveis = imoveisRepository.listar();

    expect(imoveis).toHaveLength(2);
    expect(imoveis[0].titulo).toBe("Apartamento no Centro");
  });

  test("criar adiciona um imóvel com novo id", () => {
    const novo = imoveisRepository.criar(dadosImovel);

    expect(novo).toEqual({ id: 3, ...dadosImovel });
    expect(imoveisRepository.listar()).toHaveLength(3);
  });

  test("criar ignora campos desconhecidos", () => {
    const novo = imoveisRepository.criar({ ...dadosImovel, extra: "x" });

    expect(novo).not.toHaveProperty("extra");
  });

  test("remover apaga um imóvel existente", () => {
    expect(imoveisRepository.remover(1)).toBe(true);
    expect(imoveisRepository.listar().map((i) => i.id)).toEqual([2]);
  });

  test("remover retorna false para imóvel inexistente", () => {
    expect(imoveisRepository.remover(999)).toBe(false);
    expect(imoveisRepository.listar()).toHaveLength(2);
  });

  test("ids não se repetem após uma remoção", () => {
    imoveisRepository.remover(2);
    const novo = imoveisRepository.criar(dadosImovel);

    expect(novo.id).toBe(3);
  });
});
