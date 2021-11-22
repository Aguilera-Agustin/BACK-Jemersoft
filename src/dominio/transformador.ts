import { Country, RestCountriesAPI } from '../api/rest_countries_api';
import { Pais } from './pais';

export class Transformador {
    
    public countries: Country[];

    constructor( countries :Country[]) {
        this.countries = countries;
    }

    public countriesApaises() {
        return this.countries.map( async(country: Country) => { 
            const limitrofe = await this.getLimitrofe(country);
            return new Pais(
                country.name,
                country.alpha3Code,
                country.population,
                country.area || country.population,
                country.region,
                country.currencies[0]? country.currencies[0].code : 'USD',
                0, // No se cua es cotizacionDolar de la api
                limitrofe,
                country.regionalBlocs.map( (bloc) => bloc.name ),
                country.languages.map( (language) => language.name )
            )
        } )
    }

    private async getLimitrofe(country: Country) {
        const api =  new RestCountriesAPI();
        const data = await api.buscarPaisesPorNombre(country.name);
        return data.map( (country: Country) => this.countryApais(country) ); 
    }

    public countryApais(country: Country) {
        return new Pais(
            country.name,
            country.alpha3Code,
            country.population,
            country.area || country.population,
            country.region,
            country.currencies[0]? country.currencies[0].code : 'USD',
            0, // No se cua es cotizacionDolar de la api
            [],
            country.regionalBlocs.map( (bloc) => bloc.name ),
            country.languages.map( (language) => language.name )
        )
    }
    
}