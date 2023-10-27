import { Router } from 'express';
import { db } from '../firebase.mjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const router = Router();


/* -------------------------------------------------------------------------- */
/*                                    Login                                   */
/* -------------------------------------------------------------------------- */

function generateAccessToken(user) {

    // El token se genera con la informacion del usuario y la clave secreta
    return jsonwebtoken.sign(user, process.env.SECRET_KEY, { expiredIn: '5m' });
}


// Autenticacion de usuario
router.post('/auth', async (req, res) => {
    const { user, password } = req.body;

    // Consultar usuario( aqui podemos colocar la informacion necesaria para comparar token)
    const usuario = { user: user };

    // Generar token
    const accesToken = generateAccessToken(usuario);
    // Se envia el token en el header
    res.header('auth-token', accesToken).json({
        message: 'OK',
        token: accesToken
    });

});


/* -------------------------------------------------------------------------- */
/*                                  Usuarios                                  */
/* -------------------------------------------------------------------------- */
// Consulta de usuarios
router.get('/users', async (req, res) => {

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
router.get('/edit-user/:id', async (req, res) => {

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

