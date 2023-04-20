import React from "react"
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from '../context/firebase'
import { useNavigate } from "react-router-dom"
import { firebaseAuth } from "../context/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"

export default function LoginUser() {
  const firebase = usefirebase();
  // console.log('firebase', firebase);
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }

  const [userInfo, setuserInfo] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState(""); //set error to handle exception
  const [user, setuser] = useState(null); //set user detail to a variable 
  // const [storeEmail, setStoreEmail] = useState(null)
  // const [userID, setUserID] = useState(null)

  console.log("Default value of 'user' state is ", user)




  // function resetUser() {
  //   console.log("user is", user)
  //   setuser(null)
  // }
  // delete the user if found any
  // useEffect(() => {
  //   onAuthStateChanged(
  //     firebaseAuth,
  //     (user) => {
  //       if (user) {
  //         resetUser()
  //       }
  //       else {
  //         setuser(null)
  //       }
  //     });
  // }, []);


  // create instance for navigation
  const navigate = useNavigate()

  function handleChange(event) {
    event.preventDefault();
    setError("");
    setuserInfo((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value
      }
    })
  }


  // 1. when first time page load, there will be no user
  // 2. user enter credentials
  // 3. click on login button
  // 4. user information update to 'user' useState
  // 5. Now, extract email from user useState

  async function handleSubmit(event) {

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
            navigate('/patientprofile')
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



    event.stopPropagation()
    event.preventDefault();
    try {
      await firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password)
      // console.log("EMAIL----------", storeEmail)



    }
    catch (error) {
      setError("Invalid username or password");
      // console.log("Invalid username or password")
      // console.log(error)
      navigate('/deny')
    }
    console.log("Login...")
    // console.log("user email", storeEmail)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">

            <p className="fw-bold text-center mt-5 pt-5" style={{ color: "#041342" }}>IMMEDIATE FIRST AID</p>
            {error && <div className="alert alert-danger">{error}</div>}
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
                  {/* <Link type="submit" className="mt-4 mx-4 p-2" onClick={handleSubmit} to={useNavigate('/loginpage')} style={buttonStyle}>Login</Link> */}
                  <button type="submit" className="mt-4 mx-4 p-2" onClick={handleSubmit} style={buttonStyle}>Login</button>
                  <Outlet />
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>


    </>
  )
}