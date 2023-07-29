import React from "react";
import AddDoctor from "../../Form/AddDoctor";
import AdminSubHeader from "../../Components/adminHeader";

export default function CreateDoctorAccount() {
    return (
        <>
            <div className="container-fluid">
                <AdminSubHeader />
                <div className="row">
                    <AddDoctor />
                </div>

            </div>
        </>
    )
}