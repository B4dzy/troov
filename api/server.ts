import dotenv from 'dotenv';

import { ExpressServer } from './classes/ExpressServer';
import { MongooseConnection } from './classes/MongooseConnection';

import ItemRoutes from './routes/ItemRoutes';
import UserRoutes from './routes/UserRoutes';

dotenv.config();

const mongooseConnection = MongooseConnection.getInstance('mongodb://' + process.env.HOST_NAME + '/' + process.env.DATABASE_NAME);
const expressServer = new ExpressServer(process.env.PORT || 1337);

// Init Mongoose Connection
mongooseConnection.connect();

// Init Express Server
expressServer.start();