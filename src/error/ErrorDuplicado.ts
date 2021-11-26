export class ErrorDuplicado extends Error {
    constructor() {
        super('Los paises que usted ingresó son iguales');
        Object.setPrototypeOf(this, ErrorDuplicado.prototype);
    }
    msg():string {
        return "ERROR DUPLICADO - " + this.message;
    }
}