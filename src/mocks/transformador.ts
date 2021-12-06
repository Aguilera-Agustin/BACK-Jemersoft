import { RestCountriesAPIMock } from "./rest_countries_api";
import { Pais } from "../dominio/pais";
import { CurrencyConverterAPI } from "./currency_converter_api";
import { Country } from "../api/rest_countries_api";

export class Transformador {
  public countries: Country[];
  public currencyApi: CurrencyConverterAPI;

  constructor(countries: Country[]) {
    this.countries = countries;
    this.currencyApi = new CurrencyConverterAPI("d956ad8ad88fce288555");
  }

  public countriesApaises(): Promise<Pais>[] {
    return this.countries.map(async (country: Country) => {
      const limitrofe = await this.getLimitrofe(country);
      const cotizacion = await this.currencyApi.convertirDolarA(
        country.currencies[0] ? country.currencies[0].code : "USD"
      );
      return this.countryApais(country, cotizacion, limitrofe);
    });
  }

  // Esta función es asincrónica, hay que marcarla como tal.
  private async getLimitrofe(country: Country): Promise<Pais[]> {
    const api = new RestCountriesAPIMock();

    // Esto se vuelve una lista de Promise<Country>,
    // y tienen que esperarla si quieren seguir trabajando con ella.
    // Para esperar a que una lista de promises termine, se usa Promise.all:
    const limitrofe = await Promise.all(
      country.borders.map((code: string) => api.paisConCodigo(code))
    );

    // Acá lo mismo, el map vuelve a transformar esto en una lista de promesas.
    // Entonces hay que esperarlas :)
    return Promise.all(
      limitrofe.map(async (limitrofe) => {
        const cotizacion = await this.currencyApi.convertirDolarA(limitrofe.currencies[0]?.code ?? 'USD');
        //const cotizacion = 0;
        return this.countryApais(limitrofe, cotizacion);
      })
    );

    // También podrían simplificar el código y hacer un solo map que resuelva todo.
    // Y ni hablar de que sería ideal que también reutilicen parte de esto en el método de más arriba
    // (que es muy parecido).
    // Quedaría así:

    // return Promise.all(
    //   country.borders.map(async (code: string) => {
    //     const country = await api.paisConCodigo(code);
    //     const cotizacion = await this.currencyApi.convertirDolarA(country.currencies[0]?.code ?? 'USD');
    //     return this.countryApais(country, cotizacion);
    //   })
    // );
  }

  public countryApais(country: Country, cotizacion: number, limitrofe: Pais[] = []): Pais {
    return new Pais(
      country?.name ?? " ",
      country.alpha3Code,
      country.population,
      country.area ?? country.population,
      country.region,
      country.currencies[0] ? country.currencies[0].code : "USD",
      cotizacion,
      limitrofe,
      country.regionalBlocs?.map((bloc) => bloc.name),
      country.languages?.map((language) => language.name)
    );
  }
}
