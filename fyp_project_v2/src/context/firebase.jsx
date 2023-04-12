import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
//  A function that creates a user (SIGNUP)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from 'firebase/database'
// importing Firestore from firebase
import { getFirestore, addDoc, doc, getDoc, collection, serverTimestamp, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyAFMk6ZLOjY9KGIRJib0oGzDZ5t8mN8oCw",
    authDomain: "heartaid-app.firebaseapp.com",
    projectId: "heartaid-app",
    storageBucket: "heartaid-app.appspot.com",
    messagingSenderId: "119958904964",
    appId: "1:119958904964:web:bb21f11164fe56d5b362d1",
    databaseURL: "https://heartaid-app-default-rtdb.firebaseio.com/"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
// initilize firebase storage
export const storage = getStorage(firebaseApp);
// FIREBASE AUTHENTICATION
// to create a new user (SIGNUP)
export const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
// creating context api
const FirebaseContext = createContext(null);
// making an own custom hook (using these firebase hook we can access our functions)
export const usefirebase = () => useContext(FirebaseContext);

// Create a Provider for context
export const FirebaseProvider = (props) => {

    const [user, setuser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) setuser(user);
            else setuser(null);
            console.log("user", user);

        });
    }, []);
    // creating a function for signup
    const signupUserWithEmailAndPassword = (username, password) => {
        return createUserWithEmailAndPassword(firebaseAuth, username, password);

    };
    // function for signin user
    const signinUserWithEmailAndPassword = (username, password) => {
        const result = signInWithEmailAndPassword(firebaseAuth, username, password);
        console.log("successful", result);
    };
    // Add patients data to Firestore
    const uploadDataToFirestore = async (collectionName, data) => {
        // const currentUser = firebaseAuth.currentUser;
        // const uid = currentUser.uid;
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                data,
                createdAt: serverTimestamp(),
                // currentUser: uid,
            });
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    }
    // Add sub collections(notes)
    const addNotesToCollection = async (PatientID, data) => {
        const parentDocRef = collection(db, "Patients", PatientID, "Notes")
        const result = await addDoc(parentDocRef, {
            // patientName:user.fullname,
            data,
            AddedAt: serverTimestamp()
        })
        return result;
    };

    // Add sub collections(medication)
    const addMedToCollection = async (PatientID , data) => {
        const medref = collection(db,"Patients" , PatientID, "Medication")
        const result = await addDoc(medref,{
            data,
            AddedAt: serverTimestamp()
        })
        return result;
    };
    // Add sub collections(Report)
    const addReportToCollection = async (PatientId,testName, testFile) => {
        
           const fileRef = ref(storage, `uploads/TestFiles/${Date.now()}-${testFile}`);
            const uploadResult = await uploadBytes(fileRef, testFile);
            const repref = collection(db, "Patients" ,PatientId, "Reports");
            const result = await addDoc(repref, {
                testName,
                TestFile: uploadResult.ref.fullPath,
                AddedAt: serverTimestamp()
            });
            return result;


    };

    // Add doctors data to Firestore

    const uploadFilesToFirestore = async (data, docs) => {
        console.log("receiving docs", docs.length)
        for (let i = 0; i <= docs.length; i = i + 1) {
            //iterate over each file to collect the name
            console.log(docs[i].name)
            let fileName = docs[i].name
            const imageRef = ref(storage, `uploads/document/${Date.now()}-${fileName}`)
            const uploadResult = await uploadBytes(imageRef, docs);
            return await addDoc(collection(db, "Doctor"), {
                data,
                docs: uploadResult.ref.fullPath,
                createdAt: serverTimestamp()
            });
        }


    };
    // GETTING PATIENT DATA ON HOME SCREEN
    const getpatdata = async() =>{
        return getDocs(collection(db, "Patients", "2qJuGO3p9BjuRLo6Ftm2"))


    }




    // ******************************** RETRIEVING DATA ***********************************
    // getting patient Data
    const ListPatientData = () => {
        return getDocs(collection(db, "Patients"));
    };

    const getPatientProfilebyId = async (id) => {
        // Making the ref of that document
        const docRef = doc(db, "Patients", id);
        const result = await getDoc(docRef)
        return result;

    };

        //   GET NOTES DATA
    const getNotesById = async(PatientID) => {
        const noteref = collection(db, "Patients",PatientID, "Notes")
        const result = await getDocs(noteref);
        return result;
        
    };
          //   GET MEDICTION DATA
    const getMedByID = async(PatientID) => {
        const medref = collection(db,"Patients", PatientID,"Medication")
        const result = await getDocs(medref);
        return result;
    }
         //   GET REPORT DATA
    const getReportById =async(PatientID) =>{
        const repref = collection(db,"Patients", PatientID,"Reports")
        const result = await getDocs(repref);
        return result;
    }
    


    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword, signinUserWithEmailAndPassword,
            uploadDataToFirestore, uploadFilesToFirestore,
            addMedToCollection, addNotesToCollection,
            addReportToCollection, ListPatientData, getPatientProfilebyId,getNotesById,
            getMedByID,getReportById,getpatdata
        }}>
            {props.children}
        </FirebaseContext.Provider>

    )
}
export default firebaseApp;