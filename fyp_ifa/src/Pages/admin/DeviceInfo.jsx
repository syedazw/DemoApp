import React, { useEffect, useState } from "react";
import { usefirebase } from "../../context/firebase";
import { useParams } from "react-router-dom";




export default function DeviceInfo(props) {
    const firebase = usefirebase();
    const params = useParams();




    const [patdata, setpatdata] = useState([]);
    useEffect(() => {
        firebase.ListPatientData()
            .then((querySnapshot) => {
                {
                    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setpatdata(data);
                    console.log("data", data)
                }
            })
            .catch((err) => {
                console.error(err);
                setError("Error retrieving patient data.");
            });
    }, [])

    const [patientData, setPatientData] = useState([]);

    const handleDelete = (PatientID) => {
        firebase.onDelete(PatientID);
        // Update local state by removing the deleted item
        setPatientData((prevData) =>
            prevData.filter((item) => item.id !== PatientID)
        );
    };


    const handleUpdate = (PatientID) => {
        firebase.update(PatientID);
        // firebase.getPatientData()
    };


    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <h4 className="fw-bold text-center">{props.heading}</h4>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-md-12">

                        <div className="table-responsive">
                            <table className="table justify-content-center table-striped table-hover align-middle">
                                <thead className="bg-color text-light">
                                    <tr>
                                        <th scope="col" className="text-center">PATIENT ID</th>
                                        <th scope="col" className="text-center">DEVICE METHOD</th>
                                        <th scope="col" className="text-center">DEVICE AUTHORIZATION</th>
                                        <th scope="col" className="text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody class="table-group-divider">

                                    {/* <table class="table"> */}
                                    {patdata.map((item) => (

                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td className="text-wrap w-75" scope="row">{item.data.method}</td>
                                            <td className="text-wrap" scope="row">'{item.data.deviceToken}'</td>
                                            <td><button className="btn btn-primary btn-width text-light" onClick={() => handleUpdate(item.id)}>Edit Token</button>
                                                <button className="btn btn-danger btn-width mt-2" onClick={() => handleDelete(item.id)}>Delete Kit</button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>



                    </div>

                </div>
            </div>
        </>
    )
}