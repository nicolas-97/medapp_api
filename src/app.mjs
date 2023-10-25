// Config express
import express from 'express';
import morgan from 'morgan';
import { QuerySnapshot } from 'firebase-admin/firestore';
import router from './routes/index.mjs';


const app = express();


app.use(morgan('dev')); // dev -> para que muestre los mensajes por consola

// Configuracion peticion POST
app.use(express.json()); // Para que entienda los datos que vienen en formato JSON


app.use(router);


export default app