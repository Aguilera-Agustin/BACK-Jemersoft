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
            it('Pais no es plurinacional', () => {
                expect(argentina.esPlurinacional()).toBe(false);
            })
            it('Pais es plurinacional', () => {
                expect(brazil.esPlurinacional()).toBe(true);
            })
        });

        describe("esIsla", () => {
            it('Pais no es isla', () => {
                expect(uruguay.esIsla()).toBe(false);
            })
            it('Pais es isla', () => {
                expect(hawai.esIsla()).toBe(true);
            })
        });

        describe("densidadPoblacional", () => {
            it('Pais tiene una densidad poblacional de 17', () => {
                expect(uruguay.densidadPoblacional()).toBe(17);
            })
        });

        describe("vecinoMasPoblado", () => {
            it('Pais mas poblado entre varios', () => {
                expect(argentina.vecinoMasPoblado()).toBe(brazil);
            })
        });
    });

    describe("Metodos para mas de un pais", () => {
        describe("esLimitrofeDe", () => {
            it('Pais no es limitrofe', () => {
                expect(argentina.esLimitrofeDe(hawai)).toBe(false);
            })
            it('Pais es limitrofe', () => {
                expect(brazil.esLimitrofeDe(uruguay)).toBe(true);
            })
        });

        describe("necesitaTraduccionCon", () => {
            it('Pais no necesita traduccion', () => {
                expect(uruguay.necesitaTraduccionCon(brazil)).toBe(false);
            })
            it('Pais necesita traduccion', () => {
                expect(hawai.necesitaTraduccionCon(argentina)).toBe(true);
            })
        });

        describe("potencialAliadoDe", () => {
            it('Pais es potencial aliado', () => {
                expect(uruguay.necesitaTraduccionCon(argentina)).toBe(false)
                expect(uruguay.pertenecenAlMismoBloqueRegional(argentina)).toBe(true)
                expect(uruguay.potencialAliadoDe(argentina)).toBe(true)
            })
            it('Pais no es potencial aliado', () => {
                expect(uruguay.necesitaTraduccionCon(brazil)).toBe(false)
                expect(uruguay.pertenecenAlMismoBloqueRegional(brazil)).toBe(false)
                expect(uruguay.potencialAliadoDe(brazil)).toBe(false)
            })
        });

        describe("convieneIrDeComprasA", () => {
            it('No conviene de ir al Pais', () => {
                expect(argentina.convieneIrDeComprasA(brazil)).toBe(false);
            })
            it('Conviene ir al pais', () => {
                expect(brazil.convieneIrDeComprasA(argentina)).toBe(true);
            })
        });

        describe("cuantoEquivaleEn", () => {
            it('1000 monedas de un Pais equivalen a 30 de otro pais', () => {
                expect(argentina.cuantoEquivaleEn(1000, brazil)).toBe(30);
            })
            it('1000 monedas de un Pais equivalen a 4510 de otro pais', () => {
                expect(uruguay.cuantoEquivaleEn(1000, argentina)).toBe(4510);
            })
        });
    });
});