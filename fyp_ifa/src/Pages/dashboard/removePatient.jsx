import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from "../../context/firebase";
import { getAuth } from "firebase/auth";
import DashboardNavigation from "../../Components/dashboardNavigation";

export default function RemovePatient() {
    const firebase = usefirebase();
    const auth = getAuth();

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

    const handleDelete = (PatientID) =>{
        firebase.onDelete(PatientID);
        // Update local state by removing the deleted item
      setPatientData((prevData) =>
      prevData.filter((item) => item.id !== PatientID)
    );
    };


    const patdata = [patientData]
    console.log("patiendata", patdata);
    return (
        <>




            < div className="container-fluid" >
                <div className="row bg-color text-light pt-4">
                    <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>
                    {docdata.length > 0 && <div className="col-sm-12 col-md-2">
                        <h6 className="text-center">Dr. {docdata[0].data.fullname}</h6></div>}
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
            </div >
            <div className="container-fluid">
                <div className="row">
                    <h4 className="fw-bold text-center">REMOVE HEALTHY PATIENT</h4>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-6 mx-auto">
                        <table className="table justify-content-center table-striped">
                            <thead className="bg-color text-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Patient Id</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">Assistant Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody class="table-group-divider">

                                {/* <table class="table"> */}
                                {patientData.map((item, index) => (

                                    <tr key={item.id}>
                                        <th scope="row">{index + 1}</th>
                                        <th >{item.id}</th>
                                        <td scope="row">{item.data.fullname}</td>
                                        <td scope="row">{item.data.assistant}
                                        </td>
                                        <td><button className="bg-color text-light" onClick={() => {handleDelete(item.id)}}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>


                    </div>

                </div>
            </div>

        </>

    )
}