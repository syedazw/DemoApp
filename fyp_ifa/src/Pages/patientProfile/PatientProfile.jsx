import React, { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { usefirebase } from "../../context/firebase";
import { getAuth } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";
import SpecificPatientInfo from "../../Components/specificPatientCard"; //first component which show patient information
import Cardiogram from "../../Components/PlotECG"; // second component which show cardiogram
import DisplayNotesWithDate from "../../Components/displayNoteWithDate"; //third component: show notes w.r.t to date
import DisplayMedication from "../../Components/displayMedicine"; //fourth component: show medicine with dosage
import DisplayTestReport from "../../Components/displayReports"; //fifth component: show reports

export default function PatientProfile() {
  const navigate = useNavigate();
  let critical = true;
  const firebase = usefirebase();
  const auth = getAuth();

  // -------------------- Object of Params -----------------

  const params = useParams();
  // console.log("id", params);
  const [patientData, setPatientData] = useState([]);
  // useEffect
  // 1. patient card
  useEffect(() => {
    firebase
      .getPatientProfilebyId(params.PatientID)
      .then((patientData) => setPatientData(patientData.data()));
  }, []);
  // console.log("patient Data", patientData)

  // 2. Notes
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    firebase.getNotesById(params.PatientID).then((Notes) => {
      console.log("notes--", Notes.docs[0].data().data);
      setNotes(Notes.docs[0].data().data);
    });
  }, []);

  // 3. Medication
  const [med, setmed] = useState([]);
  useEffect(() => {
    firebase.getMedByID(params.PatientID).then((med) => {
      console.log("Medicines----", med.docs[0].data().data);
      setmed(med.docs[0].data().data);
    });
  }, []);

  // 4. Report
  const [report, setReport] = useState([]);
  useEffect(() => {
    firebase.getReportById(params.PatientID).then((Report) => {
      const reportData = Report.docs.map((doc) => doc.data());
      setReport(reportData);
      console.log("report", reportData);
    });
  }, []);

  // 5. Doctor's Data
  const [docdata, setdocdata] = useState([]);
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }
    const userEmail = currentUser.email;

    firebase
      .DocData(userEmail)
      .then((matchingData) => {
        setdocdata(matchingData);
      })
      .catch((error) => {
        console.log("Error fetching patient data:", error);
      });
  }, []);

  const medicalRecord = [patientData];
  console.log("Making a card of data:", medicalRecord);

  return (
    <>
      <div className="container-fluid">
        <div className="row bg-color text-light pt-4">
          <div className="col-sm-12 col-md-4">
            <h4 className="text-center">Immediate First Aid</h4>
          </div>
          {docdata.length > 0 && (
            <div className="col-sm-12 col-md-2">
              <h6 className="text-center">Dr. {docdata[0].data.fullname}</h6>
            </div>
          )}
          <div className="col-sm-12 col-md-6 d-flex justify-content-start">
            <form className="d-flex-inline mx-4" role="search">
              <input
                className="form-control col-sm-5"
                type="search"
                placeholder="Search"
                aria-label="Search"
              ></input>
            </form>
            <i className="bi bi-bell-fill" style={{ color: "yellow" }}></i>
            <div className="dropdown pb-4 mx-4">
              <a
                href="#"
                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1"></span>
              </a>
              <ul className="dropdown-menu text-small shadow">
                <li>
                  <Link
                    to="/patient/personal/information"
                    className="dropdown-item"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item">
                    <Link to="/" className="nav-link">
                      Sign Out
                    </Link>
                  </a>
                </li>
                <Outlet />
              </ul>
            </div>
          </div>

          <div className="col-12 bg-color">
            <nav className="navbar">
              <Link
                to="/dashboard/allpatient"
                className="navbar-brand text-light fw-bold"
              >
                &lt; BACK
              </Link>
              <button
                className="navbar-toggler bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon bg-light"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      to={`/patientprofile/${params.PatientID}`}
                      className="nav-link text-primary mx-3"
                    >
                      OVERVIEW
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light mx-3">CARDIOGRAM</Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/patientprofile/medication/${params.PatientID}`}
                      className="nav-link text-light mx-3"
                    >
                      MEDICATIONS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/patientprofile/reports/${params.PatientID}`}
                      className="nav-link text-light mx-3"
                    >
                      REPORTS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light mx-3">HISTORY</Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to={`/patientprofile/notes/${params.PatientID}`}
                      className="nav-link text-light mx-3"
                    >
                      NOTES
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-light mx-3">
                      PERSONAL INFO
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ backgroundColor: "white" }}>
        <div className="row">
          <h4 className="fw-bold text-center">PATIENT PROFILE</h4>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            {medicalRecord.map((item) => (
              <SpecificPatientInfo key={item.id} id={item.id} {...item.data} />
            ))}
          </div>

          {medicalRecord.map((item) => (
            <Cardiogram
              key={item.id}
              id={item.id}
              {...item.data}
              height={"28rem"}
              allow={false}
            />
          ))}
        </div>
      </div>

      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div
                    className="card mb-5"
                    style={{ color: "white", backgroundColor: "#041342" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Notes</h5>
                      <hr className="border-5" style={{ color: "white" }}></hr>
                      {notes.map((item) => (
                        <DisplayNotesWithDate
                          key={item.id}
                          id={item.id}
                          term={item.term}
                          description={item.description}
                          // patid={params.PatientID}
                        />
                      ))}
                    </div>
                    <button
                      className="nav-link btn btn-width align-self-center mb-3 p-1"
                      type="submit"
                      onClick={(e) =>
                        navigate(`/patientprofile/notes/${params.PatientID}`)
                      }
                      style={{ color: "white", backgroundColor: "#24a3ac" }}
                    >
                      Edit Notes{" "}
                    </button>
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MEDICATIONS */}
          <div className="col-md-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div
                    className="card mb-5"
                    style={{ color: "white", backgroundColor: "#041342" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Medications</h5>
                      <hr className="border-5" style={{ color: "white" }}></hr>
                      {med.map((item) => (
                        <DisplayMedication
                          key={item.id}
                          id={item.id}
                          medicineName={item.medicineName}
                          dosage={item.dosage}
                          // patid={params.PatientID}
                        />
                      ))}
                    </div>
                    <button
                      className="nav-link btn btn-width align-self-center mb-3 p-1"
                      type="submit"
                      onClick={(e) =>
                        navigate(
                          `/patientprofile/medication/${params.PatientID}`
                        )
                      }
                      style={{ color: "white", backgroundColor: "#24a3ac" }}
                    >
                      Add Medicine
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* REPORTS */}
          <div className="col-md-4">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12 col-md-12">
                  <div
                    className="card mb-5"
                    style={{ color: "white", backgroundColor: "#041342" }}
                  >
                    <div className="card-body">
                      <h5 className="card-title">Reports</h5>
                      <hr className="border-5" style={{ color: "white" }}></hr>
                      {report.map((item) => (
                        <DisplayTestReport
                          key={item.id}
                          id={item.id}
                          testName={item.testName}
                          testFile={item.testFile}
                          // patid={params.PatientID}
                        />
                      ))}
                    </div>
                    <button
                      className="nav-link btn btn-width align-self-center mb-3 p-1"
                      type="submit"
                      onClick={(e) =>
                        navigate(`/patientprofile/reports/${params.PatientID}`)
                      }
                      style={{ color: "white", backgroundColor: "#24a3ac" }}
                    >
                      Add Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
