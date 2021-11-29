import R from 'ramda'
import { Pais } from './pais';
import { RestCountriesAPI, Country } from '../api/rest_countries_api';
import { Transformador } from './transformador';
import { isEmpty } from 'ramda';
import { ErrorDuplicado, ErrorNoExiste, ErrorMuchosPaises } from '../error';

export class Observatorio {

    public paises: Pais[] = [];
    public api: RestCountriesAPI

    constructor() {
        this.api = new RestCountriesAPI();
    }

    public async obtenerPorNombre(nombreDelPais: string): Promise<Pais> {
        const apiData = await this.api.buscarPaisesPorNombre(nombreDelPais);
        await this.validarMuchosPaises(apiData);
        await this.validarExistenciaPais(apiData);
        const transformador = await new Transformador(apiData);
        const data = await Promise.all(await transformador.countriesApaises());
        return data[0];
    }

    private async obtenerTodosLosPaises() {
        if (this.paises.length === 0) {
            const apiData = await this.api.todosLosPaises();
            const transformador = await new Transformador(apiData);
            const data = await Promise.all(await transformador.countriesApaises());
            this.paises = data;
        }
    }

    public async sonLimitrofes(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.esLimitrofeDe(segundoPais);
    }

    public async necesitanTraduccion(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.necesitaTraduccionCon(segundoPais);
    }

    public async pertenecenAlMismoBloqueRegional(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.pertenecenAlMismoBloqueRegional(segundoPais);
    }

    public async potencialesAliados(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.potencialAliadoDe(segundoPais);
    }

    public async convieneIrDeCompras(nombrePrimerPais: string, nombreSegundoPais: string): Promise<boolean> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.convieneIrDeComprasA(segundoPais);
    }

    public async cuantoEquivale(monto: number, nombrePrimerPais: string, nombreSegundoPais: string): Promise<number> {
        this.validarDuplicado(nombrePrimerPais, nombreSegundoPais);
        const primerPais = await this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = await this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.cuantoEquivaleEn(monto, segundoPais);
    }

    public async losMasPoblados(): Promise<string[]> {
        await this.obtenerTodosLosPaises()
        this.paises.sort((a, b) => a.poblacion > b.poblacion ? -1 : a.poblacion < b.poblacion ? 1 : 0)
        return this.paises.slice(0, 5).map(pais => pais.codigoIso3);
    }

    public async continenteConMasPaisesPlurinacionales(): Promise<string> {
        await this.obtenerTodosLosPaises();
        const resultado = {} as { [key: string]: number };
        this.paises.forEach((pais) => {
            if (!pais.esPlurinacional())
                return;
            if (!resultado[pais.continente]) {
                resultado[pais.continente] = 1;
            } else {
                resultado[pais.continente] += 1;
            }
        });
        return Object.entries(resultado).sort((a, b) =>
            a[1] > b[1] ? -1 : a[1] < b[1] ? 1 : 0
        )[0][0];
    }

    public async promedioDeDensidadPoblacional(): Promise<number> {
        await this.obtenerTodosLosPaises()
        const islas = this.paises.filter(pais => pais.esIsla());
        const poblacionTotal = R.sum(islas.map(pais => pais.poblacion));
        return poblacionTotal / islas.length;
    }

    private validarDuplicado(primerPais: string, segundoPais: string): void {
        if (primerPais === segundoPais) throw new ErrorDuplicado()
    }
    private validarMuchosPaises(country: Country[]): void {
        if (country.length > 1) throw new ErrorMuchosPaises()
    }
    private validarExistenciaPais(country: Country[]): void {
        if (isEmpty(country)) throw new ErrorNoExiste()
    }
}