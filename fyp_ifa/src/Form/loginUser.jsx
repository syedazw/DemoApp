import React from "react";
import { Outlet, Link } from "react-router-dom";
import { usefirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../context/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { Error, Success } from "../utils/toastify";

export default function LoginUser() {
    const navigate = useNavigate();
    const firebase = usefirebase();
    const buttonStyle = {
        color: "white",
        backgroundColor: "#041342",
        borderRadius: "6px",
        textDecoration: "none",
    };

    const [userInfo, setuserInfo] = React.useState({
        username: "",
        password: "",
    });
    const [error, setError] = React.useState("");
    const [user, setuser] = useState(null);
    const [checkCredential, setCheckCredential] = useState(false);
    // const [checkDomain, setDomain] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    // const [storeEmail, setStoreEmail] = useState(null)
    // const [userID, setUserID] = useState(null)

    // console.log("Default value of 'user' state is ", user)
    // console.log("user details:", userInfo)

    function handleChange(event) {
        event.preventDefault();
        setuserInfo((prevData) => {
            return {
                ...prevData,
                [event.target.name]: event.target.value,
            };
        });
    }

    useEffect(() => {
        setTimeout(() => {
            onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setuser(user);

                    // setUserID(prevValue => user.uid)
                    // setStoreEmail(value => user.email)

                    // check for admin domain
                    let userEmail = user.email;
                    // let userID = user.uid;

                    const domain = userEmail.split("@")[1];

                    // if (domain === "admin.com") {
                    //   console.log("Login as admin");
                    //   navigate("/admin/portal");
                    // } else if (domain === "doctor.com") {
                    //   console.log("Login as doctor");
                    //   navigate("/dashboard");
                    // } else if (domain === "patient.com") {
                    //   console.log("Login as patient");
                    //   navigate("/home");
                    // } else {
                    //   console.log("Invalid email domain");
                    //   navigate("/");
                    // }

                    // if (userEmail.slice(-10) === "@admin.com") {
                    //   console.log("Login as admin");
                    // } else if (userEmail.slice(-11) === "@doctor.com") {
                    //   console.log("Login as doctor");
                    //   navigate("/dashboard");
                    // } else if (userEmail.slice(-12) === "@patient.com") {
                    //   console.log("Login as patient");
                    //   navigate("/home");
                    // } else {
                    //   navigate("/");
                    // }
                } else {
                    console.log("Fail to get user");
                }
            });
        }, 3000);
    }, [user]);

    // useEffect(() => {
    //   const checkUserDomainAndNavigate = () => {
    //     if (!user) return null;

    //     const userEmail = user.email;
    //     const domain = userEmail.split("@")[1];

    //     if (domain === "admin.com") {
    //       console.log("Login as admin");
    //       Success("Admin Logged In");
    //       return navigate("/admin/portal");
    //     } else if (domain === "doctor.com") {
    //       console.log("Login as doctor");
    //       Success("Doctor Logged in");
    //       return navigate("/dashboard");
    //     } else if (domain === "patient.com") {
    //       console.log("Login as patient");
    //       return navigate("/home");
    //     } else {
    //       console.log("Invalid email domain");
    //       navigate("/");
    //     }
    //   };

    //   const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
    //     console.log({ user });

    //     setuser(user);
    //     checkUserDomainAndNavigate();
    //   });

    //   return () => unsubscribe(); // Clean up the subscription when the component unmounts
    // }, [navigate]);

    // const handleSubmit = async (event) => {
    //   try {
    //     await firebase.signinUserWithEmailAndPassword(
    //       userInfo.username,
    //       userInfo.password
    //     );

    //     // const userEmail = user.email;
    //     // const domain = userEmail.split("@")[1];
    //     // if (domain === "admin.com") {
    //     //   console.log("Login as admin");
    //     //   return navigate("/admin/portal");
    //     // } else if (domain === "doctor.com") {
    //     //   console.log("Login as doctor");
    //     //   return navigate("/dashboard");
    //     // } else if (domain === "patient.com") {
    //     //   console.log("Login as patient");
    //     //   return navigate("/home");
    //     // } else {
    //     //   console.log("Invalid email domain");
    //     //   navigate("/");
    //     // }
    //   } catch (error) {
    //     console.log(error?.message);
    //     Error(error?.message);
    //     if (error instanceof Error) {
    //       Error(error?.message);
    //     }
    //   }

    //   // possible worst case:
    //   // auth/user-not-found
    //   // auth/invalid-email
    //   // auth/email-not-found
    // };
    // ... (previous code)

    const handleSubmit = async (event) => {
        try {
            await firebase.signinUserWithEmailAndPassword(
                userInfo.username,
                userInfo.password
            );
        } catch (error) {
            console.log(error?.message);
            Error(error?.message);
            if (error instanceof Error) {
                Error(error?.message);
            }
        }
    };
    // useEffect(() => {
    //   const checkUserDomainAndNavigate = () => {
    //     if (!user) return null;
    //     const userEmail = user.email;
    //     const domain = userEmail.split("@")[1];
    //     if (domain === "admin.com") {
    //       console.log("Login as admin");
    //       Success("Admin Logged In");
    //       navigate("/admin/portal");
    //     } else if (domain === "doctor.com") {
    //       console.log("Login as doctor");
    //       Success("Doctor Logged in");
    //       navigate("/dashboard");
    //     } else if (domain === "patient.com") {
    //       console.log("Login as patient");
    //       navigate("/home");
    //     } else {
    //       console.log("Invalid email domain");
    //       navigate("/");
    //     }
    //   };

    //   const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
    //     setuser(user);
    //     await checkUserDomainAndNavigate();
    //   });
    //   return () => unsubscribe();
    // }, [navigate]);
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-4 col-lg-4 mx-auto">
                        <p
                            className="fw-bold text-center mt-5 pt-5"
                            style={{ color: "#041342" }}
                        >
                            IMMEDIATE FIRST AID
                        </p>
                        {/* {error && <div className="alert alert-danger">{error}</div>} */}
                        <form onSubmit={handleSubmit}>
                            <div className="mt-2 mb-2 mx-5">
                                <label
                                    htmlFor="exampleInputText"
                                    className="form-label fw-bold"
                                    style={{ color: "#041342" }}
                                >
                                    Username:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputText"
                                    aria-describedby="textHelp"
                                    name="username"
                                    value={userInfo.username}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-2 mx-5">
                                <label
                                    htmlFor="exampleInputPassword1"
                                    className="form-label fw-bold"
                                    style={{ color: "#041342" }}
                                >
                                    Password:{" "}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mt-2 mb-2 mx-5">
                                <input
                                    type="checkbox"
                                    className="form-check-input me-2"
                                    id="exampleCheck1"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="exampleCheck1"
                                    style={{ color: "#041342" }}
                                >
                                    Remember my password
                                </label>
                            </div>
                            <a className="mx-5" style={{ color: "#041342" }}>
                                Forget Password?
                            </a>
                            <div className="row">
                                <div className="col-sm-5 col-md-12 ms-4">
                                    <Link
                                        type="submit"
                                        className="mt-4 mx-4 p-2"
                                        style={buttonStyle}
                                        to={navigate}
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </Link>
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
    );
}
