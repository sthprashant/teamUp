// import { apiEndpoint } from '../../config/app';
// import createRestApiClient from '../utils/createRestApiClient';

import 'babel-polyfill';
import { ref, firebaseAuth } from '../firebase/firebaseconfig';

function saveuser(user) {
    const date = new Date();
    return ref.child(`users/${user.uid}`)
        .set({
            id: user.uid,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            dob: user.dob,
            regodate: date.toString(),
            groups: [],
        })
        .then(() => user);
}

export function register(email, pw, firstname, lastname, dob) {
    return firebaseAuth().createUserWithEmailAndPassword(email, pw)
        .then(async (user) => {
            user.firstname = firstname;
            user.lastname = lastname;
            user.dob = dob;
            await saveuser({...user, firstname, lastname, dob});
            return user;
        })
        .then(user => user);
}

export function login(email, pw) {
    return firebaseAuth().signInWithEmailAndPassword(email, pw);
}

export function logout() {
    return firebaseAuth().signOut();
}

export function resetpassword(email) {
    return firebaseAuth().sendPasswordResetEmail(email);
}
