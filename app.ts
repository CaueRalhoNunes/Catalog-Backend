import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { route } from './routes';

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(route);
dotenv.config();

const connection = async (): Promise<void> => {
   await mongoose
      .connect(
         `mongodb+srv://${process.env.USER_NAME}:${process.env.ACCESS_KEY}@catalogdb.rselcvp.mongodb.net/?retryWrites=true&w=majority`
      )
      .then(() => {
         console.log(`MongoDB is connected to the application`);
      })
      .catch(() => {
         console.log(`MongoDB connection failed`);
      });
};

const port: number = 3000;
app.listen(port, () => {
   connection();
   console.log(`Application is running on port: ${port}`);
});
