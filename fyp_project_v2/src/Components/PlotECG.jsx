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

  // const [audioCtx, setAudioCtx] = useState(null);

  // Create a state variable to store the audio element and its playback status
  // const [audio, setAudio] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  const [alarm, setAlarm] = useState(false)


  const audioCtx = new AudioContext();
  const oscillator = audioCtx.createOscillator();
  oscillator.type = 'square'
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.connect(audioCtx.destination);


  function PlayAlarm() {
    setAlarm(true)
    oscillator.start(0)
    setTimeout(() => { oscillator.stop(0) }, 2500)
  }

  function StopAlarm() {
    oscillator.stop()
    setAlarm(false)
  }

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
      updateData(array.slice(-16));
      console.log("checkarray", checkarray)

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        // orignal - store the value which are greater than 800 or less than 400
        // normal - between 401 and 799
        // abnormal - less than 400, greater than 800
        let checkHeart = checkarray.filter(e => e > 400 || e < 700)
        console.log("heart", checkHeart)

        if (checkarray.length > 0) {
          console.log("Heart Attack")
          PlayAlarm()

        } else {
          checkarray = []
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





  console.log("length of data", data.length);

  // function PlayAlarm() {
  //   const newAudioCtx = new AudioContext();
  //   const oscillator = newAudioCtx.createOscillator();
  //   oscillator.type = 'triangle'
  //   oscillator.frequency.setValueAtTime(440, newAudioCtx.currentTime);
  //   oscillator.connect(newAudioCtx.destination);
  //   oscillator.start();
  //   // setAudioCtx(newAudioCtx);
  //   setTimeout(() => { oscillator.stop() }, 2000)
  // }

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

  // function playSound() {
  //   const audio = new Audio("./testaudio.mp3")
  //   audio.play()
  // }

  // function stopAlarm() {
  //   if (audioCtx) {
  //     audioCtx.close();
  //     setAudioCtx(null);
  //   }
  // };


  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <ApexChart data={data} title="Product Trends by Month" />
            <button className="text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
            <button className="text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
            {/* <button className="btn btn-danger" onClick={PlayAlarm}>Trigger Alarm</button> */}

            {alarm ?
              <button className="btn btn-danger">Abnormal Condition</button> :
              <button className="btn btn-success">Normal Condition</button>
            }

            {/* <button onClick={PlayAlarm}>Play Alarm Test</button>
            <button onClick={StopAlarm}>Stop Alarm Test</button> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardiogram;