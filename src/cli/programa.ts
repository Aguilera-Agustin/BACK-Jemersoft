
import { exit } from "process";
import { isEmpty } from "ramda";
import { RestCountriesAPI } from "../api/rest_countries_api";
import { Observatorio } from "../dominio/observatorio";
import { AsciiArt, Menu } from "./ascii_art";
import { consola } from "./consola";

export default {
  // Los argumentos que recibe se pueden pasar al ejecutar el programa desde la consola:
  // npm start -- algo 2 "otra cosa"
  api: new RestCountriesAPI(),

  async ejecutar(_args: string[] = []): Promise<void> {
    consola.escribir(AsciiArt.mundo);
    while (true) {
      const observatorio = new Observatorio();
      const opcion = consola.leer(Menu.principal)
      let primerPais = null;
      let segundoPais = null;
      switch (opcion) {
        case "1.1":
          primerPais = await observatorio.obtenerPorNombre(consola.leer("Ingresa el nombre del pais:"));
          console.clear();
          consola.escribir("Saber si es plurinacional");
          primerPais.esPlurinacional() ? consola.escribir("Si") : consola.escribir("No");
          break
        case "1.2":
          primerPais = await observatorio.obtenerPorNombre(consola.leer("Ingresa el nombre del pais:"));
          console.clear();
          consola.escribir("Saber si es una isla");
          primerPais.esIsla() ? consola.escribir("Si") : consola.escribir("No");
          break
        case "1.3":
          primerPais = await observatorio.obtenerPorNombre(consola.leer("Ingresa el nombre del pais:"));
          console.clear();
          consola.escribir("Saber su densidad poblacional");
          consola.escribir(primerPais.densidadPoblacional().toString());
          break
        case "1.4":
          primerPais = await observatorio.obtenerPorNombre(consola.leer("Ingresa el nombre del pais:"));
          const data = primerPais.vecinoMasPoblado();
          console.clear();
          consola.escribir("Saber cual es su vecino mas poblado");
          (data !== undefined) ? consola.escribir(data.nombre) : consola.escribir("No se encontro informacion");
          break
        case "2.1":
          primerPais = consola.leer("Ingresa el nombre del primer pais:");
          segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
          console.clear();
          consola.escribir("Saber si son limitrofes");
          (await observatorio.sonLimitrofes(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.2":
          primerPais = consola.leer("Ingresa el nombre del primer pais:");
          segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
          console.clear();
          consola.escribir("Saber si necesitan traduccion");
          (await observatorio.necesitanTraduccion(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.3":
          primerPais = consola.leer("Ingresa el nombre del primer pais:");
          segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
          console.clear();
          consola.escribir("Saber si son potenciales aliados");
          (await observatorio.potencialesAliados(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.4":
          primerPais = consola.leer("Ingresa el nombre del primer pais:");
          segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
          console.clear();
          consola.escribir("Saber si conviene ir de compras");
          (await observatorio.convieneIrDeCompras(primerPais, segundoPais)) ? consola.escribir("Si") : consola.escribir("No")
          break
        case "2.5":
          primerPais = consola.leer("Ingresa el nombre del primer pais:");
          segundoPais = consola.leer("Ingresa el nombre del segundo pais:");
          const monto = consola.leer("Ingresa el monto:");
          console.clear();
          consola.escribir("Saber cuanto equivale el cambio de moneda");
          consola.escribir(await (await observatorio.cuantoEquivale(parseInt(monto), primerPais, segundoPais)).toString());
          break
        case "3.1":
          console.clear();
          consola.escribir("Saber los códigos ISO de los 5 países con mayor densidad poblacional");
          consola.escribir(await (await observatorio.losMasPoblados()).toString());
          break
        case "3.2":
          console.clear();
          consola.escribir("Saber el nombre del continente con más paises plurinacionales");
          consola.escribir(await (await observatorio.continenteConMasPaisesPlurinacionales()).toString());
          break
        case "3.3":
          console.clear();
          consola.escribir("Saber el promedio de densidad poblacional de los países que son islas");
          consola.escribir(await (await observatorio.promedioDeDensidadPoblacional()).toString());
          break
        case "4":
          console.clear();
          consola.escribir("Salir del programa");
          exit();
          break
        default:
          console.clear();
          consola.escribir("Opcion incorrecta");
          exit()
          break
      }
    }
  },
};
