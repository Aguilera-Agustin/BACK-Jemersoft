import axios from "axios";
import { identity } from "ramda";

/*
👀 ¡¡ATENCIÓN!!
El código de este archivo *funciona* tal cual está y no debe realizarse ninguna modificación.
Lo incluimos en el proyecto únicamente con fines didácticos, para quienes quieran ver cómo
está hecho. El ejercicio se tiene que resolver sin alterar para nada este archivo.
 */

export abstract class RestAPI {
  abstract get urlBase(): string;

  protected async obtenerRecurso<T>(
    ruta: string,
    transformation: (obj: T) => T = identity
  ): Promise<T> {
    const response = await axios.get<T>(this.urlBase + ruta);
    return transformation(response.data);
  }
}
