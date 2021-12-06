import { countriesMock } from "./rest_data";
import { Country, RestCountriesAPI } from "../api/rest_countries_api";
export class RestCountriesAPIMock extends RestCountriesAPI {
  paises: Country[] = countriesMock;

  async todosLosPaises(): Promise<Country[]> {
    return this.paises;
  }

  async buscarPaisesPorNombre(nombre: string): Promise<Country[]> {
    return this.paises.filter((eachPais) =>
      eachPais.name.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  async paisConCodigo(codigoIso3: string): Promise<Country> {
    const data = this.paises.find(
      (eachPais) => eachPais.alpha3Code === codigoIso3
    );
    return data!;
  }
}