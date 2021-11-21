export class Pais {

    public nombre: string;
    public codigoIso3: string;
    public poblacion: number;
    public superficie: number;
    public continente: string;
    public codigoMoneda: string;
    public cotizacionDolar: number;
    public paisesLimitrofes: Pais[];
    public bloquesRegionales: string[];
    public idiomasOficiales: string[];

    constructor(
        nombre: string, codigoIso3: string,
        poblacion: number, superficie: number,
        continente: string, codigoMoneda: string,
        cotizacionDolar: number, paisesLimitrofes: Pais[],
        bloquesRegionales: string[], idiomasOficiales: string[]) {
        this.nombre = nombre;
        this.codigoIso3 = codigoIso3;
        this.poblacion = poblacion;
        this.superficie = superficie;
        this.continente = continente;
        this.codigoMoneda = codigoMoneda;
        this.cotizacionDolar = cotizacionDolar;
        this.paisesLimitrofes = paisesLimitrofes;
        this.bloquesRegionales = bloquesRegionales;
        this.idiomasOficiales = idiomasOficiales;
    }

    public esPlurinacional(): boolean {
        return this.idiomasOficiales.length > 1;
    }

    public esIsla(): boolean {
        return this.paisesLimitrofes.length === 0;
    }

    public densidadPoblacional(): number {
        return Math.round(this.poblacion / this.superficie);
    }

    public vecinoMasPoblado(): Pais | undefined {
        const poblacionDePaisesLimitrofes = this.paisesLimitrofes.map((pais) => {
            return pais.poblacion;
        });
        poblacionDePaisesLimitrofes.push(this.poblacion);
        const mayorPoblacion = Math.max(...poblacionDePaisesLimitrofes)
        if (this.poblacion === mayorPoblacion) {
            return this;
        } else {
            return this.paisesLimitrofes.find(pais => pais.poblacion === mayorPoblacion);
        }
    }

    public esLimitrofeDe(pais: Pais): boolean {
        return this.paisesLimitrofes.includes(pais);
    }

    public necesitaTraduccionCon(pais: Pais): boolean {
        return this.idiomasOficiales.filter(idioma =>
            pais.idiomasOficiales.indexOf(idioma) !== -1
        ).length === 0;
    }

    public pertenecenAlMismoBloqueRegional(pais: Pais): boolean {
        return this.bloquesRegionales.filter(bloque =>
            pais.bloquesRegionales.indexOf(bloque) !== -1
        ).length !== 0;
    }

    public potencialAliadoDe(pais: Pais): boolean {
        return !this.necesitaTraduccionCon(pais) && this.pertenecenAlMismoBloqueRegional(pais)
    }

    public convieneIrDeComprasA(pais: Pais): boolean {
        return this.cotizacionDolar > pais.cotizacionDolar ? false : true;
    }

    public cuantoEquivaleEn(monto: number, pais: Pais) {
        const valorEnDolaresEnPaisOrigen = Math.round(monto / this.cotizacionDolar);
        return valorEnDolaresEnPaisOrigen * pais.cotizacionDolar;
    }
}