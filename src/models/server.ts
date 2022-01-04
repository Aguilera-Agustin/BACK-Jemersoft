import express, { Application } from 'express'
import cors from 'cors'
import PokemonRoutes from '../routes/pokemon'

class Server {

    private app : Application;
    private port : string;
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
        this.port = '8080'

    }


    middlewares(): void {
        this.app.use(cors())
        this.app.use(express.json())
    }


    routes(): void {
        this.app.use('/api/pokemon', PokemonRoutes)
    }



    listen(): void {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        })
    }

}

export default Server;