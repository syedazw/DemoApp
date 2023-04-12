import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function MainPage() {
    const buttonStyle = { color: "white", backgroundColor: "#041342" }
    return (
        <>
            <p className="h3 text-center fw-bold pt-5">WELCOME TO IMMEDIATE FIRST AID APP</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 ">
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <Link to="/admin/portal" className="btn mx-2" style={buttonStyle}>ADMIN PORTAL</Link>
                            <Link to="/dashboard" className="btn mx-2" style={buttonStyle}>DOCTOR PORTAL</Link>
                            <Link to="/home" className="btn mx-2" style={buttonStyle}>PATIENT PORTAL</Link>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}