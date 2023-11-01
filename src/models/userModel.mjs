import { db } from '../config/firebase-config.mjs';

function showUsers() {
    return db.collection('users').get();
}

function showOneUser(id) {
    return db.collection('users').doc(id).get();
}

function createUser(user) {
    return db.collection('users').add(user);
}

function deleteUser(id) {
    return db.collection('users').doc(id).delete();
}

function updateUser(id, user) {
    return db.collection('users').doc(id).update(user);
}

export {
    showUsers,
    showOneUser,
    createUser,
    deleteUser,
    updateUser
}