import React, { useState, useEffect } from "react";
import {
  CLEAR_ERROR,
  NEW_PRODUCT_RESET,
} from "../../constents/productConstents";
import { createProduct } from "../../actions/productActions";
import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

const Newproduct = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const histry = useNavigate();

  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discriptino, setDiscriptino] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [imagePrev, setImagePrev] = useState([]);
  const [images, setimages] = useState([]);


  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("name", name);
    myFrom.set("price", price);
    myFrom.set("description", discriptino);
    myFrom.set("category", category);
    myFrom.set("stock", Stock);
    images.forEach((image) => {
      myFrom.append("images", image);
    });

    dispatch(createProduct(myFrom));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setimages([]);
    setImagePrev([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePrev((old) => [...old, reader.result]);
          setimages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const categories = [
    "Laptop",
    "Camera",
    "Keybord",
    "Mouse",
    "Chycle",
    "T.V",
    "MotorChycle",
  ];

  useEffect(() => {
    if (error) {
      Alert.error("Product Not Create");
      dispatch({type:CLEAR_ERROR});
    }
    if (success) {
      Alert.success("success");
      histry("/admin/dashbord");
      dispatch({type:NEW_PRODUCT_RESET})
    }
  }, [error, success, Alert, dispatch]);
  return (
    <>
      <MetaData title="Create Product's" />
      <div className="create_product ">
        <Sidebar />
        <div className="product_form ">
          <div className="title">Create Product</div>
          <form action="">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div>
              <label htmlFor="name">Price:</label>
              <input
                type="number"
                id="number"
                name="price"
                placeholder="Product Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Product Discriptino:</label>
              <textarea
                value={discriptino}
                placeholder="Product Discriptino"
                rows="1"
                cols="30"
                onChange={(e) => setDiscriptino(e.target.value)}
              />
            </div>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Cetagory</option>
              {categories.map((cate, i) => (
                <option key={i} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="name">Stock:</label>
              <input
                type="number"
                required
                placeholder="Stock Count"
                rows="1"
                cols="30"
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <input
                onChange={createProductImagesChange}
                type="file"
                accept="image/"
                name="avatar"
                multiple
              />
            </div>
            <div className="show_image">
              {imagePrev.map((image, i) => (
                <img key={i} src={image} alt="product Prev" />
              ))}
            </div>
            <Button
              type="submit"
              onClick={createProductSubmitHandler}
              disabled={loading ? true : false}
            >
              create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Newproduct;
