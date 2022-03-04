import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  deleteReview,
  getAllReview,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import "./css/style.css";
import Sidebar from "./Sidebar";
import { DELETE_REVIEWS_RESET } from "../../constents/productConstents";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { success } = useSelector((state) => state.review);
  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deletReviewsHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const searchproductreviews = (e) => {
    e.preventDefault();
    dispatch(getAllReview(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReview(productId));
    }
    if (success) {
      Alert.success("success: review deleted");
      dispatch({ type: DELETE_REVIEWS_RESET });
      dispatch(getAllReview(productId));
    }
  }, [success, Alert, dispatch]);

  const colums = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      type: "number",
      headerName: "User",
      minWidth: 220,
      flex: 0.5,
    },
    {
      field: "comment",
      type: "number",
      headerName: "Comment",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "rating",
      type: "number",
      headerName: "Rating",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "Action",
      type: "number",
      headerName: "action",
      minWidth: 150,
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{
                color: "red",
                outline: "none",
                border: "none",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                deletReviewsHandler(params.getValue(params.id, "id"))
              }
            >
              <i class="fas fa-archive"></i>
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((reviews) => {
      rows.push({
        id: reviews._id,
        comment: reviews.comment,
        rating: reviews.rating,
        user: reviews.name,
      });
    });
  return (
    <>
      <div className="product_list product_reviews">
        <Sidebar />

        <div className="min_review_div">
          <div className="from">
            <form action="">
              <div>
                <label htmlFor="id">ProductID:</label>
                <input
                  name="id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                onClick={searchproductreviews}
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }
              >
                check
              </Button>
            </form>
          </div>

          {reviews && reviews.length > 0 ? (
            <div className="rows">
              <DataGrid
                columns={colums}
                rows={rows}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="dataGrid"
              />
            </div>
          ) : (
            <div className="rows">
              <p>
                Oppos:<b> No Reviews Found</b>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
