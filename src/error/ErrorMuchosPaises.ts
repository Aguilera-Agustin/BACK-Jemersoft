export class ErrorMuchosPaises extends Error {
    constructor() {
        super('La busqueda que realizó trajo varios resultados');
        Object.setPrototypeOf(this, ErrorMuchosPaises.prototype);
    }
    msg():string {
        return "ERROR - Se encontraron muchos paises que coinciden con tu búsqueda - " + this.message;
    }
}