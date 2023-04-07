import React from "react"
// importing Firestore from firebase
import { usefirebase } from '../context/firebase'

export default function DoctorInfo() {
    const firebase = usefirebase();
    console.log('firebase', firebase);
    // creating an state
    const [doctorRegister, setDoctorRegister] = React.useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        dob: "",
        isMember: false,
    })
    const [docs, setDocs] = React.useState({})
    function handleDocument(event) {
        setDocs(event.target.files)
        console.log("Receiving document..",docs)
    }
    console.log(docs)


    // console.log(docs.document)
    const [image, setImage] = React.useState("https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")
    // const [isfill, setIsFill] = React.useState(true)




    function handleChange(event) {
        event.preventDefault();
        // destructure event.target
        // console.log(event.target)

        const { name, value, type, checked } = event.target   // destructuring event.target
        // if (name === "document") {
        //     const fileName = files[0].name;
        //     console.log("File Name:", fileName);
        // }
        setDoctorRegister((prevData) => {
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
    // FUNCTION TO UPLOAD DOCTORS INFORMATION TO FIRESTORE

    // const addDoctorsData = async (event) => {
    //     event.preventDefault();

    //     // Add data to firestore
    //     const collectionName = "Doctor";
    //     const data = {
    //         fname: doctorRegister.fname,
    //         lname: doctorRegister.lname,
    //         email: doctorRegister.email,
    //         phone: doctorRegister.phone,
    //         city: doctorRegister.city,
    //         country: doctorRegister.country,
    //         dob: doctorRegister.dob,
    //         isMember: false,
    //         document: doctorRegister.document,
    //     }
    //     const result = firebase.uploadDataToFirestore(collectionName, data);
    //     console.log("suucessfully added doctor's data with generated id", result); // result shows id of collection
    // }

    // function to upload data

    const addDoctorsData = async (event) => {
        event.preventDefault();
        const data = {
            fname: doctorRegister.fname,
            lname: doctorRegister.lname,
            email: doctorRegister.email,
            phone: doctorRegister.phone,
            city: doctorRegister.city,
            country: doctorRegister.country,
            dob: doctorRegister.dob,
            isMember: false,
        }
        // const document = docs.document;
        console.log('data', data);
        // console.log('document', document);
        const result = await firebase.uploadFilesToFirestore(data, docs);
        // {docs ? result: null}
        console.log("successfully added doctor's data with generated id", result); // result shows id of collection
    }




    return (
        // input type --> text: first name, last name, email, phone, state, date of birth, address, city, country
        // input type --> checkbox: Member of any other medical association


        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-sm-8 col-md-5 mx-auto">
                        <p className="h5 mx-auto text-center fw-bold mb-3">DOCTOR PERSONAL INFORMATION</p>
                        <form className="row g-3 needs-validation" noValidate>

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
                                <label htmlFor="validationCustom01" className="form-label fw-bold mb-0">First Name:</label>
                                <input type="text" className="form-control" id="validationCustom01" required name="fname" value={setDoctorRegister.fname} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom02" className="form-label mb-0 fw-bold">Last Name:</label>
                                <input type="text" className="form-control" id="validationCustom02" required name="lname" value={setDoctorRegister.lname} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-sm-12 col-md-7">
                                <label htmlFor="validationCustom03" className="form-label mb-0 fw-bold">Email:</label>
                                <input type="email" className="form-control" id="validationCustom03" required name="email" value={setDoctorRegister.email} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-sm-12 col-md-5">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">Phone:</label>
                                <input type="text" className="form-control" id="validationCustom04" required name="phone" value={setDoctorRegister.phone} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">City:</label>
                                <select className="form-select" id="validationCustom04" required name="city" value={setDoctorRegister.city} onChange={handleChange}>
                                    <option defaultValue selected disabled>Choose...</option>
                                    <option value="Karachi">Karachi</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Jacobabad">Jacobabad</option>
                                    <option value="Khairpur">Khairpur</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid city.</div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="validationCustom04" className="form-label mb-0 fw-bold">Country:</label>
                                <select className="form-select" id="validationCustom04" required name="country" value={setDoctorRegister.country} onChange={handleChange}>
                                    <option defaultValue disabled selected>Choose...</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Oman">Oman</option>
                                </select>
                                <div className="invalid-feedback">Please select a valid country.</div>
                            </div>
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label className="form-label mb-0 fw-bold">Date of Birth:</label>
                                    <div className='input-group date' id='datetimepicker1'>
                                        <input type='date' className="form-control" name="dob" value={setDoctorRegister.dob} onChange={handleChange} />
                                        <span className="input-group-addon">
                                            <span className="glyphicon glyphicon-calendar"></span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-7">
                                <label htmlFor="formFileMultiple" class="form-label mb-0 fw-bold">Upload Documents</label>
                                <input className="form-control" type="file" id="formFileMultiple" onChange={handleDocument} multiple={true} value={setDocs.document} />
                            </div>
                            <div className="col-12">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required name="isMember" checked={setDoctorRegister.isMember} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                        Are you a member of any other medical association?
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button className="btn" type="submit" onClick={addDoctorsData} style={{ color: "white", backgroundColor: "#041342" }}>SAVE CHANGES</button>
                                {/* <div className="row">
                                    {isfill ? <FilledButton /> : <UnfilledButton />}
                                </div> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}