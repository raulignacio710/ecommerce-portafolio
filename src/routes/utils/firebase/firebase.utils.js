import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzCaCrw2_dOD-oUB4z0K7j4icZ8I_jvQ4",
  authDomain: "ecommerce-portafolio-db.firebaseapp.com",
  projectId: "ecommerce-portafolio-db",
  storageBucket: "ecommerce-portafolio-db.appspot.com",
  messagingSenderId: "579185771433",
  appId: "1:579185771433:web:ef918d8fa2dafc5ea37ab8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


//AUTH CONFIG
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInwithGooglePopup = () => signInWithPopup(auth,provider);

//CRUD DOCS
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnap = await getDoc(userDocRef);

    if(!userSnap.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        }catch(err){
            console.log('errorin');
        }
    }
    return userDocRef;
}