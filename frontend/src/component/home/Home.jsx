import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import Product from "./productCard";
import MetaData from "../layout/metaData";
import Loader from "../loader/loader";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const { loading, products, error } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ECOMMERS" />
          <div className="home">
            <h1>Wellcome To</h1>
            <h3>Shopping Fresh Center</h3>
            <br />
            <a href="#pro">
              <button className="bbtn">
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="HomeHeadin p-5" id="pro">
            Feature Product
          </h2>

          <div className="container" id="container">
            {products &&
              products.map((product,i) => <Product product={product} key={i}/>)}
          </div>
        </>
      )}
    </>
  );
};

export default Home;

