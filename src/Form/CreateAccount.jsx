
import React from "react";

export default function CreateAccount() {
    const [createUser, setCreateUser] = React.useState({ email: "", password: "" })
    function handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target
        setCreateUser((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()
        console.log(createUser)
    }
    
    return (
        <>
            <div className="container-fluid">
                <div className="row mx-auto">
                    <div className="col-sm-12 col-md-6 mx-auto">
                        <form>
                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom02" className="form-label fw-bold mb-0">Email:</label>
                                <input type="email" className="form-control" id="validationCustom02" required name="email" value={setCreateUser.email} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>

                            <div className="col-sm-12 col-md-6">
                                <label htmlFor="validationCustom04" className="form-label fw-bold mb-0">Password:</label>
                                <input type="password" className="form-control" id="validationCustom04" required name="password" value={setCreateUser.password} onChange={handleChange} />
                                <div className="valid-feedback">Looks good!</div>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary mt-3" onClick={handleSubmit}>CREATE ACCOUNT</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
