import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import itemsRouter from './routes/item.js'
import cors from 'cors'


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use('/items', itemsRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + Hello World');
});



app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  dbConnect();
});

const dbConnect = () =>{
  mongoose.connect("mongodb://localhost:27017/frying-nemo")
  .then(()=>{
    console.log(`🤣 [server]: conneect to MongoDB`)
  })
  .catch((err)=>{
    console.log(`😔 [server]:Faild conneect to MongoDB ${err}`)
  })
}