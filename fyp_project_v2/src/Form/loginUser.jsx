import React from "react"
import { Outlet, Link } from "react-router-dom"
import { usefirebase } from '../context/firebase'
import { useNavigate } from "react-router-dom"

export default function LoginUser() {
  const [permission,setPermission] = React.useState(false)
  const firebase = usefirebase();
  console.log('firebase', firebase);
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }
  const [userInfo, setuserInfo] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState("");

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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await firebase.signinUserWithEmailAndPassword(userInfo.username, userInfo.password);
      // setPermission(true)
    } catch (error) {
      setError("Invalid username or password");
      // setPermission(false)
      console.log("Invalid username or password")
      console.log(error)
    }
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
                  <Link type="submit" className="mt-4 mx-4 p-2" onClick={handleSubmit} style={buttonStyle}>Login</Link>
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