import { Pais } from './../dominio/pais';
import { Observatorio } from "../dominio/observatorio";
import { AsciiArt, Menu } from "./ascii_art";
import { consola } from "./consola";
import { RestCountriesAPI } from '../api/rest_countries_api';


const getDataForOneCountry = async (observatorio: Observatorio, text: string) => {
  const primerPais = await observatorio.obtenerPorNombre(consola.leer("Ingresa el nombre del pais:"));
  console.clear();
  consola.escribir(text);
  return primerPais;
}

const printForTwoCountry = (text: string) => {
  const primerPais = consola.leer("Ingresa el nombre del primer pais:");
  const segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
  console.clear();
  consola.escribir(text);
  return [primerPais, segundoPais];
}

const printForGeneral = (text: string) => {
  console.clear();
  consola.escribir(text);
}

export default {
  // Los argumentos que recibe se pueden pasar al ejecutar el programa desde la consola:
  // npm start -- algo 2 "otra cosa"
  api: new RestCountriesAPI(),
  observatorio: new Observatorio(),
  async ejecutar(_args: string[] = []): Promise<void> {
    consola.escribir(AsciiArt.mundo);
    const observatorio = this.observatorio;
    let finish = true;
    while (finish) {
      const opcion = consola.leer(Menu.principal)
      observatorio.api = this.api;
      let primerPais = null;
      let segundoPais = null;
      let countrys = null;
      switch (opcion) {
        case "1.1":
          primerPais = await getDataForOneCountry(observatorio, "Saber si es plurinacional");
          primerPais.esPlurinacional() ? consola.escribir("Si") : consola.escribir("No");
          break
        case "1.2":
          primerPais = await getDataForOneCountry(observatorio, "Saber si es una isla");
          primerPais.esIsla() ? consola.escribir("Si") : consola.escribir("No");
          break
        case "1.3":
          primerPais = await getDataForOneCountry(observatorio, "Saber su densidad poblacional");
          consola.escribir(primerPais.densidadPoblacional().toString());
          break
        case "1.4":
          primerPais = await getDataForOneCountry(observatorio, "Saber cual es su vecino mas poblado");
          const data = primerPais.vecinoMasPoblado();
          (data !== undefined) ? consola.escribir(data.nombre) : consola.escribir("No se encontro informacion");
          break;
        case "2.1":
          countrys = printForTwoCountry("Saber si son limitrofes")
          primerPais = countrys[0];
          segundoPais = countrys[1];
          (await observatorio.sonLimitrofes(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break;
        case "2.2":
          countrys = printForTwoCountry("Saber si necesitan traduccion")
          primerPais = countrys[0];
          segundoPais = countrys[1];
          (await observatorio.necesitanTraduccion(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break;
        case "2.3":
          countrys = printForTwoCountry("Saber si son potenciales aliados")
          primerPais = countrys[0];
          segundoPais = countrys[1];
          (await observatorio.potencialesAliados(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.4":
          countrys = printForTwoCountry("Saber si conviene ir de compras")
          primerPais = countrys[0];
          segundoPais = countrys[1];
          (await observatorio.convieneIrDeCompras(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.5":
          countrys = printForTwoCountry("Saber cuanto equivale el cambio de moneda")
          primerPais = countrys[0];
          segundoPais = countrys[1];
          const monto = consola.leer("Ingresa el monto:");
          consola.escribir((await observatorio.cuantoEquivale(parseInt(monto), primerPais, segundoPais)).toString());
          break
        case "3.1":
          printForGeneral("Saber los códigos ISO de los 5 países con mayor densidad poblacional")
          consola.escribir((await observatorio.losMasPoblados()).toString());
          break
        case "3.2":
          printForGeneral("Saber el nombre del continente con más paises plurinacionales")
          consola.escribir((await observatorio.continenteConMasPaisesPlurinacionales()).toString());
          break
        case "3.3":
          printForGeneral("Saber el promedio de densidad poblacional de los países que son islas")
          consola.escribir((await observatorio.promedioDeDensidadPoblacional()).toString());
          break
        case "4":
          printForGeneral("Salir del programa")
          finish = false;
          break
        default:
          printForGeneral("Opcion incorrecta")
          finish = false;
          break
      }
    }
  },
};
