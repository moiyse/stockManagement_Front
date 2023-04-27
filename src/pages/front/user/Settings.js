import axios from "axios";
import { useState } from "react";
import Header from "../../../components/front/Header";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifyUser, logout } from "../../../actions/auth";
const Settings = (props) => {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [newPassword, setNewPassword] = useState({
    value: "",
    valid: false,
  });
  const [user, setUser] = useState();
  const [invalidPassword, setInvalidPassword] = useState(false);

  const [oldPassword, setOldPassword] = useState();
  const handleChangeUsername = (e) => {
    const username = e.target.value;
    const alphanumericPattern = /^[a-zA-Z0-9]+$/; // pattern for alphanumeric characters
    if (username === "") {
      setError("");
      setDisabled(false);
    } else if (username.length < 6) {
      setError("Username must be at least 6 characters long");
      setDisabled(true);
    } else if (!alphanumericPattern.test(username)) {
      setError("Username must contain only letters and numbers");
      setDisabled(true);
    } else {
      setUser({ ...user, username: username, id: currentUser.id });
      setError("");
      setDisabled(false);
    }
  };
  const handleChangeEmail = (e) => {
    const email = e.target.value;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // pattern for valid email addresses
    if (email === "") {
      setError("");
      setDisabled(false);
    } else if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      setDisabled(true);
    } else if (email === currentUser.email) {
      setError("Please enter an other email address");
      setDisabled(true);
    } else {
      setUser({ ...user, email: email, id: currentUser.id });
      setError("");
      setDisabled(false);
    }
  };
  const handleChangePhoneNumber = (e) => {
    const phoneNum = e.target.value;
    if (/^[23459]\d{7}$/.test(phoneNum)) {
      setUser({ ...user, phoneNumber: phoneNum, id: currentUser.id });
      setError("");
      setDisabled(false); // enable the button
    } else if (phoneNum === "") {
      setError("");
      setDisabled(false);
    } else {
      setError("Please enter a phone number with exactly 8 digits.");
      setDisabled(true);
    }
  };
  const handleChangeImage = (e) => {
    setUser({ ...user, image: e.target.files[0], id: currentUser.id });
    setDisabled(false);
  };
  const Logout = async () => {
    try {
      await dispatch(logout());
      return <Navigate to="" />;
    } catch (error) {
      // handle error
    }
  };
  const modifyCurrentUser = async (e) => {
    setError(null);
    e.preventDefault();
    setUser({ ...user, id: currentUser.id });
    console.log(user);
    dispatch(modifyUser(user))
      .then((data) => {
        document.getElementById("myForm").reset(); // reset the form
        if (data.verified === false) {
          Logout();
        }
      })
      .catch((error) => {
        setError(error);
        if (error === "Failed! Username is already in use!") {
          setUser({
            ...user,
            username: currentUser.username,
            id: currentUser.id,
          });
        }
      });
  };
  const handleChangeNewPassword = (e) => {
    setSubmited(false);
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    const updatePassword = {
      ...newPassword,
    };

    updatePassword.value = e.target.value;
    updatePassword.valid = patternPassword.test(updatePassword.value);

    setNewPassword(updatePassword);
  };

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const resetPassword = () => {
    setSubmited(true);
    if (newPassword.valid) {
      const resetPasswordObject = {
        email: currentUser.email,
        password: oldPassword,
        newPassword: newPassword.value,
      };
      axios
        .put(`/api/auth/forgotPassword`, resetPasswordObject, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          console.log("testt");
          notify("User password was updated successfully!", toast, "success");
          setOldPassword("");
          setNewPassword({
            value: "",
            valid: false,
          });
        })
        .catch((err) => {
          if (err.response.data.message === "Invalid Password!")
            notify("Invalid Password!", toast, "error");
          else setInvalidPassword(true);
        });
    }
  };
  return (
    <>
      <ToastContainer />

      <main>
        {/* section */}
        <section>
          {/* container */}
          <div className="container">
            {/* row */}
            <div className="row">
              {/* col */}
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center d-md-none py-4">
                  {/* heading */}
                  <h3 className="fs-5 mb-0">Account Setting</h3>
                  {/* button */}
                  <button
                    className="btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3 "
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasAccount"
                    aria-controls="offcanvasAccount"
                  >
                    <i className="bi bi-text-indent-left fs-3"></i>
                  </button>
                </div>
              </div>
              {/* col */}
              <div className="col-lg-3 col-md-4 col-12 border-end  d-none d-md-block">
                <div className="pt-10 pe-lg-10">
                  {/* nav item */}
                  <ul className="nav flex-column nav-pills nav-pills-dark">
                    <li className="nav-item">
                      <a
                        className="nav-link "
                        aria-current="page"
                        href="account-orders.html"
                      >
                        <i className="feather-icon icon-shopping-bag me-2"></i>
                        Your Orders
                      </a>
                    </li>
                    {/* nav item */}
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="account-settings.html"
                      >
                        <i className="feather-icon icon-settings me-2"></i>
                        Settings
                      </a>
                    </li>

                    {/* nav item */}
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="account-payment-method.html"
                      >
                        <i className="feather-icon icon-credit-card me-2"></i>
                        Payment Method
                      </a>
                    </li>
                    {/* nav item */}
                    <li className="nav-item">
                      <a className="nav-link" href="account-notification.html">
                        <i className="feather-icon icon-bell me-2"></i>
                        Notification
                      </a>
                    </li>
                    {/* nav item */}
                    <li className="nav-item">
                      <hr />
                    </li>
                    {/* nav item */}
                    <li className="nav-item">
                      <a className="nav-link " type="button" onClick={Logout}>
                        <i className="feather-icon icon-log-out me-2"></i>Log
                        out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-9 col-md-8 col-12">
                <div className="py-6 p-md-6 p-lg-10">
                  <div className="mb-6">
                    {/* heading */}
                    <h2 className="mb-0">Account Setting</h2>
                    <div className="wrapper" style={{ padding: " 10px" }}>
                      <img
                        src={`http://localhost:5001/uploads/${currentUser?.image}`}
                        className="image--cover"
                        style={{
                          width: "150px",
                          height: "150px",
                          borderRadius: " 50%",

                          objectFit: "cover",
                          objectPosition: "center right",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    {/* heading */}
                    <h5 className="mb-4">Account details</h5>
                    <div className="row">
                      <div className="col-lg-5">
                        {/* form */}
                        <form id="myForm">
                          <div className="mb-3">
                            <label className="form-label">Image</label>
                            <input
                              type="file"
                              className="form-control"
                              placeholder="jitu chauhan"
                              onChange={handleChangeImage}
                            />
                          </div>
                          {/* input */}
                          <div className="mb-3">
                            <label className="form-label">
                              Your current username is : {currentUser.username}
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Change your username"
                              onChange={handleChangeUsername}
                            />
                          </div>
                          {/* input */}
                          <div className="mb-3">
                            <label className="form-label">
                              Your current email is : {currentUser.email}
                            </label>

                            <input
                              type="email"
                              className="form-control"
                              onChange={handleChangeEmail}
                              placeholder="Channge your email "
                            />
                            <label
                              className="form-label"
                              style={{ color: "red" }}
                            >
                              <strong> Warning: </strong> If you change your
                              email address, you will be logged out and an email
                              will be sent to your new email address to check
                              it. Please make sure you have access to the new
                              e-mail address before making any changes.
                            </label>
                          </div>
                          {/* input */}
                          <div className="mb-5">
                            <label className="form-label">
                              Your current phone is : {currentUser.phoneNumber}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              onChange={handleChangePhoneNumber}
                              placeholder="Phone number"
                              maxLength={8}
                              min={0}
                            />
                          </div>
                          {error && (
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                          )}
                          {/* button */}
                          <div className="mb-3">
                            <button
                              className="btn btn-primary"
                              onClick={modifyCurrentUser}
                              disabled={disabled}
                            >
                              Save Details
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <hr className="my-10" />
                  {currentUser.phoneNumber != null && (
                    <div className="pe-lg-14">
                      {/* heading */}
                      <h5 className="mb-4">Password</h5>
                      <form className=" row row-cols-1 row-cols-lg-2">
                        {/* input */}
                        <div className="mb-3 col">
                          <label className="form-label">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="**********"
                            value={newPassword.value}
                            onChange={handleChangeNewPassword}
                          />
                        </div>
                        {/* input */}
                        <div className="mb-3 col">
                          <label className="form-label">current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="**********"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        {/* input */}
                        {submited &&
                          !newPassword.valid &&
                          newPassword.value !== "" && (
                            <div className="alert alert-danger" role="alert">
                              <p className="mb-1">
                                Password must be at least 8 characters long, at
                                least one uppercase letter, one lowercase
                                letter, and one number
                              </p>
                            </div>
                          )}
                        {submited &&
                          newPassword.valid &&
                          newPassword.value === oldPassword &&
                          invalidPassword && (
                            <div className="alert alert-danger" role="alert">
                              <p className="mb-1">
                                your new password must be different from your
                                old one
                              </p>
                            </div>
                          )}

                        <div className="col-lg-12">
                          <p className="mb-4">
                            Can’t remember your current password?
                            <Link to="/forgetPassword">
                              {" "}
                              Reset your password.
                            </Link>
                          </p>
                          <span
                            className="btn btn-primary"
                            onClick={resetPassword}
                          >
                            Save Password
                          </span>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default Settings;
