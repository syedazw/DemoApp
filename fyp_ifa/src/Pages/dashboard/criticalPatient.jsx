import React, { useEffect, useState } from "react"
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from '../../context/firebase'
import DisplayPatientCard from "../../Components/displayPatientCard"
import { getAuth } from "firebase/auth"
import DashboardNavigation from "../../Components/dashboardNavigation"

export default function CriticalPatient() {
    const firebase = usefirebase();
    const auth = getAuth();
    console.log(firebase);
    const [patientData, setPatientData] = useState([]);
    useEffect(() => {
        firebase.ListPatientData()
            .then((querySnapshot) => {
                {
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setPatientData(data);
                    console.log("data",)
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error retrieving patient data.");
            });
    }, []);

    const medicalRecord = [patientData]
    console.log("Making a card of data:", medicalRecord)
    // *********   Doctor data ***************
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
                    {docdata.length > 0 && <div className="col-sm-12 col-md-2"><h6 className="text-center">Dr. {docdata[0].data.fullname}</h6></div>}
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
                                <li><Link to="#" className="dropdown-item">Upload Picture</Link></li>
                                <li><Link to="#" className="dropdown-item">Edit Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>


                    <div className="col-12">
                        <DashboardNavigation />
                    </div>
                </div>
            </div>

            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                <div className="row">
                    <h4 className="fw-bold text-center">CRITICAL PATIENT</h4>
                </div>

            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                        <div className="card-group">
                            {patientData.map((item) => (
                                <DisplayPatientCard key={item.id}
                                    id={item.id}
                                    {...item.data} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
