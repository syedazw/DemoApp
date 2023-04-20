import React, { useState } from "react";
import Chart from "react-apexcharts";

export default function ApexChart(props) {
  const series = [
    {
      name: "xx",
      data: props.data
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
    <div id="chart">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-6">
          <Chart options={options} series={series} type="line" height={200} width={320} />
          </div>
        </div>
      </div>
      
    </div>
  );
}
