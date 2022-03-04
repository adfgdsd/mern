import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetalse } from "../../actions/productActions";
import { useParams, NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Loader from "../loader/loader";
import ReviewCard from "./ReviewCard";
import { additemsOncart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import {
  newReview,
  clearError as clearErrors,
} from "../../actions/productActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/core";
import { NEW_REVIRES_REQUEST_RESET } from "../../constents/productConstents";

const ProductDetalse = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error, loading } = useSelector(
    (state) => state.productDetalse
  );

  const { error: ReviewError, success } = useSelector(
    (state) => state.newReview
  );

  const [quntaty, setQuntaty] = useState(1);
  const [reating, setReating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const incNumber = () => {
    if (product.stock <= quntaty) {
      return;
    }
    const qty = quntaty + 1;
    setQuntaty(qty);
  };
  const dicNumber = () => {
    if (quntaty <= 1) return;
    const qty = quntaty - 1;
    setQuntaty(qty);
  };

  const cartItemsHandlet = () => {
    dispatch(additemsOncart(id, quntaty));
    alert.success("items added succesfuly");
  };

  const options = {
    value: product.ratings,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandiler = () => {
    const myFrom = new FormData();
    myFrom.set("rating", reating);
    myFrom.set("comment", comment);
    myFrom.set("productId", id);

    dispatch(newReview(myFrom));
    setOpen(false);
  };

  useEffect(() => {
    if (ReviewError) {
      alert.error(ReviewError);
      dispatch(clearErrors());
    }
    dispatch(getProductDetalse(id));

    if (success) {
      alert.success("revire's success");
      dispatch({ type: NEW_REVIRES_REQUEST_RESET });
    }
  }, [dispatch, id, success, error, alert, ReviewError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="productDtls">
            <div className="img_section">
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              >
                <div className="carousel-inner">
                  {product.images &&
                    product.images.map((items, i) => (
                      <div className="carousel-item  text-center">
                        <img
                          className="d-block"
                          style={{ width: "400px !importent" }}
                          src={items.url}
                          alt={i + " slide"}
                          key={i + "1122"}
                        />
                      </div>
                    ))}
                  {product.images && (
                    <div className="carousel-item text-center active">
                      <img
                        style={{ width: "400px !importent" }}
                        src={product.images[0].url}
                      />
                    </div>
                  )}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
            {/* text section start  */}

            <div className="text_aria">
              <div className="p_dts_1">
                <h2>Name: {product.name}</h2>
                <p>Product Id: {product._id}</p>
              </div>
              <div className="p_dts_2">
                {product.ratings ? (
                  <Rating {...options} />
                ) : (
                  <Rating {...options} />
                )}
                <span className="span">({product.NumOfReview} reviews)</span>
              </div>
              <div className="dtls_block">
                <h1>TK-{product.price}</h1>
                <div className="optionBlock">
                  <button onClick={dicNumber}>-</button>
                  <input readOnly type="number" value={quntaty} />
                  <button onClick={incNumber}>+</button>
                  {product.stock < 1 ? (
                    <a className="btn">
                      <del>Add To Cart</del>
                    </a>
                  ) : (
                    <a className="btn" onClick={cartItemsHandlet}>
                      Add To Cart
                    </a>
                  )}
                </div>
              </div>
              <p className="p">
                Satus:
                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                  {product.stock < 1 ? "OutOfStock" : "Instock"}
                </b>
              </p>

              <div className="description">
                Description: <p>{product.description}</p>
                <button className="btn i" onClick={submitReviewToggle}>
                  submit reviews
                </button>
              </div>
            </div>
          </div>
          <div className="reviews_title">
            <h1>REVIEWS</h1>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setReating(e.target.value)}
                value={reating}
                size="large"
              />
              <textarea
                cols="25"
                rows="5"
                className="submitDilogTextAria"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <DialogActions>
                <Button color="secondary" onClick={submitReviewToggle}>
                  Cancle
                </Button>
                <Button color="primary" onClick={reviewSubmitHandiler}>
                  Submit
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <div className="flex__">
            {product.reviews && product.reviews[0] ? (
              <div className="reviews">
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard review={review} />
                  ))}
              </div>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

// 6:11

export default ProductDetalse;
