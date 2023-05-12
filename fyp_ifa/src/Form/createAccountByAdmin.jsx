import React from "react"
import PatientInfo from "./createPatientAccount"


export default function CreateAccountbyAdmin() {
    return (
        <>
        <div className="container-fluid mt-3">
            <div className="row">
                <div className="col-sm-12 col-md-3 mx-auto">
                    <h4 className="text-center">ADD NEW PATIENT</h4>
                </div>

                <div className="col-sm-12 col-md-12 mx-auto">
                    {<PatientInfo />}
                </div>

                
            </div>
        </div>
        </>
    
    )
}