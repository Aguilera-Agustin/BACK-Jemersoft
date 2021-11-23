import { Transformador } from './transformador';
import { Country } from '../api/rest_countries_api';
import { Pais } from './pais';
describe('transformador', ()=>{
    describe('de paises',()=> {
        const country = {
            name: 'United States of America',
            alpha3Code: 'USA',
            capital: 'Washington, D.C.',
            region: 'Americas',
            population: 329484123,
            area: 9629091,
            borders: [ 'CAN', 'MEX' ],
            languages: [
                {
                  name: 'English',
                }
              ],
              regionalBlocs: [
                {
                  acronym: 'NAFTA',
                  name: 'North American Free Trade Agreement',
                }
              ],
              currencies: [ { code: 'USD', } ],

        } as Country
        const transformador = new Transformador([country]);
        
        it('deberia transformar un Countries en Paises', async ()=>{
            const pais = await Promise.all(transformador.countriesApaises());
            const Canada = new Pais ('Canada', 'CAN',38005238,9984670,'Americas','CAD',1.27011,[],['North American Free Trade Agreement'],[ 'English', 'French' ])
            const Mexico = new Pais('Mexico','MEX',128932753,1964375,'Americas','MXN',20.9867,[],['Pacific Alliance', 'North American Free Trade Agreement'],['Spanish'])
            const paisEsperado = [new Pais('United States of America','USA',329484123,9629091,'Americas','USD',1,[Canada, Mexico],['North American Free Trade Agreement'],['English'])];
            expect(pais).toStrictEqual(paisEsperado)
            
            
            
            
        })
    })
})