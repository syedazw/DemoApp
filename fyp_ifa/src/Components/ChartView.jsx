import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ApexChart(props) {
  console.log("receiving props as", props.data)
  const series = [
    {
      name: "xx",
      data: props.data
    }
  ];
  const options = {
    chart: {
      height: 360,
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
      <Chart options={options} series={series} type="line" height={200} width={350} />
    </>
  );
}
