import React from "react";
import Chart from "react-apexcharts";

export default function ApexChart(props) {

  let newArray = props.data.slice(-50); //separating last 15 numbers from array for plotting

  const series = [
    {
      name: "",
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
      <Chart options={options} series={series} type="line" height={200} width={350} />
    </>
  );
}
