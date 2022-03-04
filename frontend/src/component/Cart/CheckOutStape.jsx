import React from "react";
import { Step, Stepper, Typography, StepLabel } from "@material-ui/core";

const CheckOutStape = ({ activeStep }) => {
  const staps = [
    {
      icon: <i class="fas fa-truck"></i>,
      label: "Shipping Details",
    },
    {
      icon: <i class="far fa-badge-check"></i>,
      label: "Confirm Order",
    },
    {
      icon: <i class="fal fa-credit-card"></i>,
      label: "Payment",
    },
  ];
  return (
    <>
      <div className="mt-3">
        <Stepper alternativeLabel activeStep={activeStep}>
          {staps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
              style={{ color: activeStep >= index ? "tomato" : "gray" }}
            >
              <StepLabel icon={item.icon}>{item.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </>
  );
};

export default CheckOutStape;
