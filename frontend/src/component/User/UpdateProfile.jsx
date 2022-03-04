import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

import MetaData from "../layout/metaData";
import { UPDATE_PROFILE_RESET } from "../../constents/userConstents";

const UpdateProfile = () => {
  const history = useNavigate();
  const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPrev, setavatarPrev] = useState("/logo512.png");

  const updateProfileData = (e) => {
    e.preventDefault();
    const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPrev(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myFrom = new FormData();
    myFrom.set("name", name);
    myFrom.set("email", email);
    myFrom.set("avatar", avatar);
    if (name.length >= 4 || avatar) {
      dispatch(updateProfile(myFrom));
    } else {
      alert.error("name must be 4 carecture");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setavatarPrev(user.avatar.url);
    }
    if (error) {
      alert.error("Opps! " + error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Update User success");
      dispatch(loadUser());
      history("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

  return (
    <>
      <MetaData title={"Update Profile"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="minn">
            <div className="login_updateProfile">
              <div className="login">
                <h4 className="mr-auto">Update Profile</h4>
                <form action="">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="emial">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="updateProfileImages">
                    <img
                      src={avatarPrev}
                      alt="Avatar Preview"
                      className="regimg mt-3 mb-3"
                    />
                    <input
                      type="file"
                      name="avatar"
                      className="file"
                      accept="image/"
                      onChange={updateProfileData}
                    />
                  </div>
                  <input
                    type="button"
                    value="UPDATE"
                    onClick={updateProfileSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default UpdateProfile;
