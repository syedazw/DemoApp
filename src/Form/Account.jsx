import React from "react"
import { Outlet, Link } from "react-router-dom"
// import hook which we have make in firebase,jsx
import { usefirebase } from '../context/firebase'

export default function Account() {
    const firebase = usefirebase();
    console.log('firebase', firebase);

    const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px" }
    const [userRegistration, setUpdateUserRegistration] = React.useState(
        { username: "", password: "", confirmPassword: "" }
    )

    console.log(userRegistration)
    function handleChange(event) {
        event.preventDefault()
        setUpdateUserRegistration((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    function createAccountbyAdmin(event) {
        event.preventDefault()
        event.stopPropagation()
        let result = firebase.signupUserWithEmailAndPassword(userRegistration.username, userRegistration.password)
        console.log("Account created by Admin Successfully", result)
        setTimeout(()=>{
            window.location.reload()
        },
        2000)
        
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">
                        <form >
                            <p className="fw-bold text-center mt-5 pt-5" style={{ color: "#041342" }}>IMMEDIATE FIRST AID</p>

                            <div className="mt-2 mb-2 mx-5">
                                <label htmlFor="exampleInputText" className="form-label fw-bold mb-0" style={{ color: "#041342" }}>Username:</label>
                                <input type="text" className="form-control" id="exampleInputText" aria-describedby="textHelp" name="username" value={userRegistration.username} onChange={handleChange} />
                            </div>

                            <div className="mb-2 mx-5">
                                <label htmlFor="exampleInputPassword1" className="form-label fw-bold mb-0" style={{ color: "#041342" }}>Password: </label>
                                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userRegistration.password} onChange={handleChange} />
                            </div>

                            {/* <div className="mb-2 mx-5">
                                <label htmlFor="exampleInputPassword2" className="form-label fw-bold mb-0" style={{ color: "#041342" }}>Confirm Password: </label>
                                <input type="password" className="form-control mb-4" id="exampleInputPassword2" name="confirmPassword" value={userRegistration.confirmPassword} onChange={handleChange} />
                            </div> */}

                            {/* <a className="mx-5" style={{ color: "#041342" }}>Already have an account?</a> */}
                            <div className="row">
                                <div className="col-sm-5 col-md-12 mx-5">
                                    {/* <button type="submit" className="mt-4 me-4 p-2" style={{color: "white", backgroundColor: "#041342" }}>
                                        <Link to="/loginpage" className="nav-link" style={{color: "white", backgroundColor: "#041342" }}>LOGIN</Link>
                                    </button> */}
                                    <button type="submit" className="mt-4 p-2" style={buttonStyle} onClick={createAccountbyAdmin}>
                                        SIGNUP
                                    </button>
                                    {/* <Outlet /> */}
                                </div>

                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}