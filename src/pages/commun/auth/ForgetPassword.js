import MailVerification from "../../../components/modal/MailVerification";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify } from "../../../utils/HelperFunction";
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
              />                </a>
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
                            {error && (<p className="text-danger p-2 m-2">{error}</p>)}
                            {!mailCode && (
                            <input type="email" className="form-control" 
                            onChange={CheckEmail} placeholder="Email" value={email}/>
                            )}
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
                            {mailCode && (<div>
                                You have a problem? <a href="#" onClick={openModal}>  Resend Code </a>
                              </div>)}

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
      
          </div>
      </>
    );
 
}
export default ForgetPassword;