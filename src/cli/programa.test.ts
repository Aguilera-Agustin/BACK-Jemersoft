import { RestCountriesAPIMock } from './../mocks/rest_countries_api';
import { mocked } from "ts-jest/utils";
import { consola } from "./consola";
import programa from "./programa";

// Le pedimos a Jest que "imposte" el módulo completo
jest.mock("./consola");

// Le "avisamos" al compilador de TypeScript que la consola es un mock
// Esto "le agrega" al objeto tenga los métodos de Jest para interactuar con mocks
const consolaMock = mocked(consola);

// TODO: agregar mock para la RestCountries API

describe("Programa", () => {
  const apiMock = new RestCountriesAPIMock();
  programa.api = apiMock;

  it("1.1 - Saber si es plurinacional", async () => {
    consolaMock.leer.mockReturnValueOnce("1.1").mockReturnValueOnce("Argentina");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Si");
  });

  it("1.2 - Saber si es una isla", async () => {
    consolaMock.leer.mockReturnValueOnce("1.2").mockReturnValueOnce("Argentina");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("No");
  });

  it("1.3 - Saber su densidad poblacional", async () => {
    consolaMock.leer.mockReturnValueOnce("1.3").mockReturnValueOnce("Argentina");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("16");
  });

  it("1.4 - Saber cual es su vecino mas poblado", async () => {
    consolaMock.leer.mockReturnValueOnce("1.4").mockReturnValueOnce("Argentina");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Brazil");
  });

  it("2.1 - Saber si son limitrofes", async () => {
    consolaMock.leer.mockReturnValueOnce("2.1").mockReturnValueOnce("Argentina").mockReturnValueOnce("Uruguay");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Si");
  });

  it("2.2 - Saber si necesitan traduccion", async () => {
    consolaMock.leer.mockReturnValueOnce("2.2").mockReturnValueOnce("Argentina").mockReturnValueOnce("Brazil");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Si");
  });

  it("2.3 - Saber si son potenciales aliados", async () => {
    consolaMock.leer.mockReturnValueOnce("2.3").mockReturnValueOnce("Argentina").mockReturnValueOnce("Uruguay");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Si");
  });

  it("2.4 - Saber si conviene ir de compras", async () => {
    consolaMock.leer.mockReturnValueOnce("2.4").mockReturnValueOnce("Argentina").mockReturnValueOnce("Brazil");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("No");
  });

  it("2.5 - Saber cuanto equivale el cambio de moneda", async () => {
    consolaMock.leer.mockReturnValueOnce("2.5").mockReturnValueOnce("Argentina").mockReturnValueOnce("Brazil").mockReturnValueOnce("1000");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("NaN"); // TODO Arreglar
  });

  it("3.1 - Saber los códigos ISO de los 5 países con mayor densidad poblacional", async () => {
    consolaMock.leer.mockReturnValueOnce("3.1");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("CHN,IND,USA,IDN,PAK"); // TODO Arreglar
  });

  it("3.2 - Saber el nombre del continente con más paises plurinacionales", async () => {
    consolaMock.leer.mockReturnValueOnce("3.2");
    await programa.ejecutar();
    expect(consola.escribir).toHaveBeenCalledWith("Africa");
  });

  //it("3.3 - Saber el promedio de densidad poblacional de los países que son islas", async () => {
  //consolaMock.leer.mockReturnValueOnce("3.2");
  //await programa.ejecutar();
  //expect(consola.escribir).toHaveBeenCalledWith("4310170.164705883"); // TODO Arreglar
  //});

  it("4 - Salir del programa", async () => {
    consolaMock.leer.mockReturnValue("4");
    await programa.ejecutar();

    expect(consola.escribir).toHaveBeenCalledWith("Salir del programa");
  });
});
