import React from "react"
import { usefirebase } from '../context/firebase'
import { useParams } from "react-router-dom";

export default function PatientInfo() {
    const params = useParams();
    
    const firebase = usefirebase();
    console.log('firebase', firebase);
    // creating an state
    const [patientRegister, setpatientRegister] = React.useState({
        fullname: "",
        careTaker: "",
        assistant: "",
        email: "",
        careTakerMobile: "",
        homeMobile: "",
        patientMobile: "",
        workPhone: "",
        age: "",
        weight: "",
        height: "",
        dob: "",
        homeAddress: ""
    })

    const [isfill, setIsFill] = React.useState(true)
    const [image, setImage] = React.useState("https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    console.log(patientRegister)




    function handleChange(event) {
        event.preventDefault()
        // destructure event.target
        // console.log(event.target)
        const { name, value } = event.target   // destructuring event.target
        setpatientRegister((prevData) => {
            return {
                ...prevData,
                // if type of input is checkbox then store it in checked else in value
                [name]: value
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

    const addPatientData = (event) => {
        event.preventDefault();

        // Add data to firestore
        const collectionName = "Patients";
        const data = {
            fullname: patientRegister.fullname,
            careTaker: patientRegister.careTaker,
            assistant: patientRegister.assistant,
            email: patientRegister.email,
            careTakerMobile: patientRegister.careTakerMobile,
            homeMobile: patientRegister.homeMobile,
            patientMobile: patientRegister.patientMobile,
            workPhone: patientRegister.workPhone,
            age: patientRegister.age,
            weight: patientRegister.weight,
            height: patientRegister.height,
            dob: patientRegister.dob,
            homeAddress: patientRegister.homeAddress,

        }
        const result = firebase.uploadDataToFirestore(collectionName, data);
        console.log("suucessfully added patient data with generated id", result); // result shows id of collection
    }


    return (
        // input type --> text: first name, last name, email, phone, state, date of birth, address, city, country
        // input type --> checkbox: Member of any other medical association
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-sm-8 col-md-5 mx-auto">
                        <p className="h5 mx-auto text-center fw-bold mb-3">PATIENT PERSONAL INFORMATION</p>
                        
                        <Link to={`/patientprofile/${params.PatientID}`} className="navbar-brand text-light fw-bold">&lt; BACK</Link>

                        <form className="row g-3 needs-validation" noValidate >

                            <div className="col-sm-12 col-md-12">
                                <div className="d-flex justify-content-center mb-4">
                                    <img src={image} className="rounded-circle" alt="example placeholder" style={{ width: "200px", height: "200px" }} name="image" value={setImage.image} onChange={handleImage} />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-rounded" style={{ color: "white", backgroundColor: "#041342" }}>
                                        <label className="form-label text-white m-1" for="customFile2" >Upload Image</label>
                                        <input type="file" className="form-control d-none" id="customFile2" name="image" onChange={handleImage} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom01" className="form-label fw-bold mb-0">Full Name:</label>
                                <input type="text" className="form-control" id="validationCustom01" required name="fullname" value={setpatientRegister.fullname} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom02" className="form-label mb-0 fw-bold">Care Taker:</label>
                                <input type="text" className="form-control" id="validationCustom02" required name="careTaker" value={setpatientRegister.careTaker} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom03" className="form-label mb-0 fw-bold">Assistant:</label>
                                <input type="text" className="form-control" id="validationCustom03" required name="assistant" value={setpatientRegister.assistant} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">Email:</label>
                                <input type="email" className="form-control" id="validationCustom04" required name="email" value={setpatientRegister.email} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom05" className="form-label mb-0 fw-bold">Caretaker Mobile:</label>
                                <input type="text" className="form-control" id="validationCustom05" required name="careTakerMobile" value={setpatientRegister.careTakerMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom06" className="form-label mb-0 fw-bold">Home Mobile:</label>
                                <input type="email" className="form-control" id="validationCustom06" required name="homeMobile" value={setpatientRegister.homeMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom07" className="form-label mb-0 fw-bold">Patient Mobile:</label>
                                <input type="text" className="form-control" id="validationCustom07" required name="patientMobile" value={setpatientRegister.patientMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom08" className="form-label mb-0 fw-bold">Work Phone:</label>
                                <input type="email" className="form-control" id="validationCustom08" required name="workPhone" value={setpatientRegister.workPhone} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-12">
                                <label htmlFor="validationCustom09" className="form-label mb-0 fw-bold">Home Address:</label>
                                <textarea className="form-control h-75" id="validationCustom09" required name="homeAddress" value={setpatientRegister.homeAddress} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="validationCustom09" className="form-label mb-0 fw-bold">Age:</label>
                                <select className="form-select" id="validationCustom09" required name="age" value={setpatientRegister.age} onChange={handleChange}>
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


                            <div className="col-md-3">
                                <label htmlFor="validationCustom10" className="form-label mb-0 fw-bold">Weight:</label>
                                <select className="form-select" id="validationCustom10" required name="weight" value={setpatientRegister.weight} onChange={handleChange}>
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

                            <div className="col-md-3">
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


                            <div className="col-md-3">
                                <div className="form-group">
                                    <label className="form-label mb-0 fw-bold">Date of Birth:</label>
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='date' className="form-control" name="dob" value={setpatientRegister.dob} onChange={handleChange} />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button className="btn" type="submit" onClick={addPatientData} style={{ color: "white", backgroundColor: "#041342" }}>SAVE CHANGES</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}