import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function DisplayUpdate() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-8">
                        <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                            <div className="card-body">
                                <h5 className="card-title">Updates</h5>
                                <hr className="border-5" style={{ color: "white" }}></hr>
                                <ul className="list-unstyled">
                                    <li><dl><dt><i className="bi bi-arrow-right mx-2 mb-2"></i>Term 1:</dt><dd className="mx-4 fw-light">Description................</dd></dl></li>
                                    <li><dl><dt><i className="bi bi-arrow-right mx-2 mb-2"></i>Term 1:</dt><dd className="mx-4 fw-light">Description................</dd></dl></li>
                                </ul>
                            </div>
                            <Link to="/home/update" className="nav-link btn btn-width align-self-center mb-3 p-1" style={{ color: "white", backgroundColor: "#24a3ac", borderRadius: 6 }}>View Full List</Link>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}