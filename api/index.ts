import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import ItemRoutes from './routes/ItemRoutes';
import UserRoutes from './routes/UserRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose.connect('mongodb://' + process.env.HOST_NAME + '/' + process.env.DATABASE_NAME);

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

connection.on('error', (error) => {
  console.error(error);
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express Server');
});

app.use('/api', ItemRoutes);
app.use('/api', UserRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});