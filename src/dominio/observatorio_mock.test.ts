import { ErrorDuplicado, ErrorNoExiste, ErrorMuchosPaises } from '../error';
import { CurrencyConverterAPI } from '../mocks/currency_converter_api';
import { RestCountriesAPI } from '../mocks/rest_countries_api';
import { Observatorio } from './observatorio';
import { Transformador } from './transformador';

describe("Observatorio", () => {
  const observatorio = new Observatorio();
  observatorio.api = new RestCountriesAPI();
  observatorio.currency = new CurrencyConverterAPI('d956ad8ad88fce288555')
  observatorio.transformador = new Transformador(new CurrencyConverterAPI('d956ad8ad88fce288555'))
  describe("Metodos para mas de un pais", () => {
    describe("esLimitrofeDe", () => {
      it("Argentina no es limitrofe de Mexico", async () => {
        expect(await observatorio.sonLimitrofes("Argentina", "Mexico")).toBe(
          false
        );
      });
      it("Argentina es limitrofe de Chile", async () => {
        expect(await observatorio.sonLimitrofes("Argentina", "Chile")).toBe(
          true
        );
      });
    });

    describe("necesitaTraduccionCon", () => {
      it("Argentina no necesita traduccion con Chile", async () => {
        expect(
          await observatorio.necesitanTraduccion("Argentina", "Chile")
        ).toBe(false);
      });
      it("Portugal necesita traduccion con Argentina", async () => {
        expect(
          await observatorio.necesitanTraduccion("Portugal", "Argentina")
        ).toBe(true);
      });
    });

    describe("potencialAliadoDe", () => {
      it("Uruguay es potencial aliado Argentina", async () => {
        expect(
          await observatorio.potencialesAliados("Uruguay", "Argentina")
        ).toBe(true);
      });
      it("Uruguay no es potencial aliado Brazil", async () => {
        expect(await observatorio.potencialesAliados("Uruguay", "Brazil")).toBe(
          false
        );
      });
    });

    describe("convieneIrDeComprasA", () => {
      it("No conviene de Argentina a Brazil", async () => {
        expect(
          await observatorio.convieneIrDeCompras("Argentina", "Brazil")
        ).toBe(false);
      });
    });

    describe("cuantoEquivaleEn", () => {
      it("1000 pesos Argentinos equivalen a 56 reales", async () => {
        expect(
          await observatorio.cuantoEquivale(1000, "Argentina", "Brazil")
        ).toBe(56.1);
      });
      it("1000 pesos Uruguayos equivalen a 2318.17 pesos argentinos", async () => {
        expect(
          await observatorio.cuantoEquivale(1000, "Uruguay", "Argentina")
        ).toBe(2318.17);
      });
    });
  });

    describe("Metodos para todos los paises", () => {
        describe("losMasPoblados", () => {
        it("Los 5 mas poblados por codigo ISO", async () => {
            expect(await observatorio.losMasPoblados()).toEqual([
            "USA",
            "BRA",
            "MEX",
            "FRA",
            "COL",
            ]);
        });
        });

        describe("continenteConMasPaisesPlurinacionales", () => {
        it("Africa es el pais con mas plurinacionales", async () => {
            expect(
            await observatorio.continenteConMasPaisesPlurinacionales()
            ).toEqual("Americas");
        });
        });

        describe("promedioDeDensidadPoblacional", () => {
        it("El promedio de las islas Hawai y España es", async () => {
            expect(await observatorio.promedioDeDensidadPoblacional()).toEqual(
            35174581.277777776
            );
        });
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
