/**
 * Created by limyandivicotrico on 8/27/17.
 */

// import * as firebase from 'firebase';
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/storage');

const config = {
    apiKey: 'AIzaSyAE1ndtbAyE44v5Gn7M8e3u4Bgtc_a4WMc',
    authDomain: 'teamup-598f8.firebaseapp.com',
    databaseURL: 'https://teamup-598f8.firebaseio.com',
    projectId: 'teamup-598f8',
    storageBucket: 'gs://teamup-598f8.appspot.com',
    messagingSenderId: '955784441761',
};

firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const storage = firebase.storage();
