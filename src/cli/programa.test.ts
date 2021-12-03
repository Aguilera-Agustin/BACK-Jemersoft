import { mocked } from "ts-jest/utils";
import { consola } from "./consola";
import programa from "./programa";
import { RestCountriesAPIMock } from "../mocks/rest_countries_api";

// Le pedimos a Jest que "imposte" el módulo completo
jest.mock("./consola");

// Le "avisamos" al compilador de TypeScript que la consola es un mock
// Esto "le agrega" al objeto tenga los métodos de Jest para interactuar con mocks
const consolaMock = mocked(consola);

describe("Programa", () => {
  it("devuelve el continente más plurinacional", async () => {
    const apiMock = new RestCountriesAPIMock();
    programa.api = apiMock;

    consolaMock.leer.mockReturnValueOnce("3.2").mockReturnValueOnce("4");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Americas");
  });

  it("devuelve el continente más plurinacional", async () => {
    const apiMock = new RestCountriesAPIMock();
    programa.api = apiMock;

    consolaMock.leer
      .mockReturnValueOnce("1.1")
      .mockReturnValueOnce("Paraguay")
      .mockReturnValueOnce("4");

    await programa.ejecutar();

    // TODO: corregir el fixture
    expect(consola.escribir).toHaveBeenCalledWith("No");
  });
});
