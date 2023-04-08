import axios from "axios";
import { useState } from "react";
import { Icons, toast, ToastContainer } from "react-toastify";
//import { Icon } from "react-icon-kit";
import { notify } from "../../../utils/HelperFunction";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./ForgetPassword";
import { useLocation, Link } from 'react-router-dom';

const ChangePassword=(props) =>{
    const [type, setType]=useState('password');
    const [icon, setIcon]=useState('bi bi-eye-slash');

    const handleToggle=()=>{
        if(type==='password'){
            setIcon('bi bi-eye');
            setType('text');
        }else{
            setIcon('bi bi-eye-slash');
            setType('password');
        }
    }

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
        <div style={{backgroundColor: "#ffffff" }}>
           
            <div class="form-shape-wrapper-reset">
                <div class="form-shape-reset">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 185.4">
                        <path fill="red" d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z"></path>
                    </svg>
                </div>
            </div>
                <div className="form-wrapper">
                    <div className="container">
                        <div className="card card-rest">
                            <div className="row no-gutters">
                                <div className="col">
                                <div className="row h-100 align-items-center">
                                    <div className="col-md-10 offset-md-1">
                                    <img
                                        src="../assets/images/logo/logo.png"
                                        style={{ width: "100px", paddingBottom: "15px" }}
                                        alt=""
                                        className="d-inline-block align-text-top"
                                    />    
                                    <div className="my-5 text-center text-lg-left">
                                        <h3 className="font-weight-bold" style={{ paddingBottom: "15px" }}>Reset Password</h3>
                                        <p className="text-muted">Type and send the email address to reset your password.</p>
                                    </div>
                                    <form>  
                                        <div className="form-group">
                                            <div className="form-icon-wrapper ">
                                                <input type={type} 
                                                className="form-control" 
                                                placeholder="Enter your new password"
                                                required />
                                                <i className="form-icon-left mdi bi-lock-fill" />
                                                <a onClick={handleToggle} className="form-icon-right password-show-hide" title="Hide or show password">
                                                    <i className={icon} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                        <div className="form-icon-wrapper">
                                            <input type={type} className="form-control" placeholder="Retype password" required />
                                            <i className="form-icon-left mdi bi-lock-fill" />
                                            <a onClick={handleToggle} className="form-icon-right password-show-hide" title="Hide or show password">
                                                <i className={icon} />
                                            </a>
                                        </div>
                                        </div>
                                        <button className="btn btn-primary mb-4">Change Password</button>
                                        
                                    </form>
                                    <p className="text-center mb-4"  style={{ paddingTop: "15px" }}>
                                        Already have an account?  <Link to="/"><a>Sign in</a></Link>.
                                    </p>
                                    </div>
                                </div>
                                </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
                  {/*console.log(mailOpened)}
                    {(mailOpened && mailOpened===true) && <MailVerification/>*/}
                    { /*  <MailVerification  verifCode={verifCode} handleChangeCodeOpt={handleChangeCodeOpt} mailOpened={mailOpened}/>*/}
           
           
         
          </div>
      </>
    );
  };

export default ChangePassword ;