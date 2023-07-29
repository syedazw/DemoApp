import React from "react";

export default function DisplayNotesWithDate(props) {
    console.log("receiving props---", props);


    return (
        <>
            <ul className="list-unstyled">
                <dl><dt> <i className="bi bi-calendar-check me-2"></i>{props.term}</dt><dd className="ms-4">{props.description}</dd></dl>
            </ul>

        </>
    )
}