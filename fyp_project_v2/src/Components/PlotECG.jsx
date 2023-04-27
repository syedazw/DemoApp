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


  // useEffect(() => {
  // let audioContext;

  // // Function to play audio using Audio Context
  // const playAudio = () => {
  //   audioContext = new AudioContext();
  //   const source = audioContext.createMediaElementSource(audioRef.current);
  //   source.connect(audioContext.destination);
  //   audioRef.current.play();
  // }

  //   // Play audio if certain condition is met
  //   if (allowSound) {
  //     playAudio();
  //   }

  //   // Close Audio Context and stop audio after 2 minutes
  //   const timeoutId = setTimeout(() => {
  //     if (audioContext) {
  //       audioContext.close();
  //     }
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }, 120000); // 2 minutes in milliseconds

  //   // Clean up function to close Audio Context when component unmounts
  //   return () => {
  //     if (audioContext) {
  //       audioContext.close();
  //     }
  //     clearTimeout(timeoutId);
  //   };
  // }, []);



  // function playAlarm() {
  //   const newAudioCtx = new AudioContext();
  //   const oscillator = newAudioCtx.createOscillator();
  //   oscillator.type = 'sine'
  //   oscillator.frequency.setValueAtTime(440, newAudioCtx.currentTime);
  //   oscillator.connect(newAudioCtx.destination);
  //   oscillator.start();
  //   setAudioCtx(newAudioCtx);
  // }


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

      // // Function to play audio using Audio Context
      // const playAudio = () => {
      //   const newAudioCtx = new AudioContext();
      //   const oscillator = newAudioCtx.createOscillator();
      //   oscillator.type = 'triangle'
      //   oscillator.frequency.setValueAtTime(440, newAudioCtx.currentTime);
      //   oscillator.connect(newAudioCtx.destination);
      //   oscillator.start();
      //   setAudioCtx(newAudioCtx);
      // }

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)

        // orignal - store the value which are greater than 800 or less than 400
        // normal - between 401 and 799
        // abnormal - less than 400, greater than 800
        let checkHeart = checkarray.filter(e => e > 100 || e < 1100)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Heart attack")
          const newAudioCtx = new AudioContext();
          const oscillator = newAudioCtx.createOscillator();
          oscillator.type = 'triangle'
          oscillator.frequency.setValueAtTime(440, newAudioCtx.currentTime);
          oscillator.connect(newAudioCtx.destination);
          oscillator.start();
          setAudioCtx(newAudioCtx);

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
            <audio ref={audioRef} />
            <source src={sound} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cardiogram;