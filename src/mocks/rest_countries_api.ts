import { countriesMock } from "./rest_data";
import { Country } from "../api/rest_countries_api";
import { RestAPI } from '../api/rest_api';
import { mergeRight } from 'ramda';

export class RestCountriesAPI extends RestAPI{
  get urlBase(): string {
    throw new Error("Method not implemented.");
  }
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
  
  inicializarCamposNulos = mergeRight({
    borders: [],
    regionalBlocs: [],
    currencies: [],
  });

}
