import React from "react";

export default function DeviceInfo() {

    return (

        <>
            <div className="container-fluid">
                <div className="row">
                    <h4 className="fw-bold text-center pt-5">VIEW DEVICE INFORMATION</h4>
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

                                <tr>
                                    <th scope="row">12345</th>                          
                                    <td className="text-wrap w-75" scope="row">https://backend.thinger.io/v3/users/ismail_/devices/Nodemcu1/resources/ECG</td>
                                    <td className="text-wrap" scope="row">'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODUyODI1MzQsImlhdCI6MTY4NTI3NTMzNCwicm9sZSI6InVzZXIiLCJ1c3IiOiJpc21haWxfIn0.HB1tcMITj6l8-eSHM2mScVFYjMNM0hN8s9NQe1tdO-U'</td>
                                    <td><button className="btn btn-danger btn-width text-light">Edit Token</button>
                                    <button className="btn btn-danger btn-width mt-2">Delete Kit</button>
                                    </td>
                                    
                                </tr>

                            </tbody>
                        </table>
                        </div>
                        


                    </div>

                </div>
            </div>
        </>
    )
}