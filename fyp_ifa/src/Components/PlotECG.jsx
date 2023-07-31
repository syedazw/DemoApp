import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";
import { usefirebase } from "../context/firebase";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase } from "firebase/database";
import { notifyOnMobile } from "../utils/notify";



const Cardiogram = (props) => {
  console.log("Props receive by cardiogram component", props)
  const navigate = useNavigate();  //create instance for navigation
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }
  const firebase = usefirebase();
  const database = getDatabase();

  const params = useParams();

  // creating multiple use state
  const [data, updateData] = useState([]);
  const [fetchingData, setFetching] = useState(false)
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isSounding, setIsSounding] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false)
  const [alarm, setAlarm] = useState(false)
  const [electrodeVal, setelectrodeVal] = useState(false)

  useEffect(() => {
    const context = new AudioContext();  // Creating an audio context object 'context' which handle audio processing in the browser
    const oscillator = context.createOscillator();  // Creating an instance to generate periodic waveform
    const gainNode = context.createGain();  // control the volume of the sound
    oscillator.connect(gainNode); // connect oscillator to gain node
    gainNode.connect(context.destination);  // connect gainNode to audiocontext destination
    oscillator.type = 'triangle';     // set the waveform type to triangle
    oscillator.frequency.setValueAtTime(440, context.currentTime);   // set the frequency of the oscillator to 440Hz
    gainNode.gain.setValueAtTime(0, context.currentTime); // set initial volume to 0
    oscillator.start(0);
    setAudioContext(context);
    setOscillator(oscillator);
    setGainNode(gainNode);

    return () => {
      oscillator.stop();
      oscillator.disconnect();
      gainNode.disconnect();
      context.close();
    };
  }, []);

  let checkarray = []


  useEffect(
    () => {
      axios.get(props.method, {
        headers: {
          'Authorization': props.deviceToken
        }
      }).then(response => {
        console.log(response.data)
        setDeviceStatus(true) // show the device is activated/connected

        let array = [...data, response.data];
        checkarray = [...data, response.data];
        updateData(data => [...data, response.data])

        if (checkarray.length > 15) {
          console.log("checkarray", checkarray)
          let checkHeart = checkarray.filter(e => e > 1000 || e < 100)

          setelectrodeVal(true)
          console.log("heart", checkHeart)

          if (checkHeart.length > 0) {
            console.log("Abnormality Detect")
            setAlarm(true)
            gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // set volume to 0.5
            setIsSounding(true)
            console.log("------------------", checkHeart)

            // notifyOnMobile();

          } else if (checkHeart.length >= 20) {
            checkHeart.length = 0
            gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
            setIsSounding(false);
            setAlarm(false)
          }
        }

        if (response.data < 300 || response.data > 1000) {
          setelectrodeVal(false)
        } else {
          setelectrodeVal(true)
        }

        if (data.length > 15) {
          array.shift()
          let newArray = data.shift()
          console.log(newArray)
        }
      }).catch(err => {
        console.log(err)
        setDeviceStatus(false)
      })

    }, [data])


  const putDatanew = () => {
    firebase.putdatafire(params.PatientID, data);
  };

  console.log("Passing the data as", data)
  const allowToView = props.allow
  const newHeight = props.height

  return (
    <>

      <div className="card mx-2 col-sm-12 col-md-4" style={{ width: "25rem", height: newHeight, borderColor: alarm ? 'red' : '#041342' }}>
        <p className="card-text mx-3 px-3 mb-0 fw-bold">Patient Name: {props.fullname}</p>
        <p className="card-text mx-3 px-3 mt-0 mb-0 fw-bold d-inline">Device Status:{deviceStatus ? <p className="d-inline text-success"> Connected </p> : <p className="d-inline text-danger"> Not Connected </p>}</p>
        <p className="card-text mx-3 px-3 mt-0 mb-0 fw-bold d-block">Electrodes Status:{electrodeVal ? <p className="d-inline text-success mt-0"> Connected</p> : <p className="d-inline text-danger"> Not Connected </p>}</p>
        <p className="px-3 pt-0 mx-3 mt-0 fw-bold d-block">Patient Condition:{alarm ? (<p className="d-inline text-danger"> Abnormality Detect </p>) : (<p className="d-inline text-success"> Normal </p>)}</p>
        <div className="card-body">
          <ApexChart data={data} title="Patient ECG" />
          <div className="btn-group">
            <button className="btn text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
            <button className="btn text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
          </div>
          <br></br>
          {
            newHeight === "30rem" ?
              <button type="button" className="btn btn-success btn-width mb-2 mx-auto d-block" onClick={(e) => navigate(`/patientprofile/${props.id}`)}>View Patient</button> :
              null
          }

          {isSounding ? <button
            data-playing="false" role="switch" aria-checked="false"
            onClick={() => {
              gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
              setIsSounding(false);
            }} className="btn btn-danger btn-width pt-0 mx-auto">Stop Alarm</button> : null}
        </div>

      </div>
    </>


  );
}

export default Cardiogram;