import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";
import { usefirebase } from "../context/firebase";
import { Timestamp } from 'firebase/firestore';
import { useParams } from "react-router-dom";


import { getDatabase, ref, set, push, child, serverTimestamp } from "firebase/database";


const TestCardiogram = () => {
  const buttonStyle = { color: "white", backgroundColor: "#041342", borderRadius: "6px", textDecoration: "none" }
  const firebase = usefirebase();
  const database = getDatabase();

  const params = useParams();

  const [data, updateData] = useState([]);
  const [fetchingData, setFetching] = useState(false)
  const [audioContext, setAudioContext] = useState(null);
  const [oscillator, setOscillator] = useState(null);
  const [gainNode, setGainNode] = useState(null);
  const [isSounding, setIsSounding] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(null)
  const [alarm, setAlarm] = useState(false)


  useEffect(() => {
    const context = new AudioContext();  // Creating an audio context object 'context' which handle audio processing in the browser
    const oscillator = context.createOscillator();  // Creating an instance to generate periodic waveform
    const gainNode = context.createGain();  // control the volume of the sound
    oscillator.connect(gainNode); // connect oscillator to gain node
    gainNode.connect(context.destination);  // connect gainNode to audiocontext destination
    oscillator.type = 'sine';     // set the waveform type to triangle
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

  useEffect(() => {

    axios.get("https://backend.thinger.io/v3/users/ismail_/devices/Nodemcu1/resources/ECG", {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODM4MzU2OTQsImlhdCI6MTY4MzgyODQ5NCwicm9sZSI6InVzZXIiLCJ1c3IiOiJpc21haWxfIn0.Z4iPwwf0Np9ULQZBZAhSnjhDlJyIHnB-bXF9Br4uYtE'
      }
    }).then(response => {
      // convert the array into string
      //console.log(JSON.stringify(response.data));  // console log out individual values
      setDeviceStatus(true)
      console.log("New data point", response.data)

      // const val = Math.floor(Math.random() * (100 - 30 + 1)) + 300/10;
      let array = [...data, response.data];
      checkarray = [...data, response.data];
      updateData(data => [...data, response.data])

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        let checkHeart = checkarray.filter(e => e > 510 && e < 580)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Abnormality Detect")
          setAlarm(true)
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // set volume to 0.5
          setIsSounding(true)

        } else {
          checkHeart = []
          gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
          setIsSounding(false);
        }
      }

      if (data.length > 15) {
        array.shift()
      }
    }).catch(err => {
      console.log(err)
      setDeviceStatus(false)
    })

  }, [data])



  const stopAlarm = () => {
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
    setIsSounding(false);
  };



  const putDatanew = () => {
    firebase.putdatafire(params.PatientID, data);
  };

  console.log("Passing the data as", data)

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-md-6">
            <ApexChart data={data} title="Patient ECG" />
            <button className="btn text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
            <button className="btn text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            <button type="button" className="btn btn-success mb-2">View Cardiogram</button>
            
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-4 mx-5">
          {deviceStatus ? null: <p className="text-danger fw-bold">Device not connected</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            {alarm ?
                <p className="text-danger fw-bold">Abnormality Detect</p> :
                null
              }
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            {isSounding ? <button onClick={stopAlarm} className="btn btn-danger btn-block">Stop Alarm</button> : null}
          </div>
        </div>


      </div>

    </>


  );
}

export default TestCardiogram;