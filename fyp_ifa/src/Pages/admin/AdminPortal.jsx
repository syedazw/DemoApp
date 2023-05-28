import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function AdminPortal() {
    const buttonStyle = {color: "white", backgroundColor: "#041342" }
    return (
        <>
            <p className="h3 text-center fw-bold pt-5">IMMEDIATE FIRST AID</p>
            <p className="h4 text-center pt-5">Welcome to Admin Portal</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-8 d-flex justify-content-center mx-auto mt-5">
                        {/* <div className="position-absolute top-50 start-50 translate-middle"> */}
                            {/* <Link to="/user/id" className="btn mx-2" style={buttonStyle}>DATABASE</Link> */}
                            <Link to="/admin/create/account" className="btn mx-2" style={buttonStyle}>CREATE DOCTOR ACCOUNT</Link> 
                            <Link to="/admin/create/patient/account" className="btn mx-2" style={buttonStyle}>CREATE PATIENT ACCOUNT</Link>
                            <Link to="/admin/view/device/info" className="btn mx-2 btn-block" style={buttonStyle}>VIEW DEVICE INFO</Link>                                                       
                            <Outlet/>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
