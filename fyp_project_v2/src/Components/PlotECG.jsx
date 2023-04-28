import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";
import { usefirebase } from "../context/firebase";
import { Timestamp } from 'firebase/firestore';
import { useParams } from "react-router-dom";
// import sound from "../audio/testaudio.mp3"



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

  const audioRef = React.useRef(null);

  const [allowSound, setAllowSound] = useState(true)

  const [audioCtx, setAudioCtx] = useState(null);





  let checkarray = ''

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

      let audioContext;
      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        // orignal - store the value which are greater than 800 or less than 400
        // normal - between 401 and 799
        // abnormal - less than 400, greater than 800
        let checkHeart = checkarray.filter(e => e > 800 || e < 400)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Heart attack")
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

  function PlayAlarm() {
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    setTimeout(() => oscillator.stop(), 10000);
  }

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
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <ApexChart data={data} title="Product Trends by Month" />
            <button className="text-light m-2" onClick={putDatanew} style={buttonStyle}>Start</button>
            <button className="text-light m-2" onClick={() => setFetching(false)} style={buttonStyle}>Stop</button>
            <button className="btn btn-danger" onClick={PlayAlarm}>Trigger Alarm</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardiogram;