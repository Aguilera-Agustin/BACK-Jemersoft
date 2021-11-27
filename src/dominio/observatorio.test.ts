import { Observatorio } from './observatorio';
import { Pais } from './pais';
import { ErrorDuplicado, ErrorNoExiste, ErrorMuchosPaises } from '../error';

describe("Observatorio", () => {
    const argentina = new Pais(
        "Argentina",
        "AR",
        42000000,
        2078000000,
        "America",
        "ARS",
        205,
        [],
        ["MERCOSUR"],
        ["Español"],
    );
    const brazil = new Pais(
        "Brazil",
        "BR",
        212000000,
        8516000000,
        "America",
        "RS",
        6,
        [argentina],
        [],
        ["Portugues", "Español"],
    );
    const uruguay = new Pais(
        "Uruguay",
        "UR",
        3000000,
        176215,
        "America",
        "UYU",
        45,
        [brazil, argentina],
        ["MERCOSUR"],
        ["Español"],
    );
    const hawai = new Pais(
        "Hawai",
        "HW",
        1416000,
        28311,
        "America",
        "USD",
        1,
        [],
        [],
        ["Ingles"],
    );
    const españa = new Pais(
        "España",
        "SP",
        47000000,
        500000,
        "Europa",
        "EUR",
        1,
        [],
        [],
        ["Español"],
    );
    argentina.paisesLimitrofes.push(brazil, uruguay);
    brazil.paisesLimitrofes.push(uruguay);
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