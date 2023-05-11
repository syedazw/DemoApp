import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";
import { usefirebase } from "../context/firebase";
import { Timestamp } from 'firebase/firestore';
import { useParams } from "react-router-dom";


import { getDatabase, ref, set, push, child, serverTimestamp } from "firebase/database";


const Cardiogram = () => {
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


  useEffect(() => {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    oscillator.type = 'triangle'; // set oscillator type to sine wave
    oscillator.frequency.setValueAtTime(440, context.currentTime); // set frequency to 440 Hz
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

  const [alarm, setAlarm] = useState(false)


  let checkarray = []

  useEffect(() => {

    axios.get("https://backend.thinger.io/v3/users/ismail_/devices/Nodemcu1/resources/ECG", {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODM4MzgyMTgsImlhdCI6MTY4MzgzMTAxOCwicm9sZSI6InVzZXIiLCJ1c3IiOiJpc21haWxfIn0.JPzd5CnGz8tJHbWITsJvBwn95u3q-Lhxg3xRxsWiUXQ'
      }
    }).then(response => {
      // convert the array into string
      //console.log(JSON.stringify(response.data));  // console log out individual values
      console.log("New data point", response.data)

      // const val = Math.floor(Math.random() * (100 - 30 + 1)) + 300/10;
      let array = [...data, response.data];
      checkarray = [...data, response.data];
      updateData(data => [...data, response.data])

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        // orignal - store the value which are greater than 800 or less than 400
        // normal - between 401 and 799
        // abnormal - less than 400, greater than 800
        let checkHeart = checkarray.filter(e => e > 510 || e < 580)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          // console.log("Heart Attack")
          setAlarm(true)
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // set volume to 0.5
          setIsSounding(true)
          setTimeout(() => {
            checkHeart = []
          }, 2000)

        } else {
          checkHeart = []
          gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
          setIsSounding(false);
        }
      }

      if (data.length > 15) {
        array.shift()
        let newArray = data.shift()
        console.log(newArray)
      }
    }).catch(err => {
      console.log(err)

    })

  }, [data])



  const stopAlarm = () => {
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
    setIsSounding(false);
  };





  // console.log("length of data", data.length);

  // console.log("passifng data to firebase", checkarray)
  // console.log('array length', data.length)

  // const putDatanew = () => {
  //   const dbRef = ref(database); // Get a reference to the Firebase Realtime Database root

  //   // Create a new child node under "Patients" with the current timestamp as the key
  //   const newChildRef = push(child(dbRef, "Patients"));


  //   // Set the ECG data as the value of the new child node
  //   set(newChildRef, {
  //     ecgData: data,
  //     DateTime: serverTimestamp()
  // };



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
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            {/* {alarm ?
                <button className="btn btn-danger btn-block">Abnormal Condition</button> :
                <button className="btn btn-success btn-block">Normal Condition</button>
              } */}
            {isSounding ? <button onClick={stopAlarm} className="btn btn-danger btn-block">Stop Alarm</button> : null}
          </div>
        </div>
      </div>

    </>


  );
}

export default Cardiogram;