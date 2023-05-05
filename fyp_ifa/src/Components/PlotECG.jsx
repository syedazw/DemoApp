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
  console.log(firebase);
  const database = getDatabase();

  const params = useParams();
  console.log("params is", params)


  const [data, updateData] = useState([1]);
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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJEYXNoYm9hcmRfZDEiLCJzdnIiOiJldS1jZW50cmFsLmF3cy50aGluZ2VyLmlvIiwidXNyIjoiaXNtYWlsXyJ9.4zRBh0iA_vyFXDELsJ-ePqD8CNUaYDoVQc5PJzasctk'
      }
    }).then(response => {
      // convert the array into string
      console.log(JSON.stringify(response.data));
      // const val = Math.floor(Math.random() * (100 - 30 + 1)) + 300/10;
      console.log("data", data)
      let array = [...data, response.data];
      checkarray = [...data, response.data];
      console.log("array", array);
      updateData(array);
      console.log("checkarray", checkarray)

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        // orignal - store the value which are greater than 800 or less than 400
        // normal - between 401 and 799
        // abnormal - less than 400, greater than 800
        let checkHeart = checkarray.filter(e => e > 550 || e < 650)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Heart Attack")
          setAlarm(true)
          gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // set volume to 0.5
          setIsSounding(true)

        } else {
          checkarray = []
          gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
          setIsSounding(false);
        }
      }


      if (data.length > 15) {
        let newdata = data

        // array.shift() removing the item at the 0th index
        newdata.shift()
        array.shift()
        updateData(newdata);
      }
    }).catch(err => console.log(err))

  }, [data])

  const stopAlarm = () => {
    gainNode.gain.setValueAtTime(0, audioContext.currentTime); // set volume to 0
    setIsSounding(false);
  };





  console.log("length of data", data.length);

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

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 col-md-6">
            <ApexChart data={data} title="Product Trends by Month" />
            <button className="btn text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
            <button className="btn text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex justify-content-center">
            <button type="button" className="btn mb-2" style={buttonStyle}>View Cardiogram</button>
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