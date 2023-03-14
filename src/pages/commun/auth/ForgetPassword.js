import MailVerification from "../../components/modal/MailVerification";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../utils/HelperFunction";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


const ForgetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  //const [mailOpened, setMailOpened] = useState(false);
  const [codeOpt, setCodeOpt] = useState('');
  const [mailCode, setMailCode] = useState('');
  const navigate = useNavigate();


  //test sur la saisie de 'email
  const CheckEmail = (e) => {
    setEmail(e.target.value);
    const regex = /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/;
    if(regex.test(email)===false){ 
      setError('please enter valid email address');
    }else{
      setError(' ');
    }
  };
  
 
  //l'envoi de code par email
  const openModal = () => {
    if (email!=='') {
      const forgotPassword = {
        email: email
      };
    
      axios
      .post(`/api/auth/forgetPassword`, forgotPassword, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
          console.log(res); 
          setError('');  
          setMailCode(true);
          //setMailOpened(true);
          notify("Verification Mail was send successfully!", toast, "success");        
        
      })
      .catch((err) => {
        console.log(err)
        notify("Invalid mail!", toast, "error");
      });

    }else{
      setError('Pease enter email adress');
     //setMailOpened(false);
    }
  };

  
  //verification du code 
  const verifCode = (e) => {

    if (codeOpt!=='') {        
      const verificationCode = {
        email: email,
        code: codeOpt 
      };
      axios
      .post(`/api/auth/verifCode`, verificationCode, {
        headers: { "Content-Type": "application/json" },  
      })
      .then((res) => {
          //setMailOpened(false)
          notify("Mail is verificated!", toast, "success"); 
          navigate(`/ResetPassword?email=${email}`);
      })
      .catch((err) => {
        if({ message: "Time Expired." }){
          notify("Time Expired, resent new code!", toast, "error");
        }
        else{
          console.log(err);
          notify("Wrong code!", toast, "error");
        }     
      });

    }else{
      console.log(' enter code');
    }
  }

  const handleChangeCodeOpt=(e)=>{
    setCodeOpt(e.target.value);
  }

    return(
     <>
        <ToastContainer />

          <div>
          <title>FreshCart - eCommerce HTML Template</title>
          {/* Required meta tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content />
          <meta content="Codescandy" name="author" />
          {/* Favicon icon*/}
          <link rel="shortcut icon" type="image/x-icon" href="../assets/images/favicon/favicon.ico" />
          {/* Libs CSS */}
          <link href="../assets/libs/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
          <link href="../assets/libs/feather-webfont/dist/feather-icons.css" rel="stylesheet" />
          <link href="../assets/libs/simplebar/dist/simplebar.min.css" rel="stylesheet" />
          {/* Theme CSS */}
          <link rel="stylesheet" href="../assets/css/theme.min.css" />
          {/* navigation */}
          <div className="border-bottom shadow-sm">
            <nav className="navbar navbar-light py-2">
              <div className="container justify-content-center justify-content-lg-between">
                <a className="navbar-brand" href="../index.html">
                  <img src="../assets/images/logo/freshcart-logo.svg" alt="" className="d-inline-block align-text-top" />
                </a>
                <span className="navbar-text">
                  Already have an account? <Link to="/register">Sign in</Link>
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
                    <img src="../assets/images/svg-graphics/fp-g.svg" alt="" className="img-fluid" />
                  </div>
                  <div className="col-12 col-md-6 offset-lg-1 col-lg-4 order-lg-2 order-1 d-flex align-items-center">
                    <div>
                      <div className="mb-lg-9 mb-5">
                        {/* heading */}
                        <h1 className="mb-2 h2 fw-bold">Forgot your password?</h1>
                        <p>Please enter the email address associated with your account and We will email you a link to reset your
                          password.</p>
                      </div>
                      {/* form */}
                      <form>
                        {/* row */}
                        <div className="row g-3">
                          {/* col */}
                          <div className="col-12">
                            {/* input de l'email*/}
                            {!mailCode && (
                            <input type="email" className="form-control" 
                            onChange={CheckEmail} placeholder="Email" value={email}/>
                            )}
                            {!mailCode && (<p className="text-danger p-2 m-2">{error}</p>)}
                          </div>
                          <div >
                            {/* input du code*/}
                          {mailCode && (
                            <input type="text" className="form-control" id="mailCode" maxLength={4} 
                            value={codeOpt}       
                             onChange={handleChangeCodeOpt} placeholder="Enter Your Code" required />          
                           )}
                         </div>
                          
                          {/* btn */}
                          <div className="col-12 d-grid gap-2"> 
                            {mailCode && (
                                <button type="button" className="btn btn-primary"
                                onClick={verifCode} >Continue</button>
                            )}
                            {mailCode && (<a onClick={openModal}  className="btn btn-light">Resent</a>)
                            }
                            {!mailCode && (<button type="button" className="btn btn-primary"  data-bs-toggle="modal"
                            data-bs-target="#userModal" onClick={openModal}>Reset Password</button>)}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/*console.log(mailOpened)}
          {(mailOpened && mailOpened===true) && <MailVerification/>*/}
           { /*  <MailVerification  verifCode={verifCode} handleChangeCodeOpt={handleChangeCodeOpt} mailOpened={mailOpened}/>*/}
           
            {console.log(mailOpened)}
          {/* Footer */}
          {/* footer */}
          <footer className="footer">
            <div className="container">
              
              <div className=" py-4">
                <div className="row align-items-center">
                  <div className="col-md-6"><span className="small text-muted">Copyright 2023 © Dev'Up Team.  All rights reserved.</span></div>
                  <div className="col-md-6">
                    <ul className="list-inline text-md-end mb-0 small mt-3 mt-md-0">
                      <li className="list-inline-item text-muted">Follow us on</li>
                      <li className="list-inline-item me-1">
                        <a href="#!" className="btn btn-xs btn-social btn-icon"> <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                          </svg></a></li>
                      <li className="list-inline-item me-1">
                        <a href="#!" className="btn btn-xs btn-social btn-icon"> <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                          </svg></a></li>
                      <li className="list-inline-item">
                        <a href="#!" className="btn btn-xs btn-social btn-icon"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                          </svg></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </div>
      </>
    );
 
}
export default ForgetPassword;