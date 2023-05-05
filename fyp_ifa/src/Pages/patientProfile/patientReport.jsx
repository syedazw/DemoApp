import React from "react";
import { Outlet, Link } from "react-router-dom"
import CreateTestReport from "../../Form/createTestReport";
import { useParams } from "react-router-dom";


export default function PatientReport() {
    const params = useParams();
    return (
        <>
           <div className="container-fluid">
                <div className="row bg-color text-light pt-4">
                    <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>
                    <div className="col-sm-12 col-md-2"><p className="text-center">Patient Profile</p></div>
                    <div className="col-sm-12 col-md-6 d-flex justify-content-start">
                        <form className="d-flex-inline mx-4" role="search"><input className="form-control col-sm-5" type="search" placeholder="Search" aria-label="Search"></input></form>
                        <i className="bi bi-bell-fill" style={{ color: "yellow" }}></i>
                        <div className="dropdown pb-4 mx-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1"></span>
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><Link to="/patient/personal/information" className="dropdown-item">View Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 bg-color">
                    <nav className="navbar">
                            <Link to={`/patientprofile/${params.PatientID}`} className="navbar-brand text-light fw-bold">&lt; BACK</Link>
                            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon bg-light"></span></button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to={`/patientprofile/${params.PatientID}`} className="nav-link text-light mx-3">OVERVIEW</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-light mx-3">CARDIOGRAM</Link></li>
                                    <li className="nav-item"><Link to={`/patientprofile/medication/${params.PatientID}`} className="nav-link text-light mx-3" >MEDICATIONS</Link></li>
                                    <li className="nav-item"><Link to={`/patientprofile/reports/${params.PatientID}`} className="nav-link text-primary mx-3" >REPORTS</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-light mx-3">HISTORY</Link></li>
                                    <li className="nav-item"><Link to={`/patientprofile/notes/${params.PatientID}`} className="nav-link text-light mx-3">NOTES</Link></li>
                                    <li className="nav-item"><Link className="nav-link text-light mx-3">PERSONAL INFO</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                <div className="row">
                    <h4 className="fw-bold text-center">REPORT</h4>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    {<CreateTestReport />}
                </div>
            </div>
        </>
    )
}