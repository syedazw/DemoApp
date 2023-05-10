import React, { useEffect, useState } from "react";
import Cardiogram from "../../Components/PlotECG";
import { Outlet, Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { usefirebase } from "../../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";
import TestCardiogram from "../../Components/testCardiogram";


export default function Dashboard() {

    const firebase = usefirebase();
    const auth = getAuth();
    const firestore = getFirestore();
    const params = useParams();
    console.log("params is", params)

    const [docdata, setdocdata] = useState([]);
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return;
        }
        const userEmail = currentUser.email;

        firebase.DocData(userEmail)
            .then((matchingData) => {
                setdocdata(matchingData);
            })
            .catch((error) => {
                console.log("Error fetching patient data:", error);
            });
    }, []);


    return (
        <>
            <div className="container-fluid">
                <div className="row bg-color text-light pt-4">
                    <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>

                    {docdata.length > 0 && <div className="col-sm-12 col-md-2"><h6 className="text-center">Welcome Dr. {docdata[0].data.fullname}</h6></div>}

                    {/* <div className="col-sm-12 col-md-2"><p className="text-center">Welcome Dr. Authur</p></div> */}
                    <div className="col-sm-12 col-md-6 d-flex justify-content-start">
                        <form className="d-flex-inline mx-4" role="search">
                            <input className="form-control col-sm-5" type="search" placeholder="Search" aria-label="Search"></input>
                        </form>
                        <i className="bi bi-bell-fill" style={{ color: "yellow" }}></i>
                        <div className="dropdown pb-4 mx-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1"></span>
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><Link to="/doctor/personal/information" className="dropdown-item">View Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>


                    <div className="col-12">
                        <nav className="navbar">
                            <a className="navbar-brand text-light fw-bold" href="#">MENU</a>
                            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon bg-light"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/dashboard" className="nav-link text-primary"><i className="bi bi-house-fill px-2"></i>DASHBOARD</Link></li>
                                    <li className="nav-item"><Link to="/dashboard/allpatient" className="nav-link text-light"><i className="bi bi-people-fill px-2"></i>ALL PATIENTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-heart-pulse-fill mx-2" viewBox="0 0 16 16"><path d="M1.475 9C2.702 10.84 4.779 12.871 8 15c3.221-2.129 5.298-4.16 6.525-6H12a.5.5 0 0 1-.464-.314l-1.457-3.642-1.598 5.593a.5.5 0 0 1-.945.049L5.889 6.568l-1.473 2.21A.5.5 0 0 1 4 9H1.475Z" /><path d="M.88 8C-2.427 1.68 4.41-2 7.823 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C11.59-2 18.426 1.68 15.12 8h-2.783l-1.874-4.686a.5.5 0 0 0-.945.049L7.921 8.956 6.464 5.314a.5.5 0 0 0-.88-.091L3.732 8H.88Z" /></svg>CRITICAL PATIENTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light"><i className="bi bi-file-text px-2"></i>REPORTS</Link></li>
                                    <li className="nav-item"><Link to="/dashboard/assistant" className="nav-link text-light"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-fill-lock mx-2" viewBox="0 0 16 16"><path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5v-1a1.9 1.9 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2Zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1Z" /></svg>ASSIGNED ASSISTANTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light"><i className="bi bi-file-earmark-plus-fill px-2"></i>SEND UPDATES</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light"><i className="bi bi-journal-medical px-2"></i>UPCOMING APPOINMENTS</Link></li>
                                    <li className="nav-item"><Link to="/dashboard/add/patient" className="nav-link text-light"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-fill-add mx-2" viewBox="0 0 16 16"><path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" /></svg>ADD NEW PATIENTS</Link></li>
                                    <li className="nav-item"><Link to="/dashboard/remove/patient" className="nav-link text-light"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-person-dash-fill mx-2" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" /><path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>REMOVE HEALTHY PATIENT</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <h4 className="fw-bold text-center">CRITICAL PATIENTS</h4>
                </div>

                <div className="row mt-4">
                    <div className="col-sm-12 col-md-6">
                        <Cardiogram
                            patid={params.PatientID} />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <TestCardiogram patid={params.PatientID} />
                    </div>
                </div>
            </div>

        </>

    )
}