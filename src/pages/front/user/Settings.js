import axios from "axios";
import { useState } from "react";
import Header from "../../../components/front/Header";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const Settings = (props) => {
  


  const [newPassword, setNewPassword] = useState({
    value: "",
    valid: false,
  });
  const [oldPassword, setOldPassword] = useState();

  const handleChangeNewPassword = (e) => {
    const patternPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

    const updatePassword = {
      ...newPassword,
    };

    updatePassword.value = e.target.value;
    updatePassword.valid = patternPassword.test(updatePassword.value);

    setNewPassword(updatePassword);
  };
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/" />;
  }
  const resetPassword = () => {
    if (newPassword.valid) {
      //todo: make it dynamic when we manage acces spaces
      const resetPasswordObject = {
        email: "ala.hamadi@esprit.com",
        password: oldPassword,
        newPassword: newPassword.value,
      };
console.log("ddddddddd")
      axios
        .put(`/api/auth/forgotPassword`, resetPasswordObject, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          notify("User password was updated successfully!", toast, "success");
          setOldPassword("");
          setNewPassword({
            value: "",
            valid: false,
          });
        })
        .catch((err) => {
          console.log(err);
          notify("Invalid Password!", toast, "error");
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
          <div className='container'>
            {/* row */}
            <div className='row'>
              {/* col */}
              <div className='col-12'>
                <div className='d-flex justify-content-between align-items-center d-md-none py-4'>
                  {/* heading */}
                  <h3 className='fs-5 mb-0'>Account Setting</h3>
                  {/* button */}
                  <button
                    className='btn btn-outline-gray-400 text-muted d-md-none btn-icon btn-sm ms-3 '
                    type='button'
                    data-bs-toggle='offcanvas'
                    data-bs-target='#offcanvasAccount'
                    aria-controls='offcanvasAccount'
                  >
                    <i className='bi bi-text-indent-left fs-3'></i>
                  </button>
                </div>
              </div>
              {/* col */}
              <div className='col-lg-3 col-md-4 col-12 border-end  d-none d-md-block'>
                <div className='pt-10 pe-lg-10'>
                  {/* nav item */}
                  <ul className='nav flex-column nav-pills nav-pills-dark'>
                    <li className='nav-item'>
                      <a
                        className='nav-link '
                        aria-current='page'
                        href='account-orders.html'
                      >
                        <i className='feather-icon icon-shopping-bag me-2'></i>
                        Your Orders
                      </a>
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <a
                        className='nav-link active'
                        href='account-settings.html'
                      >
                        <i className='feather-icon icon-settings me-2'></i>
                        Settings
                      </a>
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <a className='nav-link' href='account-address.html'>
                        <i className='feather-icon icon-map-pin me-2'></i>
                        Address
                      </a>
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <a
                        className='nav-link'
                        href='account-payment-method.html'
                      >
                        <i className='feather-icon icon-credit-card me-2'></i>
                        Payment Method
                      </a>
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <a className='nav-link' href='account-notification.html'>
                        <i className='feather-icon icon-bell me-2'></i>
                        Notification
                      </a>
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <hr />
                    </li>
                    {/* nav item */}
                    <li className='nav-item'>
                      <a className='nav-link ' href='../index.html'>
                        <i className='feather-icon icon-log-out me-2'></i>Log
                        out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='col-lg-9 col-md-8 col-12'>
                <div className='py-6 p-md-6 p-lg-10'>
                  <div className='mb-6'>
                    {/* heading */}
                    <h2 className='mb-0'>Account Setting</h2>
                  </div>
                  <div>
                    {/* heading */}
                    <h5 className='mb-4'>Account details</h5>
                    <div className='row'>
                      <div className='col-lg-5'>
                        {/* form */}
                        <form>
                          {/* input */}
                          <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='jitu chauhan'
                            />
                          </div>
                          {/* input */}
                          <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input
                              type='email'
                              className='form-control'
                              placeholder='example@gmail.com'
                            />
                          </div>
                          {/* input */}
                          <div className='mb-5'>
                            <label className='form-label'>Phone</label>
                            <input
                              type='text'
                              className='form-control'
                              placeholder='Phone number'
                            />
                          </div>
                          {/* button */}
                          <div className='mb-3'>
                            <button className='btn btn-primary'>
                              Save Details
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <hr className='my-10' />
                  <div className='pe-lg-14'>
                    {/* heading */}
                    <h5 className='mb-4'>Password</h5>
                    <form className=' row row-cols-1 row-cols-lg-2'>
                      {/* input */}
                      <div className='mb-3 col'>
                        <label className='form-label'>New Password</label>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='**********'
                          value={newPassword.value}
                          onChange={handleChangeNewPassword}
                        />
                      </div>
                      {/* input */}
                      <div className='mb-3 col'>
                        <label className='form-label'>current Password</label>
                        <input
                          type='password'
                          className='form-control'
                          placeholder='**********'
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                      </div>
                      {/* input */}
                      <div className='col-12'>
                        <p className='mb-4'>
                          Can’t remember your current password?
                          <a href='#'> Reset your password.</a>
                        </p>
                        <span
                          className='btn btn-primary'
                          onClick={resetPassword}
                        >
                          Save Password
                        </span>
                      </div>
                    </form>
                  </div>
                  <hr className='my-10' />
                  <div>
                    {/* heading */}
                    <h5 className='mb-4'>Delete Account</h5>
                    <p className='mb-2'>
                      Would you like to delete your account?
                    </p>
                    <p className='mb-5'>
                      This account contain 12 orders, Deleting your account will
                      remove all the order details associated with it.
                    </p>
                    {/* btn */}
                    <a href='#' className='btn btn-outline-danger'>
                      I want to delete my account
                    </a>
                  </div>
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
