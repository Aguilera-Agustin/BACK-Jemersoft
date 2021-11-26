export class ErrorNoExiste extends Error {
    constructor() {
        super('Su búsqueda no se ajusta a ningún país existente');
        Object.setPrototypeOf(this, ErrorNoExiste.prototype);
    }
    msg():string {
        return "ERROR  - Recurso inexistente" + this.message;
    }
}