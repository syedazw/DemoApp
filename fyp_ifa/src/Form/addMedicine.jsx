import React ,{useState} from "react"
import { usefirebase } from '../context/firebase'
import { useParams } from "react-router-dom";
import Popup from "../message/ShowMessage";

export default function MedicineForm() {
    const firebase = usefirebase();
    const params = useParams();
    console.log("id", params)
    console.log("firebase", firebase);
    const [medicalReport, setMedicalReport] = React.useState([{ medicineName: "", dosage: "" }])
    const [showPopup, setShowPopup] = useState(false);
    

    const AddItem = () => {
        const data = [...medicalReport, { medicineName: "", dosage: "" }]
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

    function handleClick() {
        setShowPopup(true);
        console.log("Storing data:", medicalReport)
    }



    const handleClose = () => {
        setShowPopup(false);
    };

    //    ADD MEDICINE DATA TO FIRESTORE

    const addMedToCollection = async () => {
        const data = medicalReport;
        const result = await firebase.addMedToCollection(params.PatientID, data);
        console.log("Medicine Added", result);


    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">
                        <div className="d-flex justify-content-center">
                            <button className="btn text-light" style={{ backgroundColor: "#041342" }} onClick={() => AddItem()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-plus-circle-fill mx-2 mb-1" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" /></svg>Add Item</button>
                        </div>
                        {medicalReport.map((data, i) => {
                            return (
                                <div className="input-group mb-3 mt-3" key={i}>
                                    <input type="text" className="form-control w-50" placeholder="Enter medicine name" name="medicineName" value={data.medicineName} onChange={e => handleChange(e, i)} />
                                    <select className="form-select w-25" required name="dosage" value={data.dosage} onChange={e => handleChange(e, i)} multiple={false}>
                                        <option value="">--</option>
                                        <option value="1">1</option>
                                        <option value="1+1">1+1</option>
                                        <option value="1+1+1">1+1+1</option>
                                    </select>
                                    <button className="btn text-light" style={{ backgroundColor: "#041342", color: "white" }} onClick={() => handleDelete(i)}> <i className="bi bi-trash"></i></button>
                                </div>
                            )
                        })}
                        <div className="col-12">
                            <button className="btn mt-5" type="submit" onClick={() => { addMedToCollection(); handleClick() }} style={{ color: "white", backgroundColor: "#041342" }}>SAVE CHANGES</button>
                            <Popup show={showPopup} onClose={handleClose} message="Successfully Store Data!" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}