import { Pais } from './pais';


describe("Pais", () => {
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
        "USD",
        1416000,
        28311,
        "America",
        "HW",
        1,
        [],
        [],
        ["Ingles"],
    );
    argentina.paisesLimitrofes.push(brazil, uruguay);
    brazil.paisesLimitrofes.push(uruguay);


    describe("Metodos para un pais", () => {
        describe("esPlurinacional", () => {
            it('Argentina no es plurinacional', () => {
                expect(argentina.esPlurinacional()).toBe(false);
            })
            it('Brazil es plurinacional', () => {
                expect(brazil.esPlurinacional()).toBe(true);
            })
        });

        describe("esIsla", () => {
            it('Uruguay no es isla', () => {
                expect(uruguay.esIsla()).toBe(false);
            })
            it('Hawai no es isla', () => {
                expect(hawai.esIsla()).toBe(true);
            })
        });

        describe("densidadPoblacional", () => {
            it('Uruguay tiene una densidad poblacional de 17', () => {
                expect(uruguay.densidadPoblacional()).toBe(17);
            })
        });

        describe("vecinoMasPoblado", () => {
            it('Entre Argentina, Brazil y Uruguay el mas poblado es Brazil', () => {
                expect(argentina.vecinoMasPoblado()).toBe(brazil);
                expect(uruguay.vecinoMasPoblado()).toBe(brazil);
                expect(brazil.vecinoMasPoblado()).toBe(brazil);
            })
            it('Entre Hawai el mas poblado es Hawai', () => {
                expect(hawai.vecinoMasPoblado()).toBe(hawai);
            })
        });
    });

    describe("Metodos para mas de un pais", () => {
        describe("esLimitrofeDe", () => {
            it('Argentina no es limitrofe de Hawai', () => {
                expect(argentina.esLimitrofeDe(hawai)).toBe(false);
            })
            it('Brazil es limitrofe de Uruguay', () => {
                expect(brazil.esLimitrofeDe(uruguay)).toBe(true);
            })
        });

        describe("necesitaTraduccionCon", () => {
            it('Uruguay no necesita traduccion con Brazil', () => {
                expect(uruguay.necesitaTraduccionCon(brazil)).toBe(false);
            })
            it('Hawai necesita traduccion con Argentina', () => {
                expect(hawai.necesitaTraduccionCon(argentina)).toBe(true);
            })
        });

        describe("potencialAliadoDe", () => {
            it('Uruguay es potencial aliado Argentina', () => {
                expect(uruguay.necesitaTraduccionCon(argentina)).toBe(false)
                expect(uruguay.pertenecenAlMismoBloqueRegional(argentina)).toBe(true)
                expect(uruguay.potencialAliadoDe(argentina)).toBe(true)
            })
            it('Uruguay no es potencial aliado Brazil', () => {
                expect(uruguay.necesitaTraduccionCon(brazil)).toBe(false)
                expect(uruguay.pertenecenAlMismoBloqueRegional(brazil)).toBe(false)
                expect(uruguay.potencialAliadoDe(brazil)).toBe(false)
            })
        });

        describe("convieneIrDeComprasA", () => {
            it('No conviene de Argentina a Brazil', () => {
                expect(argentina.convieneIrDeComprasA(brazil)).toBe(false);
            })
            it('Conviene de Brazil a Argentina', () => {
                expect(brazil.convieneIrDeComprasA(argentina)).toBe(true);
            })
        });

        describe("cuantoEquivaleEn", () => {
            it('1000 pesos Argentinos equivalen a 30 reales', () => {
                expect(argentina.cuantoEquivaleEn(1000, brazil)).toBe(30);
            })
            it('1000 pesos Uruguayos equivalen a 4510 pesos argentinos', () => {
                expect(uruguay.cuantoEquivaleEn(1000, argentina)).toBe(4510);
            })
        });
    });
});