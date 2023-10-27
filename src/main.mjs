// Inicio de la app
import app from './app.mjs';
import './firebase.mjs'

app.listen(4000, () => {
    console.log('Servidor iniciado en el puerto 4000');
});