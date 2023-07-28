import React from "react";


export default function DisplayMedication(props) {

    return (
        <>
            <ul className="list-unstyled">
                <li><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-capsule mb-2 mx-2" viewBox="0 0 16 16"><path d="M1.828 8.9 8.9 1.827a4 4 0 1 1 5.657 5.657l-7.07 7.071A4 4 0 1 1 1.827 8.9Zm9.128.771 2.893-2.893a3 3 0 1 0-4.243-4.242L6.713 5.429l4.243 4.242Z" /></svg>{props.medicineName} ({props.dosage})</li>
            </ul>
        </>
    )
}