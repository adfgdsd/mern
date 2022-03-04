import React, { useEffect, useState } from "react";
import Loader from "../loader/loader";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "rc-slider/assets/index.css";
import Pagination from "react-js-pagination";
import ProductCard from "../home/productCard";

const Productfetchall = () => {
  const { loading, products, error, resultParPage, productsCount } =
    useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setpp] = useState([0, 25000]);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const search = () => {
    let min = document.querySelector("#one").value;
    let max = document.querySelector("#two").value;
    setpp([min, max]);
  };

  const searchhh = () => {
    dispatch(getProduct(keyword, currentPage, price));
  };

  const [category, setCategory] = useState("");
  const categories = [
    "Laptop",
    "Camera",
    "Keybord",
    "Mouse",
    "Chycle",
    "T.V",
    "MotorChycle",
  ];

  const [ratings, setrating] = useState(0);

  const ret = (e) => {
    e.preventDefault();
    const reting = document.querySelector("#reting");
    setrating(reting.value);
  };

  const all_product = () => {
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product_card">
            <h1 className="m-auto">PRODUCTS</h1>
          </div>
          <div className="container all">
            {products &&
              products.map((product, i) => (
                <ProductCard product={product} key={i} />
              ))}
          </div>
          <div className="pagination_div">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultParPage}
              totalItemsCount={productsCount}
              // adnan121
              // 3eQdjU3pJ5mU0f0X
              // mongodb+srv://adnan121:3eQdjU3pJ5mU0f0X@cluster0.yyzma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
              onChange={setCurrentPageNo}
              nextPageText={"Next"}
              prevPageText={"Prev"}
              firstPageText={"1st"}
              lastPageText={"Last"}
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>

          <div className="slider_div">
            <p className="ml-2 title">Filter Price :</p>
            <input
              onChange={search}
              type="number"
              placeholder="minimum price"
              id="one"
              defaultValue={0}
            />
            <input
              onChange={search}
              type="number"
              placeholder="maximum price"
              id="two"
              defaultValue={25000}
            />
            <button onClick={searchhh} className="btn">
              search
            </button>
          </div>

          <div className="category">
            <p className="title">Category :</p>
            <ul>
              <li onClick={all_product}>All Product</li>
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          <div className="rating_div">
            <p id="r">Rating : {ratings}</p>
            <input
              type="range"
              onChange={ret}
              name=""
              id="reting"
              defaultValue={ratings}
              min={0}
              max={5}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Productfetchall;
