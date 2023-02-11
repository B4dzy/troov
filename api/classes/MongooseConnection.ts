import mongoose from "mongoose";

/** Classe qui permet d'initialiser une connexion à MongoDB */
export class MongooseConnection {
    private static instance: MongooseConnection;
    private readonly uri: string;

    /**
     * @private
     * @param {string} uri URI de connexion à MongoDB
     */
    private constructor(uri: string) {
        this.uri = uri;
    }

    /**
     * @static
     * @description Permet de récupérer l'instance Mongoose initialisé
     * @param {string} uri URI de connexion à MongoDB
     * @returns {MongooseConnection.instance} Instance Mongoose
     */
    static getInstance(uri: string): MongooseConnection {
        if (!MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection(uri);
        }

        return MongooseConnection.instance;
    }

    /**
     * @public
     * @description Permet d'établir une connexion Mongoose
     */
    public connect() {
        mongoose.set("strictQuery", false);

        mongoose.connect(this.uri)
            .then(() => console.log('MongoDB database connection established successfully!'))
            .catch(err => console.error(err));
    }
}