import React from "react";
import ReactStars from "react-rating-stars-component";
import { Rating } from "@material-ui/core";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      <div className="revires_card">
        <div className="img_rr">
          <img src="https://bit.ly/3GgTQn7" alt="" />
        </div>
        <h1>{review.name}</h1>
        <span className="rev"><Rating {...options} /></span>
        <p>{review.comment}</p>
      </div>
    </>
  );
};

export default ReviewCard;
