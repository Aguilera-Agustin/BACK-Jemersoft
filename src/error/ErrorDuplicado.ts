export class ErrorDuplicado extends Error {
    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ErrorDuplicado.prototype);
    }
    msg():string {
        return "ERROR DUPLICADO - " + this.message;
    }
}