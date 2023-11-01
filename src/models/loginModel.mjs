import { db } from '../config/firebase-config.mjs';


function validateLogin(usuario, password) {
    // validacion de usuario
    return db.collection('users').where('usuario', '==', usuario).where('password', '==', password).get();   
}

async function consultEmailUser(email) {
    
    // consultar si el usuario existe
    const data = await db.collection('users').where('correo', '==', email).get();
    if( data.docs[0] === undefined ) return false; // si no existe el usuario
    return true;

}

export {
    validateLogin,
    consultEmailUser
}