import React, { useState, useEffect } from "react";
import axios from "axios";
import ApexChart from "./ChartView";

const Cardiogram = () => {

  const [data, updateData] = useState([1]);
  const [fetchingData, setFetching] = useState(false)


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
      let checkarray = [...data, response.data];
      console.log("array", array);
      updateData(array);
      console.log("checkarray", checkarray)

      if (checkarray.length > 15) {
        console.log("checkarray", checkarray)
        let checkHeart = checkarray.filter(e => e > 800 || e < 400)
        console.log("heart", checkHeart)

        if (checkHeart.length > 0) {
          console.log("Heart attack")
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

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <ApexChart data={data} title="Product Trends by Month" />
            <button className="btn bg-color text-light mx-2" onClick={() => setFetching(true)}>Start</button>
            <button className="btn bg-color text-light" onClick={() => setFetching(false)}>Stop</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Cardiogram;