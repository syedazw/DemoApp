import React from "react"
import { usefirebase } from '../context/firebase'
// import LoginUser from "./loginUser";
// import Swal from 'sweetalert2';
// import Alert from '../App';


export default function AddDoctor() {
    const firebase = usefirebase();
    console.log('firebase', firebase);

    // creating an state
    const [doctorRegister, setdoctorRegister] = React.useState({
        fullname: "",
        email: "",
        doctorMobile: "",
        workPhone: "",
        age: "",
        gender: ""
    })

    const [isfill, setIsFill] = React.useState(true)
    // const [image, setImage] = React.useState("https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    console.log(doctorRegister)




    function handleChange(event) {
        event.preventDefault()
        // destructure event.target
        // console.log(event.target)
        const { name, value, type, checked } = event.target   // destructuring event.target
        setdoctorRegister((prevData) => {
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

    const addDoctorData = (event) => {
        event.preventDefault();

        // Add data to firestore
        const collectionName = "Doctor";
        const data = {
            fullname: doctorRegister.fullname,
            email: doctorRegister.email,
            doctorMobile: doctorRegister.doctorMobile,
            workPhone: doctorRegister.workPhone,
            age: doctorRegister.age,
            gender: doctorRegister.gender
        }
        let password = 12345678
        const result = firebase.uploadDataToFirestore(collectionName, data);
        console.log("suucessfully added doctor data with generated id", result); // result shows id of collection
        const newAccount = firebase.signupUserWithEmailAndPassword(doctorRegister.email, password)
        console.log("Doctor Account successfully created", newAccount)
    }


    return (
        // input type --> text: first name, last name, email, phone, state, date of birth, address, city, country
        // input type --> checkbox: Member of any other medical association
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-sm-8 col-md-5 mx-auto">
                        <div className="row">
                            <h4 className="fw-bold text-center">ADD NEW DOCTOR</h4>
                            <br /><br /><br />
                        </div>
                        
                        <form className="row g-3 needs-validation" onSubmit={addDoctorData}>

                            <div className="col-sm-12 col-md-12">

                                {/* <div className="d-flex justify-content-center mb-4">
                                    <img src={image} className="rounded-circle" alt="example placeholder" style={{ width: "200px", height: "200px" }} name="image" value={setImage.image} onChange={handleImage} />
                                </div>

                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-rounded" style={{ color: "white", backgroundColor: "#041342" }}>
                                        <label className="form-label text-white m-1" for="customFile2" >Upload Image</label>
                                        <input type="file" className="form-control d-none" id="customFile2" name="image" onChange={handleImage} />
                                    </div>
                                </div> */}
                                
                            </div>
                            
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom01" className="form-label fw-bold mb-0">Full Name:</label>
                                <input type="text" className="form-control" id="validationCustom01" required name="fullname" value={setdoctorRegister.fullname} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">Email:</label>
                                <input type="email" className="form-control" id="validationCustom04" required name="email" value={setdoctorRegister.email} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom07" className="form-label mb-0 fw-bold">Doctor Mobile:</label>
                                <input type="text" className="form-control" id="validationCustom07" required name="patientMobile" value={setdoctorRegister.doctorMobile} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom08" className="form-label mb-0 fw-bold">Work Phone:</label>
                                <input type="email" className="form-control" id="validationCustom08" required name="workPhone" value={setdoctorRegister.workPhone} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>


                            <div className="col-md-3">
                                <label htmlFor="validationCustom09" className="form-label mb-0 fw-bold">Age:</label>
                                <select className="form-select" id="validationCustom09" required name="age" value={setdoctorRegister.age} onChange={handleChange}>
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


                            <div className="col-md-4">
                                <label htmlFor="validationCustom10" className="form-label mb-0 fw-bold">Gender:</label>
                                <select className="form-select" id="validationCustom10" required name="gender" value={setdoctorRegister.gender} onChange={handleChange}>
                                    <option defaultValue disabled selected>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid gender.</div>
                            </div><br /><br />

                            <div className="col-12">
                                <button 
                                className="btn" 
                                type="submit" 
                                onClick={addDoctorData}
                                style={{ color: "white", backgroundColor: "#041342" }}>CREATE ACCOUNT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}