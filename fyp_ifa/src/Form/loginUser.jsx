import React from "react"
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from '../context/firebase'
import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../context/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"
import { notifyOnMobile } from "../utils/notify"

export default function LoginUser() {
  const firebase = usefirebase();
  // console.log('firebase', firebase);
  // console.log("Login Error ---", firebase.loginError)
  // console.log(firebase.restrictAccess)

  // let allow = firebase.restrictAccess
  // let displayError = firebase.loginError
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }

  const [userInfo, setuserInfo] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState(""); //set error to handle exception
  const [user, setuser] = useState(null); //set user detail to a variable
  // const [checkCredential, setCheckCredential] = useState(false)
  // const [checkDomain, setDomain] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');

  // const [storeEmail, setStoreEmail] = useState(null)
  // const [userID, setUserID] = useState(null)

  // console.log("Default value of 'user' state is ", user)
  // console.log("user details:", userInfo)

  // create instance for navigation
  const navigate = useNavigate()

  function handleChange(event) {
    event.preventDefault();
    // setError("");
    setuserInfo((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    })
  }



  const handleSubmit = async (event) => {

    notifyOnMobile();

    try {
      await firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password);
    } catch (error) {
      await firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password)
    }

    setTimeout(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setuser(user)
          console.log("Yes user successfully login", user)

          // setUserID(prevValue => user.uid)
          // setStoreEmail(value => user.email)



          // check for admin domain
          let userEmail = user.email
          let userID = user.uid
          console.log("user id", userID)
          console.log("get user email", userEmail)
          console.log("printing domain name", userEmail)
          if (userEmail.slice(-10) === '@admin.com') {
            console.log("Login as admin")
            navigate('/admin/portal')

          } else if (userEmail.slice(-11) === '@doctor.com') {
            console.log("Login as doctor")
            navigate('/dashboard')

          } else if (userEmail.slice(-12) === '@patient.com') {
            console.log("Login as patient")
            navigate('/home')
          }
          else {
            navigate('/')
          }
        } else {
          console.log("Fail to get user")
        }
      }
      )
    }, 3000)
    
    
    

    // possible worst case:
    // auth/user-not-found
    // auth/invalid-email
    // auth/email-not-found
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">

            <p className="fw-bold text-center mt-5 pt-5" style={{ color: "#041342" }}>IMMEDIATE FIRST AID</p>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
            <form onSubmit={handleSubmit}>
              <div className="mt-2 mb-2 mx-5">
                <label htmlFor="exampleInputText" className="form-label fw-bold" style={{ color: "#041342" }}>Username:</label>
                <input type="text" className="form-control" id="exampleInputText" aria-describedby="textHelp" name="username" value={userInfo.username} onChange={handleChange} />
              </div>

              <div className="mb-2 mx-5">
                <label htmlFor="exampleInputPassword1" className="form-label fw-bold" style={{ color: "#041342" }}>Password: </label>
                <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={userInfo.password} onChange={handleChange} />
              </div>
              <div className="mt-2 mb-2 mx-5">
                <input type="checkbox" className="form-check-input me-2" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1" style={{ color: "#041342" }}>Remember my password</label>
              </div>
              <a className="mx-5" style={{ color: "#041342" }}>Forget Password?</a>
              <div className="row">
                <div className="col-sm-5 col-md-12 ms-4">
                  <Link type="submit" className="mt-4 mx-4 p-2" style={buttonStyle} to={navigate} onClick={handleSubmit}>Login</Link>
                  <br></br>
                  {/* {checkCredential ? <button className="btn btn-danger mx-4">Invalid Username or Password</button> : null} */}
                  {/* {checkDomain && <button className="btn btn-warning">Invalid Domain</button>} */}
                  <Outlet />
                </div>
              </div>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
          </div>
        </div>
      </div>


    </>
  )
}