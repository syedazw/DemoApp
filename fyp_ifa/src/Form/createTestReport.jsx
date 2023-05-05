import React, { useEffect, useState } from "react"
import { usefirebase} from '../context/firebase'
import { useParams } from "react-router-dom";
import Popup from "../message/ShowMessage";


export default function CreateTestReport() {
    const firebase = usefirebase();
    const params = useParams();
    console.log("firebase",firebase);
    const [testReport, setTestReport] = React.useState([{testName:"", testFile:""}])
    const [showPopup, setShowPopup] = useState(false);
    
    const AddItem = () => {
        const data = [...testReport, {testName:"", testFile:""}]
        setTestReport(data)
    }

    const handleChange = (e, i) => {
        e.stopPropagation()
        const {name,value} = e.target
        const newData = [...testReport]
        newData[i][name] = value
        setTestReport(newData)
    }

    const handleImage = (e, i) => {
        const {name} = e.target
        const newData = [...testReport]
        newData[i][name] = e.target.files[0]
        setTestReport(newData)
    }

    const handleDelete = (i) => {
        const deleteData = [...testReport]
        deleteData.splice(i, 1)
        setTestReport(deleteData)
    }

    // function handleClick() {
    //     console.log("I am clicked")
    //     console.log(testReport)
    // }

    const handleClick = () => {
        setShowPopup(true);
      }

    const handleClose = () =>{
        setShowPopup(false);
    }
//    ADD Test Report DATA TO FIRESTORE
    const addReportToCollection = async()=>{
        // console.log(testReport)
        // event.preventDefault();
        const testName= testReport[0].testName;
        const testFile = testReport[0].testFile.name;
        console.log("passing these values", testName, testFile)
        const result = await firebase.addReportToCollection(params.PatientID,testName, testFile);
        console.log("successfully added Test Report data with generated id", result);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">
                        <div className="d-flex justify-content-center">
                            <button className="btn text-light" style={{ backgroundColor: "#041342" }} onClick={() => AddItem()}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-plus-circle-fill mx-2 mb-1" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" /></svg>Add Test</button>
                        </div>
                        {testReport.map((data, i) => {
                            return (
                                <div className="input-group mb-3 mt-3" key={i}>
                                    <input type="text" className="form-control" placeholder="Enter test name" name="testName" value={data.testName} onChange={e => handleChange(e, i)} />
                                    <input type="file" className="form-control" name="testFile" multiple={true} onChange={e => handleImage(e, i)} />
                                    <button className="btn text-light" style={{ backgroundColor: "#041342", color: "white" }} onClick={() => handleDelete(i)}> <i className="bi bi-trash"></i></button>
                                </div>
                            )
                        })}
                        <div className="col-12">
                            <button className="btn mt-5" type="submit" onClick={()=>{addReportToCollection() ; handleClick()}} style={{ color: "white", backgroundColor: "#041342" }}>SAVE CHANGES</button>
                            <Popup show={showPopup} onClose={handleClose} message="Successfully Store Data" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}