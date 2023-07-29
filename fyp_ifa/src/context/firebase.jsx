import { createContext, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
//  A function that creates a user (SIGNUP)
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
// importing Firestore from firebase
import { getFirestore, addDoc, doc, getDoc, collection, serverTimestamp, getDocs, query, deleteDoc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref as ref_storage } from 'firebase/storage'
import { getDatabase, set, ref as ref_database } from "firebase/database";
// export const [restrictAccess, setRestrictAccess] = useState(false)



const firebaseConfig = {
    apiKey: "AIzaSyAFMk6ZLOjY9KGIRJib0oGzDZ5t8mN8oCw",
    authDomain: "heartaid-app.firebaseapp.com",
    projectId: "heartaid-app",
    storageBucket: "heartaid-app.appspot.com",
    // messagingSenderId: "119958904964",
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
            // console.log("user", user);

        });
    }, []);
    // creating a function for signup
    const signupUserWithEmailAndPassword = async (username, password) => {
        return await createUserWithEmailAndPassword(
            firebaseAuth,
            username, 
            password
        );

    };




    // function for signin user
    const signinUserWithEmailAndPassword = (username, password) => {
        signInWithEmailAndPassword(firebaseAuth, username, password)
    }

    // Add patients data to Firestore
    const uploadDataToFirestore = async (collectionName, data) => {
        // const currentUser = firebaseAuth.currentUser;
        // const uid = currentUser.uid;
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                data,
                createdAt: serverTimestamp(),
                // currentUser: uid,
                doctorUid: user.uid,

            });
            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        } catch (e) {
            console.error("Error adding document: ", e);
            return null;
        }
    };
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
    const addMedToCollection = async (PatientID, data) => {
        const medref = collection(db, "Patients", PatientID, "Medication")
        const result = await addDoc(medref, {
            data,
            AddedAt: serverTimestamp()
        })
        return result;
    };
    // Add sub collections(Report)
    const addReportToCollection = async (PatientId, testName, testFile) => {

        const fileRef = ref_storage(storage, `uploads/TestFiles/${Date.now()}-${testFile}`);
        const uploadResult = await uploadBytes(fileRef, testFile);
        const repref = collection(db, "Patients", PatientId, "Reports");
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
            const imageRef = ref_storage(storage, `uploads/document/${Date.now()}-${fileName}`)
            const uploadResult = await uploadBytes(imageRef, docs);
            return await addDoc(collection(db, "Doctor"), {
                data,
                docs: uploadResult.ref.fullPath,
                createdAt: serverTimestamp()
            });
        }


    };
    //  ***************  FIREBASE REALTIME DATABASE **************

    const putData = (PatientID, data) => {
        const dbRef = ref_database(database, `Patients/${PatientID}`);
        set(dbRef, {
            data,

        });

    }

    // *****************  FIRESTORE DATA **************************

    const putdatafire = async (PatientID, data) => {
        const ref = collection(db, "Patients", PatientID, "ECGData")
        const result = await addDoc(ref, {
            data,
            AddedAt: serverTimestamp()
        });
        return result;

    }



    // ***************** QUERY FIREBASE DATA **************************


    // *********HOME PAGE DATA (PATIENTS DATA)********
    const patData = async (userEmail) => {
        const q = query(collection(db, "Patients"));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot", querySnapshot)

        if (querySnapshot.empty) {
            console.log("No matching documents..");
            return [];
        }

        const matchingData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("data", data.data.email)

            if (data.data.email == userEmail) {
                console.log("Found a match:", data);
                matchingData.push(data);
            }
        });

        return matchingData;
    }
    // ************************** PATIENT MEDICATION DATA  *************************** 
    const patMedData = async (userEmail) => {
        const q = query(collection(db, "Patients"));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot", querySnapshot)

        if (querySnapshot.empty) {
            console.log("No matching documents..");
            return [];
        }

        const matchingData = [];

        await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                console.log("data", data.data.email)

                if (data.data.email == userEmail) {
                    console.log("Found a match:", data);
                    const medicationsRef = collection(doc.ref, "Medication");
                    const medicationsSnapshot = await getDocs(medicationsRef);
                    const medicationsData = medicationsSnapshot.docs.map((doc) => doc.data());
                    console.log("medications:", medicationsData);
                    matchingData.push({ ...data, medications: medicationsData });
                }
            })
        );

        return matchingData;
    };
    // ************************** PATIENT REPORT DATA  *************************** 

    const patRepData = async (userEmail) => {
        const q = query(collection(db, "Patients"));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot", querySnapshot)

        if (querySnapshot.empty) {
            console.log("No matching documents..");
            return [];
        }

        const matchingData = [];

        await Promise.all(
            querySnapshot.docs.map(async (doc) => {
                const data = doc.data();
                console.log("data", data.data.email)

                if (data.data.email == userEmail) {
                    console.log("Found a match:", data);
                    const RepRef = collection(doc.ref, "Reports");
                    const RepSnapshot = await getDocs(RepRef);
                    const RepData = RepSnapshot.docs.map((doc) => doc.data());
                    console.log("Reports==:", RepData);
                    matchingData.push({ ...data, Reports: RepData });
                }
            })
        );

        return matchingData;
    };

    const DocData = async (userEmail) => {
        const q = query(collection(db, "Doctor"));
        const querySnapshot = await getDocs(q);
        console.log("querysnapshot", querySnapshot)

        if (querySnapshot.empty) {
            console.log("No matching documents..");
            return [];
        }

        const matchingData = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log("data", data.data.email)

            if (data.data.email == userEmail) {
                console.log("Found a match:", data);
                matchingData.push(data);
            }
        });

        return matchingData;
    }

    // ******************************** RETRIEVING DATA ***********************************
    // getting patient Data
    const ListPatientData = () => {
        return getDocs(collection(db, "Patients"));
    };

    const getPatientProfilebyId = async (PatientID) => {
        // Making the ref of that document
        const docRef = doc(db, "Patients", PatientID);
        const result = await getDoc(docRef)
        return result;
    };

    //   GET NOTES DATA
    const getNotesById = async (PatientID) => {
        const noteref = collection(db, "Patients", PatientID, "Notes")
        const result = await getDocs(noteref);
        return result;

    };
    //   GET MEDICTION DATA
    const getMedByID = async (PatientID) => {
        const medref = collection(db, "Patients", PatientID, "Medication")
        const result = await getDocs(medref);
        return result;
    }
    //   GET REPORT DATA
    const getReportById = async (PatientID) => {
        const repref = collection(db, "Patients", PatientID, "Reports")
        const result = await getDocs(repref);
        return result;
    }

    // **************** CRUD OPERATION ************************

    const onDelete = async (PatientID) => {
        if (window.confirm("Are you sure you want to delete it?")) {
            const docref = doc(db, "Patients", PatientID)
            await deleteDoc(docref);
        }
        toast.success('Device Successfully Deleted', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const update = async (patientID) => {
        const docRef = doc(db, "Patients", patientID);
        const newDeviceToken = window.prompt("Please enter the DeviceToken you want to update");
        if (newDeviceToken) {
            try {
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    const existingData = docSnapshot.data();
                    const updatedData = {
                        ...existingData,
                        data: {
                            ...existingData.data,
                            deviceToken: newDeviceToken
                        }
                    };
                    await setDoc(docRef, updatedData);
                    toast.success('Updated Successfully', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log("Device token updated successfully");
                } else {
                    console.log("Document does not exist");
                }
            } catch (error) {
                console.error("Error updating device token:", error);
            }
        }
    };

    // const getPatientData = async() => {
    //     const querySnapshot = await getDocs(collection(db, "Patients"));
    //     const patientData = querySnapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         data: doc.data(),

    //     }));
    //     return patientData;
    // };



    return (
        <FirebaseContext.Provider value={{
            signupUserWithEmailAndPassword, signinUserWithEmailAndPassword,
            uploadDataToFirestore, uploadFilesToFirestore,
            addMedToCollection, addNotesToCollection,
            addReportToCollection, ListPatientData, getPatientProfilebyId, getNotesById,
            getMedByID, getReportById, putData, putdatafire, patData, patMedData, patRepData, DocData, onDelete,
            update,
        }}>
            {props.children}
        </FirebaseContext.Provider>

    )
}
export default firebaseApp;