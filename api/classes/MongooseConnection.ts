import mongoose from "mongoose";

export class MongooseConnection {
    private static instance: MongooseConnection;
    private readonly uri: string;

    private constructor(uri: string) {
        this.uri = uri;
    }

    static getInstance(uri: string) {
        if (!MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection(uri);
        }

        return MongooseConnection.instance;
    }

    connect() {
        mongoose.set("strictQuery", false);

        mongoose.connect(this.uri)
            .then(() => console.log('MongoDB database connection established successfully!'))
            .catch(err => console.error(err));
    }
}