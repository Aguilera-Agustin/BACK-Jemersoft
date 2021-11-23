import { Country, RestCountriesAPI } from '../api/rest_countries_api';
import { Pais } from './pais';
import { CurrencyConverterAPI } from '../api/currency_converter_api';

export class Transformador {
    
    public countries: Country[];
    public currencyApi : CurrencyConverterAPI;

    constructor( countries :Country[]) {
        this.countries = countries;
        this.currencyApi = new CurrencyConverterAPI('d956ad8ad88fce288555');
        
    }

    public countriesApaises() {
        return this.countries.map( async(country: Country) => { 
            const limitrofe = await Promise.all(this.getLimitrofe(country));
            const cotizacion = await this.currencyApi.convertirDolarA(country.currencies[0]? country.currencies[0].code : 'USD');
            return new Pais(
                country.name,
                country.alpha3Code,
                country.population,
                country.area || country.population,
                country.region,
                country.currencies[0]? country.currencies[0].code : 'USD',
                cotizacion, 
                limitrofe,
                country.regionalBlocs?.map( (bloc) => bloc.name ),
                country.languages?.map( (language) => language.name )
            )
        } )
    }

    private getLimitrofe(country: Country) {
        const api =  new RestCountriesAPI();
        const limitrofe = country.borders.map( async(code: string) => {
            return await api.paisConCodigo(code);
        });
        return limitrofe.map( async (limitrofe) => {
            const cotizacion = await this.currencyApi.convertirDolarA((await limitrofe).currencies[0]? (await limitrofe).currencies[0].code : 'USD');
            return limitrofe.then( (country) => {
                return this.countryApais(country, cotizacion);});
        });
    }

    public countryApais(country: Country, cotizacion: number) {
      
    
        return new Pais(
            country.name,
            country.alpha3Code,
            country.population,
            country.area? country.area : country.population,
            country.region,
            country.currencies[0]? country.currencies[0].code : 'USD',
            cotizacion,
            [],
            country.regionalBlocs?.map( (bloc) => bloc.name ),
            country.languages?.map( (language) => language.name )
        )
    }
    
}