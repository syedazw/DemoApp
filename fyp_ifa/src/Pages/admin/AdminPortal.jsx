import React from "react"
import { Outlet, Link } from "react-router-dom"

export default function AdminPortal() {
    const buttonStyle = { color: "white", backgroundColor: "#041342" }
    return (
        <>
        <div className="row bg-color text-light pt-4">
            <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>
                    <div className="col-sm-12 col-md-6 d-flex justify-content-start">
                        <div className="dropdown pb-4 mx-4 ms-auto">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                {/* <span className="d-none d-sm-inline mx-1"></span> */}
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>
            </div>
            <p className="h4 text-center pt-5">Welcome to Admin Portal</p>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-8 d-flex justify-content-center mx-auto mt-5">
                        <Link to="/admin/create/account" className="btn mx-2" style={buttonStyle}>CREATE DOCTOR ACCOUNT</Link>
                        <Link to="/admin/create/patient/account" className="btn mx-2" style={buttonStyle}>CREATE PATIENT ACCOUNT</Link>
                        <Link to="/admin/view/device/info" className="btn mx-2 btn-block" style={buttonStyle}>VIEW DEVICE INFO</Link>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
