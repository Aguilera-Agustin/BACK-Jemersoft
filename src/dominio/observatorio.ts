import R from 'ramda'
import { Pais } from './pais';
import { RestCountriesAPI } from '../api/rest_countries_api';
import { Transformador } from './transformador';
export class Observatorio {

    public paises: Pais[] = [] ;
    public api: RestCountriesAPI

    constructor() {
        this.api = new RestCountriesAPI();
    }

    private async obtenerTodosLosPaises() {
        if(this.paises.length===0){
            const apiData = await this.api.todosLosPaises();
            const transformador = await new Transformador(apiData); 
            const data = await Promise.all(await transformador.countriesApaises());
            this.paises = data;
        }
    }

    private async obtenerPorNombre(nombreDelPais: string): Promise<Pais> {
        const apiData = await this.api.buscarPaisesPorNombre(nombreDelPais);
        const transformador = await new Transformador(apiData); 
        const data = await Promise.all(await transformador.countriesApaises());
        return data[0];
    }

    public async sonLimitrofes(nombrePrimerPais: string, nombreSegundoPais: string):  Promise<boolean> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.esLimitrofeDe(segundoPais);
    }

    public async necesitanTraduccion(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.necesitaTraduccionCon(segundoPais);
    }

    public async pertenecenAlMismoBloqueRegional(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.pertenecenAlMismoBloqueRegional(segundoPais);
    }

    public async potencialesAliados(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.potencialAliadoDe(segundoPais);
    }

    public async convieneIrDeCompras(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.convieneIrDeComprasA(segundoPais);
    }

    public async cuantoEquivale(monto: number, nombrePrimerPais: string, nombreSegundoPais: string): Promise<number> {
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.cuantoEquivaleEn(monto, segundoPais);
    }

    public async losMasPoblados(): Promise<string[]> {
        await this.obtenerTodosLosPaises()
        this.paises.sort((a, b) => a.poblacion > b.poblacion ? -1 : a.poblacion < b.poblacion ? 1 : 0)
        return this.paises.slice(0,5).map(pais => pais.codigoIso3);
    }

    public async continenteConMasPaisesPlurinacionales(): Promise <string> {
        await this.obtenerTodosLosPaises()        
        const africa = { nombre: "Africa", cantidad: 0 };
        const america = { nombre: "America", cantidad: 0 };
        const asia = { nombre: "Asia", cantidad: 0 };
        const europa = { nombre: "Europa", cantidad: 0 };
        const oceania = { nombre: "Oceania", cantidad: 0 };
        this.paises.forEach(pais => {
            if (pais.esPlurinacional()) {
                switch (pais.continente) {
                    case "Africa":
                        africa.cantidad += 1
                        break;
                    case "America":
                        america.cantidad += 1
                        break;
                    case "Asia":
                        asia.cantidad += 1
                        break;
                    case "Europa":
                        europa.cantidad += 1
                        break;
                    case "Oceania":
                        oceania.cantidad += 1
                        break;
                }
            }
        })
        const continentes = [africa, america, asia, europa, oceania];
        return continentes.sort((a, b) => a.cantidad > b.cantidad ? -1 : a.cantidad < b.cantidad ? 1 : 0)[0].nombre;
    }

    public async promedioDeDensidadPoblacional():Promise<number> {
        await this.obtenerTodosLosPaises()        
        const islas = this.paises.filter(pais => pais.esIsla());
        const poblacionTotal = R.sum(islas.map(pais => pais.poblacion));
        return poblacionTotal / islas.length;
    }
}