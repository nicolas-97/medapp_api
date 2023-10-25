import { Router } from 'express';
import { db } from '../firebase.mjs';

const router = Router();


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


export default router;