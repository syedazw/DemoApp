import React from "react"
import PatientInfo from "../../Form/createPatientAccount"
import AdminSubHeader from "../../Components/adminHeader"
import DeviceInfo from "./DeviceInfo"


export default function UpdatePatientTokenByAdmin() {
    return (
        <>
            <div className="container-fluid">

                <AdminSubHeader />

                <div className="row">
                    <div className="col-sm-12 col-md-8 mx-auto">
                        {<DeviceInfo heading={'UPDATE NEW TOKEN'} />}
                    </div>
                </div>
            </div>
        </>

    )
}