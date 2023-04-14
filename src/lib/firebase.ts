import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC1gPHLGZo_EJ_-B7ccAvv-Ew_AxalXdmQ",
    authDomain: "eating-e96ad.firebaseapp.com",
    projectId: "eating-e96ad",
    storageBucket: "eating-e96ad.appspot.com",
    messagingSenderId: "511123797819",
    appId: "1:511123797819:web:1ea37a36bd7a855362a91e",
    measurementId: "G-C5X0CTCMMM"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

export function login(email:string, password:string):Promise<boolean> {
    return signInWithEmailAndPassword(auth, email, password).then(() => true).catch(() => false);
}


export function register(email:string, password:string):Promise<boolean> {
    return createUserWithEmailAndPassword(auth, email, password).then(() => true).catch(r => {
        console.log(r);
        return false;
    });
}

export function addUserData(path:string, date:string ,data: {}):Promise<boolean> {
    return setDoc(doc(firestore, 'users/'+auth.currentUser?.uid+"/"+path+"/"+date), data).then(() => true).catch(() => false);
}