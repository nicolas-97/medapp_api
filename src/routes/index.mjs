import { Router } from 'express';
import { db } from '../firebase.mjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = Router();
const secretKey = process.env.SECRET_KEY


/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */

function generateAccessToken(user) {

    // El token se genera con la informacion del usuario y la clave secreta
    return jsonwebtoken.sign({ data: user }, secretKey, { expiresIn: '10m' });
}

// Validación del token
function validateToken(req, res, next) {
    const accesToken = req.header('auth-token');
    if(!accesToken) res.send('Lo siento, necesitas un token');

    jsonwebtoken.verify(accesToken, secretKey, (err, user) => {
        if(err){
            res.send('Token no valido');
        }else{
            next();
        }
    })
}


// Autenticacion de usuario
router.get('/login', async (req, res) => {

    const { usuario, password } = req.body;

    const querySnapshot = await db.collection('users').where('usuario', '==', usuario).where('password', '==', password).get();   

    // returna mensaje de error si no encuentra el usuario
    if(querySnapshot.docs[0] === undefined) return res.send('Usuario o contraseña incorrectos');

    // Generar token
    const accesToken = generateAccessToken(usuario);

    // Se envia el token en el header
    res.set('auth-token', accesToken).send({ message: 'Usuario corrercto', token: accesToken });
});


/* -------------------------------------------------------------------------- */
/*                                  Usuarios                                  */
/* -------------------------------------------------------------------------- */

// Consulta de usuarios
router.get('/users' ,async (req, res) => {

    // El querySnapshot es la respuesta de la base de datos
    const querySnapshot = await db.collection('users').get();

    const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    console.log(users);

    res.send('Hola mundo');

})

// Creacion de usuario
router.post('/new-user', async (req, res) => {
    const { apellido, condicion, correo, foto, nombre, password, responsable, telefono, usuario } = req.body
    
    await db.collection('users').add({
        apellido,
        condicion,
        correo,
        foto,
        nombre,
        password,
        responsable,
        telefono,
        usuario
    })

    res.send('User created');
})

// Edicion de usuario
router.get('/search-user/:id', validateToken ,async (req, res) => {

    // Consulta a un solo user
   const doc = await db.collection('users').doc(req.params.id).get();

    console.log({
        id: doc.id,
        ...doc.data()
    });

    res.send('User consult');
});

// Eliminacion de un usuario
router.get('/delete-user/:id', async (req, res) => {
    await db.collection('users').doc(req.params.id).delete();
    res.send('User deleted');
});

// Actualizacion de un usuario
router.post('/update-user/:id', async (req, res) => {
    

    await db.collection('users').doc(req.params.id).update(req.body)

    res.send('User updated');
});


export default router;

