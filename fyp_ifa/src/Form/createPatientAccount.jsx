import React from "react"
import { usefirebase } from '../context/firebase'
import { Outlet, Link } from "react-router-dom"
import { Error, Success } from "../utils/toastify"

export default function PatientInfo() {


    const firebase = usefirebase();
    console.log('firebase', firebase);
    // creating an state
    const [patientRegister, setpatientRegister] = React.useState({
        fullname: "",
        careTaker: "",
        assistant: "",
        email: "",
        password: "",
        careTakerMobile: "",
        homeMobile: "",
        patientMobile: "",
        workPhone: "",
        age: "",
        weight: "",
        height: "",
        dob: "",
        homeAddress: "",
        isCritical: false,
        gender: "",
        method: "",
        deviceName: "",
        deviceToken: "",
        deviceAssignDate: ""
    })

    const [isfill, setIsFill] = React.useState(true)
    // const [image, setImage] = React.useState("https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    console.log(patientRegister)




    function handleChange(event) {
        event.preventDefault()
        // destructure event.target
        // console.log(event.target)
        const { name, value, type, checked } = event.target   // destructuring event.target
        setpatientRegister((prevData) => {
            return {
                ...prevData,
                // if type of input is checkbox then store it in checked else in value
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleClick(event) {
        event.preventDefault()
    }

    function handleImage(event) {
        console.log("Image is changing")
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    // FUNCTION TO STORE INPUT DATA IN FIRESTORE

    const addPatientData = async (event) => {
        event.preventDefault();

        // Add data to firestore

        if (!patientRegister.email.endsWith("@patient.com")) {
            Error("Only patient.com email domains are allowed")
        }
        
        const collectionName = "Patients";
        const data = {
            fullname: patientRegister.fullname,
            careTaker: patientRegister.careTaker,
            assistant: patientRegister.assistant,
            email: patientRegister.email,
            password: patientRegister.password,
            careTakerMobile: patientRegister.careTakerMobile,
            homeMobile: patientRegister.homeMobile,
            patientMobile: patientRegister.patientMobile,
            workPhone: patientRegister.workPhone,
            age: patientRegister.age,
            weight: patientRegister.weight,
            height: patientRegister.height,
            dob: patientRegister.dob,
            homeAddress: patientRegister.homeAddress,
            critical: patientRegister.isCritical,
            gender: patientRegister.gender,
            method: patientRegister.method,
            deviceName: patientRegister.deviceName,
            deviceToken: patientRegister.deviceToken,
            deviceAssignDate: patientRegister.deviceAssignDate
        }

        try {
            // Add data to Firestore
            const result = await firebase.uploadDataToFirestore(collectionName, data);
            console.log("Successfully added patient data with generated id", result);

            // Create a new patient account
            const newAccount = await firebase.signupUserWithEmailAndPassword(
                patientRegister.email,
                patientRegister.password
            );

            Success("Account created successfully")
            console.log("Patient Account successfully created", newAccount);

        } catch (error) {
            console.error(
                "Error occurred while saving data or creating account:",
                error.message
            );
            // Handle the error if needed
        }
    };

    return (
        // input type --> text: first name, last name, email, phone, state, date of birth, address, city, country
        // input type --> checkbox: Member of any other medical association
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-sm-8 col-md-10 mx-auto">
                        <form className="row g-3 needs-validation" onSubmit={addPatientData}>
                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustomFullName" className="form-label fw-bold mb-0">Full Name:</label>
                                <input type="text" className="form-control" id="validationCustomFullName" required name="fullname" value={patientRegister.fullname} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustom02" className="form-label mb-0 fw-bold">Care Taker:</label>
                                <input type="text" className="form-control" id="validationCustom02" required name="careTaker" value={patientRegister.careTaker} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustom03" className="form-label mb-0 fw-bold">Assistant:</label>
                                <input type="text" className="form-control" id="validationCustom03" required name="assistant" value={patientRegister.assistant} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>





                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustom05" className="form-label mb-0 fw-bold">Caretaker Mobile:</label>
                                <input type="text" className="form-control" id="validationCustom05" required name="careTakerMobile" value={patientRegister.careTakerMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-2">
                                <label htmlFor="validationCustom06" className="form-label mb-0 fw-bold">Home Mobile:</label>
                                <input type="email" className="form-control" id="validationCustom06" required name="homeMobile" value={patientRegister.homeMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-2">
                                <label htmlFor="validationCustom07" className="form-label mb-0 fw-bold">Patient Mobile:</label>
                                <input type="text" className="form-control" id="validationCustom07" required name="patientMobile" value={patientRegister.patientMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-2">
                                <label htmlFor="validationCustom08" className="form-label mb-0 fw-bold">Work Phone:</label>
                                <input type="email" className="form-control" id="validationCustom08" required name="workPhone" value={patientRegister.workPhone} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">Email:</label>
                                <input type="email" className="form-control" id="validationCustom04" required name="email" value={patientRegister.email} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="exampleInputPassword1" className="form-label mb-0 fw-bold" style={{ color: "#041342" }}>Password: </label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={patientRegister.password} onChange={handleChange} />
                            </div>

                            <div className="col-sm-12 col-md-2">
                                <label htmlFor="validationCustomGender" className="form-label mb-0 fw-bold">Gender:</label>
                                <select className="form-select" id="validationCustomGender" required name="gender" value={setpatientRegister.gender} onChange={handleChange}>
                                    <option defaultValue disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid gender.</div>
                            </div>


                            <div className="col-md-2">
                                <label htmlFor="validationCustomAge" className="form-label mb-0 fw-bold">Age:</label>
                                <select className="form-select" id="validationCustomAge" required name="age" value={setpatientRegister.age} onChange={handleChange}>
                                    <option defaultValue selected disabled>Choose...</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="44">43</option>
                                    <option value="44">44</option>
                                    <option value="44">45</option>
                                    <option value="44">46</option>
                                    <option value="44">47</option>
                                    <option value="44">48</option>
                                    <option value="44">49</option>
                                    <option value="44">50</option>
                                    <option value="44">51</option>
                                    <option value="44">52</option>
                                    <option value="44">53</option>
                                    <option value="44">54</option>
                                    <option value="44">55</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid city.</div>
                            </div>


                            <div className="col-md-2">
                                <label htmlFor="validationCustomWeight" className="form-label mb-0 fw-bold">Weight:</label>
                                <select className="form-select" id="validationCustomWeight" required name="weight" value={setpatientRegister.weight} onChange={handleChange}>
                                    <option defaultValue disabled selected>Choose...</option>
                                    <option value="50">50 kg</option>
                                    <option value="60">60 kg</option>
                                    <option value="70">70 kg</option>
                                    <option value="80">80 kg</option>
                                    <option value="90">90 kg</option>
                                    <option value="100">100 kg</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid country.</div>
                            </div>

                            <div className="col-md-2">
                                <label htmlFor="validationCustom11" className="form-label mb-0 fw-bold">Height:</label>
                                <select className="form-select" id="validationCustom11" required name="height" value={setpatientRegister.height} onChange={handleChange}>
                                    <option defaultValue disabled selected>Choose...</option>
                                    <option value="150">150 cm</option>
                                    <option value="160">160 cm</option>
                                    <option value="170">170 cm</option>
                                    <option value="180">180 cm</option>
                                    <option value="190">190 cm</option>
                                    <option value="200">200 cm</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid country.</div>
                            </div>


                            <div className="col-md-2">
                                <div className="form-group">
                                    <label className="form-label mb-0 fw-bold">Date of Birth:</label>
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='date' className="form-control" name="dob" value={patientRegister.dob} onChange={handleChange} />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-12">
                                <label htmlFor="validationCustomHomeAddress" className="form-label mb-0 fw-bold">Home Address:</label>
                                <textarea className="form-control h-75" id="validationCustomHomeAddress" required name="homeAddress" value={patientRegister.homeAddress} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-md-8">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="isCritical" id="invalidCheck" required name="isCritical" checked={patientRegister.isCritical} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        Is Patient Condition Critical?
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                            <p className="fw-bold h4 mb-0 text-decoration-underline">DEVICE INFORMATION</p>

                            <div className="col-sm-12 col-md-3">
                                <label htmlFor="validationCustomDeviceName" className="form-label fw-bold mb-0">Device Name:</label>
                                <input type="text" className="form-control" id="validationCustomDeviceName" required name="deviceName" value={patientRegister.deviceName} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-label mb-0 fw-bold">Device Assigned Date:</label>
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='date' className="form-control" name="deviceAssignDate" value={patientRegister.deviceAssignDate} onChange={handleChange} />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustomMethod" className="form-label fw-bold mb-0">Method:</label>
                                <input type="text" className="form-control" id="validationCustomMethod" required name="method" value={patientRegister.method} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-12">
                                <label htmlFor="validationCustomToken" className="form-label mb-0 fw-bold">Bearer Token:</label>
                                <textarea className="form-control h-50" id="validationCustomToken" required name="deviceToken" value={patientRegister.deviceToken} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-12">
                                <button className="btn" type="submit" onClick={addPatientData} style={{ color: "white", backgroundColor: "#041342" }}>CREATE ACCOUNT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}