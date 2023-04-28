import React from "react"
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from '../context/firebase'
import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../context/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { getAuth } from "firebase/auth"


export default function LoginUser() {
  const firebase = usefirebase();
  // console.log('firebase', firebase);
  // console.log("Login Error ---", firebase.loginError)
  // console.log(firebase.restrictAccess)

  let allow = firebase.restrictAccess
  let displayError = firebase.loginError
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
  // const navigate = useNavigate()

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
    event.preventDefault() // stop reload the page
    let result = true

    // This function will execute after 4 seconds
    setTimeout(()=>{
      result = firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password)
      if (result === true) {
        console.log("Permission deny")
      } else if (result === false) {
        console.log("Permission granted")
      } else {
        console.log("processing....")
      }
    },5000)

    


    // console.log("result", result)
    // console.log("Initial value is allow -", allow)

    // setTimeout(()=>{
    //   // if allow is true then restrict the user access, else false then provide the access
    //   console.log("allow -", allow)
    //   console.log("8 seconds")
    //   if (allow) {
    //     console.log("--Permission Granted--")
    //     // firebaseAuth, (user)=>{
    //     //   if (user) {
    //     //     console.log("user recently logged in with id",user.uid,"and email", user.email)
    //     //   }
    //     // }
    //   } 
      
    //   else {  //invalid user
    //     console.log("--Permision Deny --")
    //     if (displayError === 'auth/user-not-found') {
    //       console.log("simple user not found error")
    //     } else if (displayError === 'auth/invalid-email') {
    //       console.log('simple invalid email error')
    //     } else {
    //       console.log('')
    //     }
  
    //   }
    // },2000)
    // valid user
    































    // setuser(user)
    // console.log("receiving user details", user)
    // if (userInfo.username === '' || userInfo.password === '') {
    //   console.log("Invalid Input")
    //   setCheckCredential(true)
    //   setTimeout(() => {
    //     window.location.reload()  //reload the page on invalid username or password
    //   }, 1000)
    // }
    // else {
    //   setTimeout(() => {
    //     onAuthStateChanged(firebaseAuth, (user) => {
    //       if (user) {
    //         setuser(user)
    //         console.log("Yes user successfully login", user)
    //         let userEmail = user.email
    //         let userID = user.uid
    //         console.log("user id", userID)
    //         console.log("get user email", userEmail)
    //         console.log("printing domain name", userEmail)

    //         if (userEmail.slice(-10) === '@admin.com') {
    //           console.log("Login as admin")
    //           navigate('/admin/portal')

    //         } else if (userEmail.slice(-11) === '@doctor.com') {
    //           console.log("Login as doctor")
    //           navigate(`/dashboard/${userID}`)

    //         } else if (userEmail.slice(-12) === '@patient.com') {
    //           console.log("Login as patient")
    //           navigate('/patientprofile')
    //         }
    //         else {
    //           setDomain(true)

    //         }
    //       } else {
    //         console.log("Fail to get user")
    //       }
    //     }
    //     )
    //   }, 3000)
    // }





    //   event.stopPropagation()
    //   event.preventDefault();
    //   try {
    //     await firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password)
    //     // console.log("EMAIL----------", storeEmail)



    //   }
    //   catch (error) {
    //     setError("Invalid username or password");
    //     // console.log("Invalid username or password")
    //     // console.log(error)
    //     navigate('/deny')
    //   }
    //   console.log("Login...")
    //   // console.log("user email", storeEmail)
    // }
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
                  <button type="submit" className="mt-4 mx-4 p-2" style={buttonStyle}>Login</button>
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