import React, { useState, useEffect } from "react";
import {
  CLEAR_ERROR,
  UPDATE_PRODUCT_RESET,
} from "../../constents/productConstents";
import { updateProduct, getProductDetalse } from "../../actions/productActions";
import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../loader/loader";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const histry = useNavigate();
  const { id } = useParams();

  const {
    loading,
    isUpdated,
    error: updateError,
  } = useSelector((state) => state.product);

  const {
    loading: load,
    product,
    error,
  } = useSelector((state) => state.productDetalse);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discriptino, setDiscriptino] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [imagePrev, setImagePrev] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [images, setimages] = useState([]);

  const updateProductSubmitHandler = (e) => {
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

    dispatch(updateProduct(id, myFrom));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setimages([]);
    setImagePrev([]);
    setOldImages([]);

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
    const productID = id;

    if (product && product._id !== productID) {
      dispatch(getProductDetalse(productID));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDiscriptino(product.description);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }
    if (error) {
      Alert.error("Product Not Create");
      dispatch({ type: CLEAR_ERROR });
    }
    if (updateError) {
      Alert.error("Product Not Create. something is rong");
      dispatch({ type: CLEAR_ERROR });
    }
    if (isUpdated) {
      Alert.success("update product");
      histry("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [error, isUpdated, Alert, dispatch, product, updateError]);
  return (
    <>
      <MetaData title="Update Product" />
      {load ? (
        <Loader />
      ) : (
        <>
          <div className="create_product update">
            <Sidebar />
            <div className="product_form ">
              <div className="title">Update Product</div>
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
                    value={price}
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
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Cetagory</option>
                  {/* <option onClick={all_product}>All Product</option> */}
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
                    value={Stock}
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
                  {oldImages &&
                    oldImages.map((image, i) => (
                      <img key={i} src={image.url} alt="product Prev" />
                    ))}
                </div>
                <div className="show_image">
                  {imagePrev.map((image, i) => (
                    <img key={i} src={image} alt="product Prev" />
                  ))}
                </div>
                <Button
                  type="submit"
                  onClick={updateProductSubmitHandler}
                  disabled={loading ? true : false}
                >
                  update
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
