export class ErrorDuplicado extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ErrorDuplicado.prototype);
    }
    msg():string {
        return "ERROR - Se encontraron muchos paises que coinciden con tu búsqueda - " + this.message;
    }
}