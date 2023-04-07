import React, { useEffect, useState } from "react"
import { usefirebase } from "../context/firebase";


export default function Database() {
    const firebase = usefirebase();
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
    console.log("cards of patient data:", medicalRecord)
   
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 text-center mx-auto mt-3 fw-bold">WELCOME </div>
                    <div className="col-md-8 mx-auto">
                        <table class="table  table-hover table-striped">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Document ID</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Care Taker Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                            {patientData.map((item, index) =>(  
                                    <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.id}</td>
                                    <td>{item.data.fullname}</td>
                                    <td>{item.data.careTaker}</td>
                                    <td>{item.data.homeAddress}</td>
                                    <td>{item.data.homeMobile}</td>
                                    <td>{item.data.email}</td>
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