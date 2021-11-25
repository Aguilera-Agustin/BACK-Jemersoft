export class ErrorNoExiste extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ErrorNoExiste.prototype);
    }
    msg():string {
        return "ERROR  - Recurso inexistente" + this.message;
    }
}