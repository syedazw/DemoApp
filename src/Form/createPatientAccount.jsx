import React from "react"


export default function CreatePatientAccount() {
    const [patientRegisteration, setpatientRegisteration] = React.useState({
        patientName: "",
        gender: "",
        dob: "",
        contactNo: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        maritalStatus: "",
        // emergency contact
        emergencyContactName: "",
        emergencyContactRelationship: "",
        emergencyContactNumber: "",
        familyDoctorName: "",
        familtyDoctorContactNumber: "",
        //health history
        registrationReason: "",
        isPatientCritical: false,


    })

    function handleChange(event) {
        event.preventDefault()
        const { name, value, type, checked } = event.target   // destructuring event.target
        setpatientRegisteration((prevData) => {
            return {
                ...prevData,
                // if type of input is checkbox then store it in checked else in value
                [name]: type === "checkbox" ? checked : value
            }
        })

    }
    console.log(patientRegisteration)

    function handleSubmit(event) {
        event.preventDefault()
        console.log("Account created")
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <form className="row g-2 needs-validation" noValidate>
                        {/* patient name */}
                        <div className="col-sm-12 col-md-4">
                            <label htmlFor="validationCustom01" className="form-label fw-bold mb-0">Patient Name:</label>
                            <input type="text" className="form-control" id="validationCustom01" required name="patientName" value={patientRegisteration.patientName} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>

                        {/* gender */}
                        <div className="col-md-3">
                            <label htmlFor="validateGender" className="form-label mb-0 fw-bold">Gender:</label>
                            <select className="form-select col-sm-5" id="validateGender" required name="gender" value={patientRegisteration.gender} onChange={handleChange}>
                                <option defaultValue selected disabled>Choose...</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>



                        {/* email */}
                        <div className="col-sm-12 col-md-5">
                            <label htmlFor="valideEmail" className="form-label fw-bold mb-0">Email:</label>
                            <input type="email" className="form-control" id="valideEmail" required name="email" value={patientRegisteration.email} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* contact number */}
                        <div className="col-sm-12 col-md-4">
                            <label htmlFor="contact_id" className="form-label fw-bold mb-0">Contact No:</label>
                            <input type="integer" className="form-control" id="contact_id" required name="contactNo" value={patientRegisteration.contactNo} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>




                        {/* date of birth */}
                        <div className="col-md-3">
                            <div className="form-group">
                                <label className="form-label mb-0 fw-bold">Date of Birth:</label>
                                <div className='input-group date' id='datetimepicker1'>
                                    <input type='date' className="form-control" name="dob" value={patientRegisteration.dob} onChange={handleChange} />
                                    <span className="input-group-addon">
                                        <span className="glyphicon glyphicon-calendar"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* marital status */}
                        <div className="col-sm-12 col-md-5">
                            <label htmlFor="marital_status" className="form-label mb-0 fw-bold">Marital Status:</label>
                            <select className="form-select col-sm-5" id="marital_status" required name="city" value={patientRegisteration.maritalStatus} onChange={handleChange}>
                                <option defaultValue="" selected disabled>Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Legally Separated">Legally Separated</option>
                                <option value="Widowed">Widowed</option>
                            </select>
                            <div className="invalid-feedback">Please select a valid marital status.</div>
                        </div>

                        {/* address */}
                        <div className="col-sm-12 col-md-12">
                            <label htmlFor="address_id" className="form-label fw-bold mb-0">Address:</label>
                            <input type="text" className="form-control h-75" id="address_id" required name="address" value={patientRegisteration.address} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>

                        {/* city */}
                        <div className="col-sm-12 col-md-2">
                            <label htmlFor="validationCustom09" className="form-label mb-0 fw-bold">City:</label>
                            <select className="form-select col-sm-5" id="validationCustom09" required name="city" value={patientRegisteration.city} onChange={handleChange}>
                                <option defaultValue="" selected disabled>Select City</option>
                                <option value="karachi">Karachi</option>
                                <option value="hyd">Hyderabad</option>
                                <option value="multan">Multan</option>
                                <option value="Sukkur">Sukkur</option>
                            </select>
                            <div className="invalid-feedback">Please select a valid city.</div>
                        </div>


                        {/* state */}
                        <div className="col-sm-12 col-md-3">
                            <label htmlFor="state_id" className="form-label fw-bold mb-0">State:</label>
                            <input type="text" className="form-control" id="state_id" required name="state" value={patientRegisteration.state} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* zip code */}
                        <div className="col-sm-12 col-md-3">
                            <label htmlFor="zipcode" className="form-label fw-bold mb-0">Zip Code:</label>
                            <input type="text" className="form-control" id="zipcode" required name="zipCode" value={patientRegisteration.zipCode} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>



                        {/* ----------------------------- */}
                        {/* emergency */}
                        <div className="col-sm-12 col-md-12">
                            <label className="form-label mt-4"><u className="fw-bold mb-0">EMERGENCY CONTACT</u></label>
                        </div>


                        {/* emergency contact name */}
                        <div className="col-sm-12 col-md-4">
                            <label htmlFor="emergencycn_id" className="form-label fw-bold mb-0">Contact Name:</label>
                            <input type="text" className="form-control" id="emergencycn_id" required name="emergencyContactName" value={patientRegisteration.emergencyContactName} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* emergency contact number */}
                        <div className="col-sm-12 col-md-4">
                            <label htmlFor="emergencyct_id" className="form-label fw-bold mb-0">Contact Number:</label>
                            <input type="text" className="form-control" id="emergencyct_id" required name="emergencyContactNumber" value={patientRegisteration.emergencyContactNumber} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* emergency contact person relationship */}
                        <div className="col-sm-12 col-md-4">
                            <label htmlFor="emergencycn_id" className="form-label fw-bold mb-0">Relationship:</label>
                            <input type="text" className="form-control" id="emergencycn_id" required name="emergencyContactRelationship" value={patientRegisteration.emergencyContactRelationship} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* family doctor name */}
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="family_doctor_id" className="form-label fw-bold mb-0">Family Doctor Name:</label>
                            <input type="text" className="form-control" id="family_doctor_id" required name="familyDoctorName" value={patientRegisteration.familyDoctorName} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>



                        {/* familty doctor contact number */}
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="family_doctor_contact_number_id" className="form-label fw-bold mb-0">Family Doctor Contact Number:</label>
                            <input type="text" className="form-control" id="family_doctor_contact_number_id" required name="familtyDoctorContactNumber" value={patientRegisteration.familtyDoctorContactNumber} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* ----------------------- */}
                        {/* health histoty */}
                        <div className="col-sm-12 col-md-12">
                            <label className="form-label mt-4"><u className="fw-bold mb-0">HEALTH HISTORY</u></label>
                        </div>

                        {/* patient registration reason */}
                        <div className="col-sm-12 col-md-12">
                            <label htmlFor="address_id" className="form-label fw-bold mb-0">Patient Registration Reason:</label>
                            <input type="text" className="form-control h-75" id="address_id" required name="registrationReason" value={patientRegisteration.registrationReason} onChange={handleChange} />
                            <div className="valid-feedback">Looks good!</div>
                        </div>


                        {/* patient current condition */}
                        <div className="col-sm-12 mt-2">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required name="isPatientCritical" checked={patientRegisteration.isPatientCritical} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="invalidCheck">
                                       Is Patient Condition Critical?
                                    </label>
                                    <div className="invalid-feedback">
                                        You must agree before submitting.
                                    </div>
                                </div>
                            </div>
                        <div className="col-12">
                            <button className="btn mt-5" type="submit" onClick={handleSubmit} style={{ color: "white", backgroundColor: "#041342" }}>CREATE ACCOUNT</button>
                            <div className="row">
                                {/* {isfill ? <FilledButton /> : <UnfilledButton />} */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}