import R from 'ramda'
import { Pais } from './pais';
export class Observatorio {

    public paises: Pais[];

    constructor(paises: Pais[]) {
        this.paises = paises;
    }

    private obtenerPorNombre(nombreDelPais: string): Pais {
        const pais = this.paises.find(pais => pais.nombre === nombreDelPais);
        return pais ? pais : new Pais("", "", 0, 0, "", "", 0, [], [], []);
    }

    public sonLimitrofes(nombrePrimerPais: string, nombreSegundoPais: string): boolean {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.esLimitrofeDe(segundoPais);
    }

    public necesitanTraduccion(nombrePrimerPais: string, nombreSegundoPais: string):boolean {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.necesitaTraduccionCon(segundoPais);
    }

    public pertenecenAlMismoBloqueRegional(nombrePrimerPais: string, nombreSegundoPais: string):boolean {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.pertenecenAlMismoBloqueRegional(segundoPais);
    }

    public potencialesAliados(nombrePrimerPais: string, nombreSegundoPais: string):boolean {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.potencialAliadoDe(segundoPais);
    }

    public convieneIrDeCompras(nombrePrimerPais: string, nombreSegundoPais: string):boolean {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.convieneIrDeComprasA(segundoPais);
    }

    public cuantoEquivale(monto: number, nombrePrimerPais: string, nombreSegundoPais: string):number {
        const primerPais = this.obtenerPorNombre(nombrePrimerPais);
        const segundoPais = this.obtenerPorNombre(nombreSegundoPais);
        return primerPais.cuantoEquivaleEn(monto, segundoPais);
    }

    public losMasPoblados(): string[] {
        this.paises.sort((a, b) => a.poblacion > b.poblacion ? -1 : a.poblacion < b.poblacion ? 1 : 0)
        return this.paises.slice(0,5).map(pais => pais.codigoIso3);
    }

    public continenteConMasPaisesPlurinacionales(): string {
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

    public promedioDeDensidadPoblacional():number {
        const islas = this.paises.filter(pais => pais.esIsla());
        const poblacionTotal = R.sum(islas.map(pais => pais.poblacion));
        return poblacionTotal / islas.length;
    }
}