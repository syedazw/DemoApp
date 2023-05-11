import React from "react"
import { Outlet, Link } from "react-router-dom"

//create a function which list down all the update

export default function HomeUpdate() {
    return (
        <>
        <div className="container-fluid">
                <div className="row bg-color text-light pt-4">
                    <div className="col-sm-12 col-md-4"><h4 className="text-center">Immediate First Aid</h4></div>

                    <div className="col-sm-12 col-md-2"><p className="text-center">Welcome Mr.Joseph</p></div>

                    <div className="col-sm-12 col-md-6 d-flex justify-content-start">
                        <form className="d-flex-inline mx-4" role="search">
                            <input className="form-control col-sm-5" type="search" placeholder="Search" aria-label="Search"></input>
                        </form>
                        <i className="bi bi-bell-fill" style={{ color: "yellow" }}></i>
                        <div className="dropdown pb-4 mx-4">
                            <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt="hugenerd" width="30" height="30" className="rounded-circle" />
                                <span className="d-none d-sm-inline mx-1"></span>
                            </a>
                            <ul className="dropdown-menu text-small shadow">
                                <li><Link to="/patient/personal/information" className="dropdown-item">View Profile</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item"><Link to="/loginpage" className="nav-link">Sign Out</Link></a></li>
                                <Outlet />
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 bg-color">
                        <nav className="navbar">
                            <Link to="/allpatient" className="navbar-brand text-light fw-bold mx-5">MENU</Link>
                            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon bg-light"></span></button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                    <li className="nav-item"><Link to="/home" className="nav-link text-light mx-3">HOME</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">CARDIOGRAM</Link></li>
                                    <li className="nav-item"><Link to="/home/medication" className="nav-link text-light mx-3">MEDICATIONS</Link></li>
                                    <li className="nav-item"><Link to="/home/recommendation" className="nav-link text-light mx-3">TESTS</Link></li>
                                    <li className="nav-item"><Link to="/home/update" className="nav-link text-primary mx-3">UPDATES</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">RECOMMENDATIONS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">UPCOMING APPOINMENTS</Link></li>
                                    <li className="nav-item"><Link to="#" className="nav-link text-light mx-3">DOCTOR'S PROFILE</Link></li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                <div className="row">
                    <h4 className="fw-bold text-center">UPDATES</h4>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">
                <div className="col-sm-12 col-md-4 mx-auto">
                        <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                            <div className="card-body">
                                <h5 className="card-title">Updates</h5>
                                <hr className="border-5" style={{ color: "white" }}></hr>
                                <ul className="list-unstyled">
                                    <li><dl><dt><i className="bi bi-arrow-right mx-2 mb-2"></i>Term 1:</dt><dd className="mx-4 fw-light">Description................</dd></dl></li>
                                    <li><dl><dt><i className="bi bi-arrow-right mx-2 mb-2"></i>Term 1:</dt><dd className="mx-4 fw-light">Description................</dd></dl></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}