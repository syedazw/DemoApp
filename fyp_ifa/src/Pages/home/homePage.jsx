import React, { useEffect, useState } from "react";
import Cardiogram from "../../Components/PlotECG";
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from "../../context/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, where, query, getDocs } from "firebase/firestore";


export default function HomePage() {
    const auth = getAuth();
   
    const firebase = usefirebase();

    // **************************    PATIENT DATA ***************************
    const [patdata, setpatdata] = useState([]);
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return;
        }
        const userEmail = currentUser.email;

        firebase.patData(userEmail)
            .then((matchingData) => {
                setpatdata(matchingData);
            })
            .catch((error) => {
                console.log("Error fetching patient data:", error);
            });
    }, []);

    // ************************** PATIENT MEDICATION DATA  ***************************          
    const [patMed, setpatMed] = useState([]);
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return;
        }
        const userEmail = currentUser.email;

        firebase.patMedData(userEmail)
            .then((matchingData) => {
                setpatMed(matchingData);
                console.log("medication",setpatMed)
            })
            .catch((error) => {
                console.log("Error fetching medication data:", error);
            });
    }, []);

    // ************************** PATIENT REPORT DATA  *************************** 

    const [patRep, setpatRep] = useState([]);
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            return;
        }
            const userEmail = currentUser.email;
            firebase.patRepData(userEmail).then((matchingData) => {
                setpatRep(matchingData);
            })
            .catch((error) =>{
                console.log("Error when Fetching Reports", error);
            })
        
    } ,[])


    



    return (
        <>
            <div className="container-fluid">
                <div className="row bg-color text-light pt-4">
                    <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>

                    {patdata.length > 0 && <div className="col-sm-12 col-md-2"><h6 className="text-center">{patdata[0].data.fullname}</h6></div>}

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
                                <li><Link to="/patient/personal/information" className="dropdown-item">View Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 bg-color">
                        <nav className="navbar">
                            <Link to="/allpatient" className="navbar-brand text-light fw-bold mx-5">MENU</Link>
                            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon bg-light"></span></button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/home" className="nav-link text-primary mx-3">HOME</Link></li>
                                    <li className="nav-item"><Link to="/home/cardiogram" className="nav-link text-light mx-3">CARDIOGRAM</Link></li>
                                    <li className="nav-item"><Link to="/home/medication" className="nav-link text-light mx-3">MEDICATIONS</Link></li>
                                    <li className="nav-item"><Link to="/home/reports" className="nav-link text-light mx-3">REPORTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">UPDATES</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">RECOMMENDATIONS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">UPCOMING APPOINMENTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">DOCTOR'S PROFILE</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>


            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                <div className="row">
                    <h4 className="fw-bold text-center">HOME</h4>
                </div>
            </div>
            {/* we can't import medication, recommendation and update component as its function is taking id as props for each patient */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <Cardiogram />
                    </div>
                    <div className="col-sm-12 col-md-4">



                    </div>
                </div>
            </div>

            {/* creating a medication card */}
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-3">
                        <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                            <div className="card-body">
                                <h5 className="card-title">Medications</h5>
                                <hr className="border-5" style={{ color: "white" }}></hr>
                                <ul className="list-unstyled">
                                    {patMed.length > 0 && patMed[0].medications.map((medication, index) => (
                                        <li key={index}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-capsule mb-2 mx-2" viewBox="0 0 16 16"><path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" /></svg>
                                            {medication.data[0].medicineName}  ({medication.data[0].dosage})</li>
                                    ))} 
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-3">
                                <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                                    <div className="card-body">
                                        <h5 className="card-title">Report</h5>
                                        <hr className="border-5" style={{ color: "white" }} />
                                        <ul className="list-unstyled">
                                            {patRep.length > 0 &&
                                                patRep[0].Reports.map((report) => (
                                                    <li className="bi bi-file-text-fill me-2"> {report.testName}</li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    

                </div>
            </div>





        </>
    )
}