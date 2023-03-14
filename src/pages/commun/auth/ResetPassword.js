import axios from "axios";
import { useState } from "react";
import Header from "../../../components/front/Header";
import { toast, ToastContainer } from "react-toastify";
import { notify } from "../../../utils/HelperFunction";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./ForgetPassword";
import { useLocation, Link } from 'react-router-dom';

const ResetPassword=(props) =>{

    const [newPassword, setNewPassword] = useState({
        value: "",
        valid: false,
    });
    const [confirmPassword, setconfirmPassword] = useState();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

   
    const handleChangeNewPassword = (e) => {
        const patternPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

        const updatePassword = {
            ...newPassword,
        };

        updatePassword.value = e.target.value;
        updatePassword.valid = patternPassword.test(updatePassword.value);

        setNewPassword(updatePassword);
    };

    
    const resetPassword = () => {     
        if (newPassword.value===confirmPassword && newPassword.valid===true) {
            const resetPasswordObject = {
                email: email,
                newPassword: newPassword.value,
            };
            axios
            .put(`/api/auth/newPassword`, resetPasswordObject, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                notify("User password was updated successfully!", toast, "success");
                setconfirmPassword("");
                console.log("success");
                setNewPassword({
                    value: "",
                    valid: false,
                });
                window.location.href = '/'; 
                
            })
            .catch((err) => {
                if({ message: "same Password"  }){
                  notify("same Password, try another one!", toast, "error");
                }
                else{
                  console.log(err);
                  notify("try later!", toast, "error");
                }              
            });    
        }else {
            notify("Verify the Password, try again!", toast, "error");
          }
    };
    
    return(
      <>
        <ToastContainer />
        <div>    
            {/* navigation */}
            <div className="border-bottom shadow-sm">
            <nav className="navbar navbar-light py-2">
                <div className="container justify-content-center justify-content-lg-between">
                <a className="navbar-brand" href="../index.html">
                <img
                src="../assets/images/logo/logo.png"
                style={{ width: "80px" }}
                alt=""
                className="d-inline-block align-text-top"
              />                 </a>
                <span className="navbar-text">
                    Already have an account?  <Link to="/login">Sign in</Link>
                </span>
                </div>
            </nav>
            </div>
            <main>
            {/* section */}
            <section className="my-lg-14 my-8">
                {/* container */}
                <div className="container">
                {/* row */}
                <div className="row justify-content-center align-items-center">
                    <div className="col-12 col-md-6 col-lg-4 order-lg-1 order-2">
                    {/* img */}
                    <img src="../assets/images/svg-graphics/signup-g.svg" alt="" className="img-fluid" />
                    </div>
                    {/* col */}
                    <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1">
                    <div className="mb-lg-9 mb-5">
                        <h1 className="mb-1 h2 fw-bold">Reset your password</h1>
                        <p>Stong password include numbers, letters, and punctuation marks.</p>
                    </div>
                    {/* form */}
                    <form>
                        <div className="row g-3">
                        {/* col */}
                        <div className="col-12">
                            <div className="password-field position-relative">
                            <input type="password" 
                            
                            placeholder="Create new Password" 
                            className="form-control" 
                            value={newPassword.value}
                           onChange={handleChangeNewPassword}
                           />
                            <span><i id="passwordToggler" className="bi bi-eye-slash" /></span>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="password-field position-relative">
                            <input
                          type='password'
                          className='form-control'
                          placeholder="Confirm new Password"
                          value={confirmPassword}
                          onChange={(e) =>setconfirmPassword(e.target.value)}
                        />
                            <span><i id="passwordToggler" className="bi bi-eye-slash" /></span>
                            </div>
                        </div>
                        {/* btn */}
                        <div className="col-12 d-grid"> 
                        <span
                          className='btn btn-primary'
                          onClick={resetPassword}
                        >
                          Save Password
                        </span>
                        </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </section>
            </main>
        </div>
      </>
    );
  };

export default ResetPassword ;