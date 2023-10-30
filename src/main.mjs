// Inicio de la app
import app from './app.mjs';
import './firebase.mjs'
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto 4000');
});