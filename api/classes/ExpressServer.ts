import express from "express";
import cors from "cors";

import UserRoutes from "../routes/UserRoutes";
import ItemRoutes from "../routes/ItemRoutes";

export class ExpressServer {
    private app: express.Application;
    private port: number | any;

    constructor(port: number | any) {
        this.app = express();
        this.port = port;

        this.app.use(express.json());

        this.app.use(cors());

        this.app.use('/api', ItemRoutes);
        this.app.use('/api', UserRoutes);
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Server started on port ${this.port}`)
        })
    }
}