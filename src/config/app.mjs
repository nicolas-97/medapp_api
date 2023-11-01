// Config express
import express from 'express';
import morgan from 'morgan';
import router from '../routes/routes.mjs';


const app = express();


app.use(morgan('dev')); // dev -> para que muestre los mensajes por consola

// Configuracion peticion POST
app.use(express.json()); // Para que entienda los datos que vienen en formato JSON


app.use(router);


export default app