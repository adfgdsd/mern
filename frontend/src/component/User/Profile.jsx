import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import MetaData from "../layout/metaData";
import Loader from "../loader/loader";

const Profile = () => {
  const history = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === "false") {
      history("/");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={user.name + "'s profile"} />
          <div className="user_profile">
            <div className="img_sec_user">
              <div>
                <h1 className="title_pro">My Profile</h1>
                <div className="img_pro">
                  <img src={user.avatar.url} alt={user.name} />
                </div>
                <NavLink to="/me/update">
                  <p className="edit">Edit Profile</p>
                </NavLink>
              </div>
            </div>
            <div className="text_sec">
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div className="mt-3">
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div className="mt-3">
                <h4>Joiend On</h4>
                <p>{String(user.avatar.createdAt).substring(0, 10)}</p>
              </div>
              <div>
                <NavLink to="/orders" >
                  <p className="edit one">My Order</p>
                </NavLink>
                <NavLink to="/password/update">
                  <p className="edit one"> Change Password</p>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
