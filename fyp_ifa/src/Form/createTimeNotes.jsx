import React, { useEffect, useState } from "react"
import { usefirebase } from '../context/firebase'
import { useParams} from 'react-router-dom'
import Popup from "../message/ShowMessage";



export default function CreateTimeNotes() {
    // This function dynamically add and delete fields for date and notes
    const firebase = usefirebase();
    console.log('firebase', firebase);
    const params = useParams();
    console.log("id",params);
    // const [patientData, setPatientData] = useState([]);

    // useEffect(() => {
    //     firebase.getPatientProfilebyId(params.PatientID).then((patientData) => setPatientData(patientData.data()))
    // } ,[])
    // console.log("patientData",patientData);

    const [medicalReport, setMedicalReport] = React.useState([{ term: "", description: "" }])
    const [showPopup, setShowPopup] = useState(false);

    const AddItem = () => {
        const data = [...medicalReport, { term: "", description: "" }]
       
        setMedicalReport(data)
    }

    const handleChange = (e, i) => {
        const { name, value } = e.target
        const newData = [...medicalReport]
        newData[i][name] = value
        setMedicalReport(newData)
    }

    const handleDelete = (i) => {
        const deleteData = [...medicalReport]
        deleteData.splice(i, 1)
        setMedicalReport(deleteData)
    }

    // function handleClick() {
    //     console.log("Storing data:", medicalReport)
    // }
    console.log("report",medicalReport)

                            //    ADD DATA TO FIRESTORE
    const addNotesToCollection = async()=>{
        const data = medicalReport
        const result = await firebase.addNotesToCollection(params.PatientID,data);
        console.log("Notes Added",result);
       
    }
    const handleClick = () => {
        setShowPopup(true);
      }

    const handleClose = () =>{
        setShowPopup(false);
    }

    console.log(medicalReport)
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-8 mx-auto">
                        <div className="d-flex justify-content-center">
                            <button className="btn text-light" style={{ backgroundColor: "#041342" }} onClick={() => AddItem()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-plus-circle-fill mx-2 mb-1" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" /></svg>Add Notes</button>
                        </div>
                        {medicalReport.map((item,i) => {

                            return (
                                <div className="input-group mb-3 mt-3" key={item.id} id={item.id}>
                                    <input type='date' className="form-control" placeholder="Enter category" name="term" value={item.term} onChange={e => handleChange(e, i)} />
                                    <span className="glyphicon glyphicon-calendar"></span>
                                    <textarea className="form-control h-50" aria-label="With textarea" name="description" value={item.description} onChange={e => handleChange(e, i)} ></textarea>
                                    <button className="btn text-light" style={{ backgroundColor: "#041342", color: "white" }} onClick={() => handleDelete(i)}> <i className="bi bi-trash"></i></button>
                                </div>
                            )
                        })}
                        <div className="col-12">
                            <button className="btn mt-5" type="submit" onClick={()=>{addNotesToCollection() ; handleClick()}} style={{ color: "white", backgroundColor: "#041342" }}>SAVE CHANGES</button>
                             <Popup show={showPopup} onClose={handleClose} message="Successfully Saved Data" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}