import React from "react";
import { useNavigate } from "react-router-dom"

export default function DisplayTestReport(props) {
    const navigate = useNavigate();
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                            <div className="card-body">
                                <h5 className="card-title">Reports</h5>
                                <hr className="border-5" style={{ color: "white" }}></hr>
                                <ul className="list-unstyled">
                                    <li><i className="bi bi-file-text-fill me-2"></i>{props.testName}</li>
                                    
                                                                     
                                </ul>
                            </div>
                            <button className="nav-link btn btn-width align-self-center mb-3 p-1" type="submit" onClick={(e) => navigate(`/patientprofile/reports/${props.patid}`)} style={{ color: "white", backgroundColor: "#24a3ac" }}>Add Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}