import { Country, RestCountriesAPI } from "./rest_countries_api";

describe("API de países", () => {
  const api = new RestCountriesAPI();

  const caboVerde: Partial<Country> = {
    name: "Cabo Verde",
    alpha3Code: "CPV",
    capital: "Praia",
    region: "Africa",
    population: 555988,
    area: 4033.0,
    borders: [],
  };

  const bolivia: Partial<Country> = {
    name: "Bolivia (Plurinational State of)",
    alpha3Code: "BOL",
    capital: "Sucre",
    region: "Americas",
    population: 11673029,
    area: 1098581.0,
    borders: ["ARG", "BRA", "CHL", "PRY", "PER"],
  };

  it("buscar por nombre", async () => {
    const paisesArgentina = await api.buscarPaisesPorNombre("cabo verde");
    expect(paisesArgentina).toEqual([expect.objectContaining(caboVerde)]);
  });

  it("buscar por código", async () => {
    const pais = await api.paisConCodigo("BOL");
    expect(pais).toEqual(expect.objectContaining(bolivia));
  });

  it("info de todos los países", async () => {
    const todos = await api.todosLosPaises();
    expect(todos).toHaveLength(250);
  });
});
