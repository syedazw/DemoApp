import React from "react";
import { Link, Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function DisplayNotesWithDate(props) {
    console.log("receiving props---", props);
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
            <ul className="list-unstyled">
                <dl><dt> <i className="bi bi-calendar-check me-2"></i>{props.term}</dt><dd className="ms-4">{props.description}</dd></dl>
            </ul>

        </>
    )
}