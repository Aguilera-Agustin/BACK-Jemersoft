/*
👀 ¡¡ATENCIÓN!!
El código de este archivo *funciona* tal cual está y no debe realizarse ninguna modificación.
Lo incluimos en el proyecto únicamente con fines didácticos, para quienes quieran ver cómo
está hecho. El ejercicio se tiene que resolver sin alterar para nada este archivo.
 */

import { RestAPI } from "./rest_api";

export class CurrencyConverterAPI extends RestAPI {
  constructor(private apiKey: string) {
    super();
  }

  get urlBase(): string {
    return `https://free.currconv.com/api/v7/convert?compact=ultra&apiKey=${this.apiKey}`;
  }

  async convertirDolarA(codigoMoneda: string): Promise<number> {
    try {
      const data = await this.obtenerRecurso<any>(`&q=USD_${codigoMoneda}`);
      return data[`USD_${codigoMoneda}`];
    } catch (error) {
      // Hack temporal para que no se rompa todo cuando se pasa del límite de requests.
      console.log(error);
      return 1;
    }
  }
}
