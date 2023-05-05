import React from "react";


export default function DisplayTestReport(props) {

    return (
        <>
            <ul className="list-unstyled">
                <li><i className="bi bi-file-text-fill me-2"></i>{props.testName}</li>
            </ul>
        </>
    )
}