import React from "react";
import { Link, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function DisplayNotesWithDate(props) {
    console.log("props---", props);
    // const array = [
    //     {
    //         term: "2023-04-06",
    //         description: "Take medicine on time"
    //     },
    //     {
    //         term: "2023-04-06",
    //         description: "Take medicine on time"
    //     },
    //     {
    //         term: "2023-04-06",
    //         description: "Take medicine on time"
    //     },
    // ]
    const navigate = useNavigate();
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-12">
                        <div className="card mb-5" style={{ color: "white", backgroundColor: "#041342" }}>
                            <div className="card-body">
                                <h5 className="card-title">Notes</h5>
                                <hr className="border-5" style={{ color: "white" }}></hr>
                                {/* {array.map((item) => {
                                    return (
                                        <>
                                            <p>{item.description}</p>
                                        </>
                                    )
                                })} */}
                                <ul className="list-unstyled">
                                    <dl><dt> <i className="bi bi-calendar-check me-2"></i>{props.term}</dt><dd className="ms-4">{props.description}</dd></dl>
                                </ul>
                            </div>
                            <button className="nav-link btn btn-width align-self-center mb-3 p-1" type="submit" onClick={(e) => navigate(`/patientprofile/notes/${props.patid}`)} style={{ color: "white", backgroundColor: "#24a3ac" }}>Edit Notes </button>
                            {/* <Link to="/viewnotes" className="nav-link btn btn-width align-self-center mb-3 p-1" style={{ color: "white", backgroundColor: "#24a3ac", borderRadius: 6 }} >View Full List</Link> */}
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}