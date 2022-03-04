import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  return (
    <>
      <Line width={"100%"} height={window.innerWidth > 800 ? "30vh" : "60vh"} data={data} />
    </>
  );
};

export default LineChart;
