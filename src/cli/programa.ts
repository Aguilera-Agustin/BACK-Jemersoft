import { isEmpty } from "ramda";
import { RestCountriesAPI } from "../api/rest_countries_api";
import { AsciiArt } from "./ascii_art";
import { consola } from "./consola";

export default {
  // Los argumentos que recibe se pueden pasar al ejecutar el programa desde la consola:
  // npm start -- algo 2 "otra cosa"
  api: new RestCountriesAPI(),

  async ejecutar(_args: string[] = []): Promise<void> {
    consola.escribir(AsciiArt.mundo);
    const pais = consola.leer(
      "Hola, poné el nombre de un país y te mostramos algo de data:"
    );

    const paisesEncontrados = await this.api.buscarPaisesPorNombre(pais);

    if (isEmpty(paisesEncontrados)) {
      throw new Error("😕 No encontramos nada, fijate si lo escribiste bien");
    }

    paisesEncontrados.forEach((it) => {
      consola.escribir(
        `${it.name} (${it.alpha3Code}) es un país de ${it.region}, con una población de ${it.population} habitantes.`
      );
    });
  },
};
