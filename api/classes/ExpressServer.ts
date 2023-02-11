import express from "express";
import cors from "cors";

import UserRoutes from "../routes/UserRoutes";
import ItemRoutes from "../routes/ItemRoutes";

/** Classe qui permet d'initialiser un serveur Express */
export class ExpressServer {
    private app: express.Application;
    private port: number | any;

    /**
     * @public
     * @param {number | any} port Port utilisé pour le serveur Express
     */
    public constructor(port: number | any) {
        this.app = express();
        this.port = port;

        this.app.use(express.json());

        this.app.use(cors());

        this.app.use('/api', ItemRoutes);
        this.app.use('/api', UserRoutes);
    }

    /**
     * @description Permet de démarrer le serveur Express.js
     */
    public start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        });
    }
}