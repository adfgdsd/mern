import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/metaData";
import { State, Country } from "country-state-city";
import CheckOutStape from "./CheckOutStape.jsx";
import { useAlert } from "react-alert";
import { saveShipingInfo } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useNavigate();
  const { shipingInfo } = useSelector((state) => state.cart);

  const [adress, setAdress] = useState(shipingInfo.adress);
  const [city, setCity] = useState(shipingInfo.city);
  const [state, setState] = useState(shipingInfo.state);
  const [country, setCountry] = useState(shipingInfo.country);
  const [pinCode, setPincode] = useState(shipingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shipingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length > 11 || phoneNo.length < 11) {
      alert.error("phone number must be 11 degites");
    } else {
      dispatch(
        saveShipingInfo({ adress, city, state, country, pinCode, phoneNo })
      );
      history("/order/confirm");
    }
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckOutStape activeStep={0} />
      <div className="shipping_container">
        <div className="shipping_box">
          <h2 className="title">Shipping Details</h2>
          <form>
            <label htmlFor="pass">Adress:</label>
            <input
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              type="text"
              placeholder="inter your adress"
            />
            <label htmlFor="pass">City:</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="inter your city name"
            />
            <label htmlFor="pass">Number:</label>
            <input
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              type="number"
              placeholder="inter your phone number"
            />

            <label htmlFor="pass">Pincode:</label>
            <input
              value={pinCode}
              onChange={(e) => setPincode(e.target.value)}
              type="number"
              placeholder="inter your pincode"
            />
            <label htmlFor="pass">Country:</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">counter</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {country && (
              <div>
                <select
                  className="mt-2"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">state</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              className="mt-3 btn m-0"
              type="submit"
              value={"Continue"}
              onClick={shippingSubmit}
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
