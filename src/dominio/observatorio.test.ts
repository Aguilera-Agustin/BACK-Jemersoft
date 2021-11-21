import { Observatorio } from './observatorio';
import { Pais } from './pais';

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
    const observatorio = new Observatorio([argentina, brazil, uruguay, hawai, españa]);

    describe("Metodos para mas de un pais", () => {
        describe("esLimitrofeDe", () => {
            it('Argentina no es limitrofe de Hawai', () => {
                expect(observatorio.sonLimitrofes("Argentina", "Hawai")).toBe(false);
            })
            it('Brazil es limitrofe de Uruguay', () => {
                expect(observatorio.sonLimitrofes("Brazil", "Uruguay")).toBe(true);
            })
        });

        describe("necesitaTraduccionCon", () => {
            it('Uruguay no necesita traduccion con Brazil', () => {
                expect(observatorio.necesitanTraduccion("Uruguay", "Brazil")).toBe(false);
            })
            it('Hawai necesita traduccion con Argentina', () => {
                expect(observatorio.necesitanTraduccion("Hawai", "Argentina")).toBe(true);
            })
        });

        describe("potencialAliadoDe", () => {
            it('Uruguay es potencial aliado Argentina', () => {
                expect(observatorio.potencialesAliados("Uruguay", "Argentina")).toBe(true)
            })
            it('Uruguay no es potencial aliado Brazil', () => {
                expect(observatorio.potencialesAliados("Uruguay", "Brazil")).toBe(false)
            })
        });

        describe("convieneIrDeComprasA", () => {
            it('No conviene de Argentina a Brazil', () => {
                expect(observatorio.convieneIrDeCompras("Argentina", "Brazil")).toBe(false);
            })
            it('Conviene de Brazil a Argentina', () => {
                expect(observatorio.convieneIrDeCompras("Brazil", "Argentina")).toBe(true);
            })
        });

        describe("cuantoEquivaleEn", () => {
            it('1000 pesos Argentinos equivalen a 30 reales', () => {
                expect(observatorio.cuantoEquivale(1000, "Argentina", "Brazil")).toBe(30);
            })
            it('1000 pesos Uruguayos equivalen a 4510 pesos argentinos', () => {
                expect(observatorio.cuantoEquivale(1000, "Uruguay", "Argentina")).toBe(4510);
            })
        });
    });
    describe("Metodos para todos los paises", () => {
        describe("losMasPoblados", () => {
            it('Los 5 mas poblados por codigo ISO', () => {
                expect(observatorio.losMasPoblados()).toEqual(["BR", "SP", "AR", "UR", "HW"]);
            })
        });

        describe("continenteConMasPaisesPlurinacionales", () => {
            it('America es el pais con mas plurinacionales por brazil', () => {
                expect(observatorio.continenteConMasPaisesPlurinacionales()).toEqual("America");
            })
        });

        describe("promedioDeDensidadPoblacional", () => {
            it('El promedio de las islas Hawai y España es', () => {
                expect(observatorio.promedioDeDensidadPoblacional()).toEqual(24208000);
            })
        });
    });
});