import promptSync from "prompt-sync";

/*
👀 ¡¡ATENCIÓN!!
El código de este archivo *funciona* tal cual está y no debe realizarse ninguna modificación.
Lo incluimos en el proyecto únicamente con fines didácticos, para quienes quieran ver cómo
está hecho. El ejercicio se tiene que resolver sin alterar para nada este archivo.
 */

const prompt = promptSync();

export const consola = {
  escribir(mensaje: string): void {
    console.log(mensaje);
  },

  leer(mensaje: string): string {
    return prompt(`${mensaje} `);
  },
};
