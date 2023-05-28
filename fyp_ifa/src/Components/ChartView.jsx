import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ApexChart(props) {
  // console.log("receiving props as", props.data)

  let newArray = props.data.slice(-15);
  console.log("receive array", newArray)
  
  // let plotData = []
  // if (newArray.length>15) {
  //   newArray.shift()
  // } else {
  //   newArray
  // }

  // console.log("Plotting data values", plotData)
  
  const series = [
    {
      name: "xx",
      data: newArray
    }
  ];
  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: "smooth"
    },
    colors: ["#210124"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: true,
        gradientToColors: ["#DB162F"],
        opacityFrom: 1,
        opacityTo: 1,
        type: "vertical",
        stops: [0, 30]
      }
    }
  };
  return (
    <>
      <Chart options={options} series={series} type="line" height={200} width={320} />
    </>
  );
}
