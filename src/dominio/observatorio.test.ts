import { Observatorio } from './observatorio';
import { ErrorDuplicado, ErrorNoExiste, ErrorMuchosPaises } from '../error';

describe("Observatorio", () => {

    const observatorio = new Observatorio();

    describe("Metodos para mas de un pais", () => {
        describe("esLimitrofeDe", () => {
            it('Argentina no es limitrofe de Mexico', async () => {
                expect(await observatorio.sonLimitrofes("Argentina", "Mexico")).toBe(false);
            })
            it('Argentina es limitrofe de Chile', async () => {
                expect(await observatorio.sonLimitrofes("Argentina", "Chile")).toBe(true);
            })
        });

        describe("necesitaTraduccionCon", () => {
            it('Argentina no necesita traduccion con Chile', async () => {
                expect(await observatorio.necesitanTraduccion("Argentina", "Chile")).toBe(false);
            })
            it('Portugal necesita traduccion con Argentina', async () => {
                expect(await observatorio.necesitanTraduccion("Portugal", "Argentina")).toBe(true);
            })
        });

        describe("potencialAliadoDe", () => {
            it('Uruguay es potencial aliado Argentina', async () => {
                expect(await observatorio.potencialesAliados("Uruguay", "Argentina")).toBe(true)
            })
            it('Uruguay no es potencial aliado Brazil', async () => {
                expect(await observatorio.potencialesAliados("Uruguay", "Brazil")).toBe(false)
            })
        });

    //     describe("convieneIrDeComprasA", () => {
    //         it('No conviene de Argentina a Brazil', () => {
    //             expect(observatorio.convieneIrDeCompras("Argentina", "Brazil")).toBe(false);
    //         })
    //         it('Conviene de Brazil a Argentina', () => {
    //             expect(observatorio.convieneIrDeCompras("Brazil", "Argentina")).toBe(true);
    //         })
    //     });

    //     describe("cuantoEquivaleEn", () => {
    //         it('1000 pesos Argentinos equivalen a 30 reales', () => {
    //             expect(observatorio.cuantoEquivale(1000, "Argentina", "Brazil")).toBe(30);
    //         })
    //         it('1000 pesos Uruguayos equivalen a 4510 pesos argentinos', () => {
    //             expect(observatorio.cuantoEquivale(1000, "Uruguay", "Argentina")).toBe(4510);
    //         })
    //     });      Comentado hasta que no esté conectada la currency api
    });              

    describe("Metodos para todos los paises", () => {
        describe("losMasPoblados", () => {
            it('Los 5 mas poblados por codigo ISO', async () => {
                expect(await observatorio.losMasPoblados()).toEqual([ "CHN", "IND", "USA", "IDN", "PAK"]);
            })
        });

        describe("continenteConMasPaisesPlurinacionales", () => {
            it('Africa es el pais con mas plurinacionales', async() => {
                expect(await observatorio.continenteConMasPaisesPlurinacionales()).toEqual("Africa");
            })
        });

        describe("promedioDeDensidadPoblacional", () => {
            it('El promedio de las islas Hawai y España es', async () => {
                expect(await observatorio.promedioDeDensidadPoblacional()).toEqual(4310170.164705883);
            })
        });
    });
    describe("Debe fallar", () => {
        it("si se pasan dos paises iguales", async () => {
            try {
                await observatorio.necesitanTraduccion("Argentina", "Argentina")
            } catch (error) {
                expect(error).toBeInstanceOf(ErrorDuplicado)   
            }
        });
        it("si el pais no existe", async () => {
            try {
                await observatorio.necesitanTraduccion("Argentina", "Sarasa")
            } catch (error) {
                expect(error).toBeInstanceOf(ErrorNoExiste)   
            }
        });
        it("si se encuentran varios paises", async () => {
            try {
                await observatorio.necesitanTraduccion("Argentina", "A")
            } catch (error) {
                expect(error).toBeInstanceOf(ErrorMuchosPaises)   
            }
        });
    });
});