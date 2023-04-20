import React from "react";
import { useNavigate } from "react-router-dom"

export default function DisplayTestReport(props) {
    const navigate = useNavigate();
    return (
        <>
            <ul className="list-unstyled">
                <li><i className="bi bi-file-text-fill me-2"></i>{props.testName}</li>
            </ul>
        </>
    )
}