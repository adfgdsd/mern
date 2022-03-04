import React from 'react'
import { Pie,Polar } from "react-chartjs-2";

const PaiChart = ({data}) => {
  return (
    <>
      <Polar width={"100%"} height={window.innerWidth > 800 ? "30vh" : "60vh"} data={data} />
    </>
  )
}

export default PaiChart