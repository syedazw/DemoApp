import React from "react";
import { Link, Outlet } from "react-router-dom"


export default function AdminMainHeader() {
    return (
        <>

            <div className="row bg-color text-light pt-4">
                <div className="col-sm-4 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>
                <div className="col-sm-2 col-md-6 d-flex justify-content-start">
                    <div className="dropdown pb-4 mx-4 ms-auto">
                        <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                        </a>
                        <ul className="dropdown-menu text-small shadow">
                            <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                            <Outlet />
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}