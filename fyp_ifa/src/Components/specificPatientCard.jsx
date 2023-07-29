import React from "react";
import malePicture from "../images/maleProfile.jpg"
import femalePicture from "../images/femaleProfile.png"

export default function SpecificPatientInfo(props) {
    console.log("props",props);
    let profile 
    if (props.gender === 'Male') {
        profile = malePicture
    } else if (props.gender === 'Female') {
        profile = femalePicture
    }
    else {
        profile = "https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"

    }

    // -----------------  Object Of navigate ------------------
    let critical = false
    return (
        <>
            <div className="row">
                <div className="col-md-6 card-width">
                    <div className="card mb-3" style={{ color: "white", backgroundColor: "#041342" }}>
                        <div className="row g-0">
                            <div className="d-flex justify-content-center">
                                <img src={profile} className="rounded-circle px-3 pt-3 mx-auto" alt="..." style={{ height: "192px", width: "200px" }} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <p className="fw-bold">{props.fullname}</p>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className="btn btn-group">
                                    <button className="btn text-dark bg-light">Status</button>
                                    <button className={props.critical ? "btn btn-danger" : "btn btn-success"}>{props.critical ? "Critical" : "Normal"}</button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <dl><dt className="px-3 pb-0 fw-light">D.O.B</dt><dd className="px-3 pb-0 fw-bold">{props.dob
                                    }</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Age</dt><dd className="px-3 pb-0 fw-bold">{props.age}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Weight</dt><dd className="px-3 pb-0 fw-bold">{props.weight} KG</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Height</dt><dd className="px-3 pb-0 fw-bold">{props.height}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Care Taker</dt><dd className="px-3 pb-0 fw-bold">{props.careTaker}</dd></dl>
                                    <dl><dt className="px-3 pb-0 fw-light">Assistant</dt><dd className="px-3 pb-0 fw-bold">{props.assistant}</dd></dl>
                                </div>
                                <div className="col-6">
                                    <dl><dt className="pl-1 pb-0 fw-light">Home Address</dt><dd className="pl-1 pb-0 fw-bold">{props.homeAddress}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Caretaker Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.careTakerMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Home Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.homeMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Patient Mobile</dt><dd className="pl-1 pb-0 fw-bold">{props.patientMobile}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Workphone</dt><dd className="pl-1 pb-0 fw-bold">{props.workPhone
}</dd></dl>
                                    <dl><dt className="pl-1 pb-0 fw-light">Email</dt><dd className="pl-1 pb-0 fw-bold">{props.email}</dd></dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
